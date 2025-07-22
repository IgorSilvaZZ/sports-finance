/* Criar um script que vai atualizar todas as transações no campo type para os novos */

import { TypeHistory } from '@/history/enums/typeHistory.enum';
import { PrismaClient } from '@prisma/client';

const CHUNK_SIZE = 10;

const prisma = new PrismaClient();

async function processChunks(skip = 0) {
  console.log(`Coletando ${CHUNK_SIZE} transações....`);

  const histories = await prisma.history.findMany({
    skip,
    take: CHUNK_SIZE,
    orderBy: { createDate: 'asc' },
  });

  if (histories.length === 0) {
    console.log(`Migração de ${CHUNK_SIZE} transações foram concluidas!`);

    return;
  }

  console.log('Listando todas as transações');

  let countProcessedMonthly = 0;
  let countProcessedAggregate = 0;

  for (const history of histories) {
    if (history.type === 'monthly') {
      await prisma.history.update({
        where: { id: history.id },
        data: {
          type: TypeHistory.SUBSCRIPTION,
        },
      });

      countProcessedMonthly++;
    }

    if (history.type === 'aggregate') {
      await prisma.history.update({
        where: { id: history.id },
        data: {
          type: TypeHistory.INVITED,
        },
      });

      countProcessedAggregate++;
    }
  }

  console.log(
    `Total de transações do tipo mensalistas: ${countProcessedMonthly}`,
  );
  console.log(
    `Total de transações do tipo agregados: ${countProcessedAggregate}`,
  );

  await processChunks(skip + CHUNK_SIZE);
}

(async () => await processChunks())();

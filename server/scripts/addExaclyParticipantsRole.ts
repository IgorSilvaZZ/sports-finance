import { PrismaClient } from '@prisma/client';

console.log('Iniciando script de criação de role para todos os participantes');

const CHUNK_SIZE = 10;

export const prisma = new PrismaClient({
  log: ['query'],
});

async function getParticipantByName(participantId: string, name: string) {
  const participants = await prisma.participant.findFirst({
    where: { id: participantId, name },
  });

  return participants;
}

async function processChunks(skip = 0) {
  console.log(`Coletando ${CHUNK_SIZE} transações....`);

  const histories = await prisma.history.findMany({
    skip,
    take: CHUNK_SIZE,
    orderBy: { createDate: 'asc' },
    include: {
      participant: true,
    },
  });

  if (histories.length === 0) {
    console.log(`Migração de ${CHUNK_SIZE} transações foram concluidas!`);

    return;
  }

  console.log('Listando todas as transações');

  let countProcessedMonthly = 0;
  let countProcessedAggregate = 0;

  for (const history of histories) {
    const participantAlreadyExists = await getParticipantByName(
      history.participantId,
      history.participant.name,
    );

    if (history.type === 'monthly') {
      console.log('Processando Mensalista');

      if (!participantAlreadyExists) {
        console.log('Criando novo participante como mensalista');

        await prisma.participant.create({
          data: {
            name: history.name,
            role: 'monthly',
            status: true,
            eventId: history.eventId,
          },
        });
      } else {
        console.log('Atualizando participante para role mensalista');

        await prisma.participant.update({
          where: { id: participantAlreadyExists.id },
          data: {
            role: 'monthly',
          },
        });
      }

      countProcessedMonthly++;
    }

    if (history.type === 'aggregate' && !participantAlreadyExists) {
      await prisma.participant.create({
        data: {
          name: history.name,
          role: 'aggregate',
          status: true,
          eventId: history.eventId,
        },
      });

      countProcessedAggregate++;
    }
  }

  console.log(
    `Total de mensalistas foram processados: ${countProcessedMonthly}`,
  );
  console.log(
    `Total de mensalistas foram agregados: ${countProcessedAggregate}`,
  );

  await processChunks(skip + CHUNK_SIZE);
}

(async () => {
  await processChunks();
})();

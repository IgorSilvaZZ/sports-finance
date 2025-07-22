import { PrismaClient } from '@prisma/client';

console.log('Iniciando script de criação de role para todos os participantes');

const CHUNK_SIZE = 10;

const prisma = new PrismaClient();

async function getParticipantByNameAndRole(
  name: string,
  role: 'monthly' | 'aggregate',
) {
  const participant = await prisma.participant.findFirst({
    where: { name, role, status: true },
  });

  return participant;
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
    if (history.type === 'monthly') {
      console.log('Processando Mensalista');

      const participantAlreadyExists = await getParticipantByNameAndRole(
        history.participant.name,
        'monthly',
      );

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
        console.log('Atualizando participante para role de mensalista');

        await prisma.participant.update({
          where: { id: participantAlreadyExists.id },
          data: {
            role: 'monthly',
          },
        });
      }

      countProcessedMonthly++;
    }

    if (history.type === 'aggregate') {
      console.log('Criando participante como agregado');

      const participantAlreadyExists = await getParticipantByNameAndRole(
        history.name,
        'aggregate',
      );

      let participantId = participantAlreadyExists?.id;

      if (!participantAlreadyExists) {
        const { id: idNewParticipant } = await prisma.participant.create({
          data: {
            name: history.name,
            role: 'aggregate',
            status: true,
            eventId: history.eventId,
          },
        });

        participantId = idNewParticipant;
      }

      await prisma.history.update({
        where: { id: history.id },
        data: {
          participantId,
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

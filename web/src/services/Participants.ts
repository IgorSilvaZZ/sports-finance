import { toast } from "sonner";

import { api } from "../lib/axios";

export class ParticipantsService {
  static async handleStatusParticipant(
    participantId: string,
    status: boolean
  ): Promise<void> {
    try {
      await api.put(`/participants/${participantId}`, { status });

      toast.success("Status atualizado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro em atualizar os status do participante!");
    }
  }
}

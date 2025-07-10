import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { ArrowLeft } from "@phosphor-icons/react";

import { Event } from "../interfaces/Event.interface";

import { CardEvent } from "../components/CardEvent";

import { dashboardActions } from "../store/dashboard/dashboard.slice";
import {
  responsibleActions,
  selectResponsible,
} from "../store/responsible/responsible.slice";

import emptyImage from "../assets/list-event-empty.png";
import { ModalCreateEvent } from "../components/ModalCreateEvent";
import { EventService } from "../services/Event";

export default function Events() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responsible = useSelector(selectResponsible);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [eventSelected, setEventSelected] = useState<Event | null>(null);

  function goToBack() {
    dispatch(dashboardActions.clearFilters());
    dispatch(responsibleActions.clear());
    navigate("/");
  }

  function onOpenModal() {
    setEventSelected(null);

    setModalOpen(!modalOpen);
  }

  function onCloseModal() {
    setEventSelected(null);

    setModalOpen(false);
  }

  function onViewDetails(eventId: string) {
    navigate(`/event/${eventId}`);
  }

  function onEditEvent(event: Event) {
    setEventSelected(event);

    setModalOpen(true);
  }

  async function getEvents() {
    setIsLoading(true);

    try {
      const events = await EventService.getEventsByResponsible(responsible.id);

      setEvents(events);
    } catch (error) {
      console.log(error);

      toast.error("Ocorreu algum erro ao listar os eventos!");
    } finally {
      setIsLoading(false);
    }
  }

  async function onDeleteEvent(eventId: string) {
    try {
      await EventService.deleteEventById(eventId, responsible.id);

      toast.success("Evento deletado com sucesso!");

      getEvents();
    } catch (error) {
      console.log(error);

      toast.error("Ocorreu algum tentar excluir o evento!");
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <div className='min-h-screen w-full bg-backgroundEvents px-4'>
        <div className='h-full max-w-[1200px] mx-auto py-10 flex flex-col gap-10'>
          <span
            className='flex gap-2 font-semibold text-zinc-500 text-lg cursor-pointer transition-all hover:text-zinc-800'
            onClick={goToBack}
          >
            <ArrowLeft size={22} /> Voltar
          </span>

          {/* h-[calc(100vh-160px)] => Altura do viewport menos o padding do header (Botao de voltar), juntamente com o padding da tela geral */}
          <div className='w-full flex flex-col gap-5 items-center leading-tight h-[calc(100vh-160px)]'>
            <p className='text-5xl font-medium mb-4'>Meus Eventos</p>

            <div className='flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100'>
              <div className='w-full'>
                <ModalCreateEvent
                  modalOpen={modalOpen}
                  initialData={eventSelected}
                  onOpenModal={onOpenModal}
                  onCloseModal={onCloseModal}
                  getEvents={getEvents}
                />
              </div>

              {isLoading ? (
                <div className='h-screen w-screen flex justify-center items-center'>
                  <ClipLoader color='red' size={60} />
                </div>
              ) : (
                <>
                  {events.length > 0 ? (
                    <>
                      {events.map((eventItem) => (
                        <>
                          <CardEvent
                            key={eventItem.id}
                            event={eventItem}
                            onEditEvent={onEditEvent}
                            onViewDetails={onViewDetails}
                            onDeleteEvent={onDeleteEvent}
                          />
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      <img
                        src={emptyImage}
                        alt='List empty events image'
                        className='w-[200px]'
                      />
                      <span className='text-zinc-500 text-base'>
                        Nenhum evento encontrado
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

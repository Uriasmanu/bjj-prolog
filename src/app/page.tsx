'use client'

import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { isSameDay } from "date-fns";
import { Award, BicepsFlexed, Podcast } from "lucide-react";
import { useState } from "react";



export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const treinoDays = [
    { date: new Date(2025, 4, 15), tecnica: 'raspagem', dificuldade: 'media' },

  ];

  const treinoDates = treinoDays.map(t => t.date);
  const treinoSelecionado = treinoDays.find(t => date && isSameDay(t.date, date));

  return (
    <div className="flex flex-col p-12 gap-12 h-full w-full box-border">
      <header>
        <h1 className="text-2xl font-bold">Dashboard de Performance</h1>
      </header>

      <main className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Frequência de treino</h2>

          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            modifiers={{
              treino: treinoDates
            }}
            modifiersStyles={{
              treino: {
                backgroundColor: "#4CAF50",
                color: "white",
                borderRadius: "4px"
              }
            }}
            className="rounded-md border"


          />
          <Separator className="my-4" />
          {treinoSelecionado ? (
            <div className="text-sm text-gray-700">
              <p><strong>Técnica:</strong> {treinoSelecionado.tecnica}</p>
              <p><strong>Dificuldade:</strong> {treinoSelecionado.dificuldade}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Nenhum treino registrado nesse dia.</p>
          )}

        </div>
        <section className="flex flex-col">
          <h2 className="text-2xl font-bold">Avaliação dos 3 pilares (técnico, físico, mental)</h2>

          <div className="flex flex-col gap-2 my-2">

            <div className="flex gap-3 bg-amber-200 w-auto h-[8rem] p-6 rounded-2xl  items-center shadow-lg">

              <div className="flex flex-col gap-3">
                <h3 className="flex text-1xl font-bold gap-3">
                  <Award />
                  Pilar Tecnico
                </h3>

                <p className="w-[90%] sm:w-[70%] text-[14px]">
                  Avaliação do desempenho técnico avaliado de 0 a 10 nos ultimo 30 dia.
                </p>
              </div>

              <div className="flex items-center justify-center p-1 w-[34px] h-[34px] sm:w-[54px] sm:h-[54px] border border-black rounded-full">
                3.5
              </div>
            </div>

            <div className="flex gap-3 bg-amber-200 w-auto h-[8rem] p-6 rounded-2xl  items-center shadow-lg">

              <div className="flex flex-col gap-3">
                <h3 className="flex text-1xl font-bold gap-3">
                  <BicepsFlexed />
                  Pilar Fisico
                </h3>
               
                <p className="w-[90%] sm:w-[70%] text-[14px]">
                  Avaliação do desempenho técnico avaliado de 0 a 10 nos ultimo 30 dia.
                </p>
              </div>

              <div className="flex items-center justify-center p-1 w-[34px] h-[34px] sm:w-[54px] sm:h-[54px] border border-black rounded-full">
                4.5
              </div>
            </div>

            <div className="flex gap-3 bg-amber-200 w-auto h-[8rem] p-6 rounded-2xl  items-center shadow-lg">

              <div className="flex flex-col gap-3">
                <h3 className="flex text-1xl font-bold gap-3">
                  <Podcast />
                  Pilar Mental
                </h3>
               
                <p className="w-[90%] sm:w-[70%] text-[14px]">
                  Avaliação do desempenho técnico avaliado de 0 a 10 nos ultimo 30 dia.
                </p>
              </div>

              <div className="flex items-center justify-center p-1 w-[34px] h-[34px] sm:w-[54px] sm:h-[54px] border border-black rounded-full">
                9.0
              </div>
            </div>

          </div>
        </section>

        <h2>Histórico técnico (por tipo de técnica)</h2>
      </main>
      <section>
        <h2>Gráficos de evolução (mensal, semanal)</h2>
      </section>
    </div>
  );
}

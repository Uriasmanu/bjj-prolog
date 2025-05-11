"use server";

import { getAulas } from "@/actions/getAulas";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod"


const aulaSchema = z.object({
    data: z.string(),
    tecnica: z.enum(['guarda', 'raspagem', 'finalizacao', 'drill', 'fisico']),
    dificuldade: z.enum(['facil', 'media', 'dificil']),
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const dados = aulaSchema.parse(body);

        const novaAula = await prisma.aula.create({
            data: {
                data: new Date(dados.data),
                tecnica: dados.tecnica,
                dificuldade: dados.dificuldade,
            },
        });


        return NextResponse.json(novaAula);
    } catch (error) {
        console.error("Erro ao criar aula:", error);
        return NextResponse.json({ error: "Erro ao criar aula" }, { status: 500 })
    }
}

export async function GET() {
    try {
        const aulas = await getAulas();
        return NextResponse.json(aulas);

    } catch (error) {
        console.error('Erro ao buscar aulas:', error);
        return NextResponse.json({ message: 'Erro ao buscar aulas' }, { status: 500 });
    }
}
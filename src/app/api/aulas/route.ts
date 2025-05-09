"use server";

import { getAulas } from "@/actions/getAulas";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        const aulas = await getAulas();
        return NextResponse.json(aulas);

    } catch (error) {
        console.error('Erro ao buscar aulas:', error);
        return NextResponse.json({message: 'Erro ao buscar aulas'}, { status: 500 });
    }
}
"use server";
import { neon } from "@neondatabase/serverless";

export async function getAulas() {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    // Fazendo a consulta para pegar todas as aulas
    const data = await sql`
      SELECT id, data, tecnica, dificuldade 
      FROM aulas
    `;
    return data;
  } catch (error) {
    console.error('Erro ao buscar aulas:', error);
    throw new Error('Erro ao buscar aulas');
  }
}

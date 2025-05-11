export async function enviarAula(data: Date, tecnica: string, dificuldade: string) {
    const res = await fetch("/api/aulas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: data.toISOString(),
            tecnica,
            dificuldade,
        }),
    });

    if (!res.ok) {
        throw new Error("Erro ao enviar aula");
    }

    return res.json();
}

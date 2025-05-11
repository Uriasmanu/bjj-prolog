"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import drill from '../../../public/img/drill.jpg'
import finalizacao from '../../../public/img/finalizacao.jpg'
import fisico from '../../../public/img/fisico.jpg'
import guarda from '../../../public/img/guarda.jpg'
import raspagem from '../../../public/img/raspagem.jpg'
import Image from "next/image"
import { useState } from "react"
import { enviarAula } from "@/hooks/enviarAula"



const formSchema = z.object({
    tecnica: z.enum(["guarda", "raspagem", "finalizacao", "drill", "fisico"], {
        errorMap: () => ({ message: "Selecione a tecnica que foi trabalhada na aula" })
    }),
    dob: z.date({
        required_error: "Selecione uma data válida.",
    }),
    dificuldade: z.enum(["facil", "media", "dificil"], {
        errorMap: () => ({ message: "Selecione a dificuldade que sentiu ao realizar a tarefa." })
    }),
})

export default function Aulas() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tecnica: "guarda",
            dob: new Date(),
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await enviarAula(values.dob, values.tecnica, values.dificuldade)
            alert("Sucesso")
        } catch (error) {
            console.error(error);
            alert("erro")
        }
    }

    // Estado para controlar a técnica selecionada
    const [tecnica, setTecnica] = useState<string>('guarda');

    // Determinando a imagem com base na técnica selecionada
    const getImageForTecnica = () => {
        switch (tecnica) {
            case 'guarda':
                return guarda;
            case 'raspagem':
                return raspagem;
            case 'finalizacao':
                return finalizacao;
            case 'fisico':
                return fisico;
            default:
                return drill;
        }
    }

    return (
        <div className="flex flex-col p-8 w-full h-full items-center justify-center gap-6">
            <header>
                <h2 className="text-2xl font-bold">Resumo das aulas</h2>
            </header>
            <main className="flex flex-col-reverse sm:flex-row py-6 justify-between w-full">

                <div className="flex-1 mt-3">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Data do Treino</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Escolha uma data</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tecnica"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <Select onValueChange={(value) => {
                                            field.onChange(value)
                                            setTecnica(value)
                                        }}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Tecnica" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="guarda">Guarda</SelectItem>
                                                <SelectItem value="raspagem">Raspagem</SelectItem>
                                                <SelectItem value="finalizacao">Finalização</SelectItem>
                                                <SelectItem value="drill">Drill</SelectItem>
                                                <SelectItem value="fisico">Fisico</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Selecione a tecnica que você treinou hoje.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>


                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dificuldade"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Dificuldade" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="facil">Facil</SelectItem>
                                                <SelectItem value="media">Media</SelectItem>
                                                <SelectItem value="dificil">Dificil</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Selecione a dificuldade que teve ao executar a tecnica.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>


                                )}
                            />


                            <Button type="submit">Enviar</Button>

                        </form>
                    </Form>
                </div>

                <div className="flex-1">
                    <Image
                        src={getImageForTecnica()}
                        alt="Descrição da imagem"
                        width={400}
                        height={250}
                    />
                </div>

            </main>
        </div>
    )
}

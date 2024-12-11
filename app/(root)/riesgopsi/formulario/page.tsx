
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Home } from 'lucide-react'


import { ScrollArea } from "@/components/ui/scroll-area"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  interface QuestionItem {
    id: string;
    pregunta: string;
  }
import Image from "next/image"
import Link from "next/link"

  
  const DataQuestion: QuestionItem[] = [
    { id: "l1", pregunta: "El ruido en el lugar donde trabajo es molesto" },
    { id: "l2", pregunta: "En el lugar donde trabajo hace mucho frío" },
    { id: "l3", pregunta: "En el lugar donde trabajo hace mucho calor" },
    { id: "l4", pregunta: "El aire en el lugar donde trabajo es fresco y agradable" },
    { id: "l5", pregunta: "La luz del sitio donde trabajo es agradable" },
    { id: "l6", pregunta: "El espacio donde trabajo es cómodo" },
    { id: "l7", pregunta: "En mi trabajo me preocupa estar expuesto a sustancias químicas que afecten mi salud" },
    { id: "l8", pregunta: "Mi trabajo me exige hacer mucho esfuerzo físico" },
    { id: "l9", pregunta: "Los equipos o herramientas con los que trabajo son cómodos" },
    { id: "l10", pregunta: "En mi trabajo me preocupa estar expuesto a microbios, animales o plantas que afecten mi salud" },
    { id: "l11", pregunta: "Me preocupa accidentarme en mi trabajo" },
    { id: "l12", pregunta: "El lugar donde trabajo es limpio y ordenado" },
    { id: "l13", pregunta: "Por la cantidad de trabajo que tengo debo quedarme tiempo adicional" },
    { id: "l14", pregunta: "Me alcanza el tiempo de trabajo para tener al día mis deberes" },
    { id: "l15", pregunta: "Por la cantidad de trabajo que tengo debo trabajar sin parar" },
    { id: "l16", pregunta: "Mi trabajo me exige hacer mucho esfuerzo mental" },
    { id: "l17", pregunta: "Mi trabajo me exige estar muy concentrado" },
    { id: "l18", pregunta: "Mi trabajo me exige memorizar mucha información" },
    { id: "l19", pregunta: "En mi trabajo tengo que hacer cálculos matemáticos" },
    { id: "l20", pregunta: "Mi trabajo requiere que me fije en pequeños detalles" },
    { id: "l21", pregunta: "Trabajo en horario de noche" },
    { id: "l22", pregunta: "En mi trabajo es posible tomar pausas para descansar" },
    { id: "l23", pregunta: "Mi trabajo me exige laborar en días de descanso, festivos o fines de semana" },
    { id: "l24", pregunta: "En mi trabajo puedo tomar fines de semana o días de descanso al mes" },
    { id: "l25", pregunta: "Cuando estoy en casa sigo pensando en el trabajo" },
    { id: "l26", pregunta: "Discuto con mi familia o amigos por causa de mi trabajo" },
    { id: "l27", pregunta: "Debo atender asuntos de trabajo cuando estoy en casa" },
    { id: "l28", pregunta: "Por mi trabajo el tiempo que paso con mi familia y amigos es muy poco" },
    { id: "l29", pregunta: "En mi trabajo puedo hacer cosas nuevas" },
    { id: "l30", pregunta: "Mi trabajo me permite desarrollar mis habilidades" },
    { id: "l31", pregunta: "Mi trabajo me permite aplicar mis conocimientos" },
    { id: "l32", pregunta: "Mi trabajo me permite aprender nuevas cosas" },
    { id: "l33", pregunta: "Puedo tomar pausas cuando las necesito" },
    { id: "l34", pregunta: "Puedo decidir cuánto trabajo hago en el día" },
    { id: "l35", pregunta: "Puedo decidir la velocidad a la que trabajo" },
    { id: "l36", pregunta: "Puedo cambiar el orden de las actividades en mi trabajo" },
    { id: "l37", pregunta: "Puedo parar un momento mi trabajo para atender algún asunto personal" },
    { id: "l38", pregunta: "Me explican claramente los cambios que ocurren en mi trabajo" },
    { id: "l39", pregunta: "Puedo dar sugerencias sobre los cambios que ocurren en mi trabajo" },
    { id: "l40", pregunta: "Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas y sugerencias" },
    { id: "l41", pregunta: "Me informan con claridad cuáles son mis funciones" },
    { id: "l42", pregunta: "Me informan cuáles son las decisiones que puedo tomar en mi trabajo" },
    { id: "l43", pregunta: "Me explican claramente los resultados que debo lograr en mi trabajo" },
    { id: "l44", pregunta: "Me explican claramente los objetivos de mi trabajo" },
    { id: "l45", pregunta: "Me informan claramente con quien puedo resolver los asuntos de trabajo" },
    { id: "l46", pregunta: "La empresa me permite asistir a capacitaciones relacionadas con mi trabajo" },
    { id: "l47", pregunta: "Recibo capacitación útil para hacer mi trabajo" },
    { id: "l48", pregunta: "Recibo capacitación que me ayuda a hacer mejor mi trabajo" },
    { id: "l49", pregunta: "Mi jefe ayuda a organizar mejor el trabajo" },
    { id: "l50", pregunta: "Mi jefe tiene en cuenta mis puntos de vista y opiniones" },
    { id: "l51", pregunta: "Mi jefe me anima para hacer mejor mi trabajo" },
    { id: "l52", pregunta: "Mi jefe distribuye las tareas de forma que me facilita el trabajo" },
    { id: "l53", pregunta: "Mi jefe me comunica a tiempo la información relacionada con el trabajo" },
    { id: "l54", pregunta: "La orientación que me da mi jefe me ayuda a hacer mejor el trabajo" },
    { id: "l55", pregunta: "Mi jefe me ayuda a progresar en el trabajo" },
    { id: "l56", pregunta: "Mi jefe me ayuda a sentirme bien en el trabajo" },
    { id: "l57", pregunta: "Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo" },
    { id: "l58", pregunta: "Mi jefe me trata con respeto" },
    { id: "l59", pregunta: "Siento que puedo confiar en mi jefe" },
    { id: "l60", pregunta: "Mi jefe me escucha cuando tengo problemas de trabajo" },
    { id: "l61", pregunta: "Mi jefe me brinda su apoyo cuando lo necesito" },
    { id: "l62", pregunta: "Me agrada el ambiente de mi grupo de trabajo" },
    { id: "l63", pregunta: "En mi grupo de trabajo me tratan de forma respetuosa" },
    { id: "l64", pregunta: "Siento que puedo confiar en mis compañeros de trabajo" },
    { id: "l65", pregunta: "Me siento a gusto con mis compañeros de trabajo" },
    { id: "l66", pregunta: "En mi grupo de trabajo algunas personas me maltratan" },
    { id: "l67", pregunta: "Entre compañeros solucionamos los problemas de forma respetuosa" },
    { id: "l68", pregunta: "Mi grupo de trabajo es muy unido" },
    { id: "l69", pregunta: "Cuando tenemos que realizar trabajo de grupo los compañeros colaboran" },
    { id: "l70", pregunta: "Es fácil poner de acuerdo al grupo para hacer el trabajo" },
    { id: "l71", pregunta: "Mis compañeros de trabajo me ayudan cuando tengo dificultades" },
    { id: "l72", pregunta: "En mi trabajo las personas nos apoyamos unos a otros" },
    { id: "l73", pregunta: "Algunos compañeros de trabajo me escuchan cuando tengo problemas" },
    { id: "l74", pregunta: "Me informan sobre lo que hago bien en mi trabajo" },
    { id: "l75", pregunta: "Me informan sobre lo que debo mejorar en mi trabajo" },
    { id: "l76", pregunta: "La información que recibo sobre mi rendimiento en el trabajo es clara" },
    { id: "l77", pregunta: "La forma como evalúan mi trabajo en la empresa me ayuda a mejorar" },
    { id: "l78", pregunta: "Me informan a tiempo sobre lo que debo mejorar en el trabajo" },
    { id: "l79", pregunta: "En la empresa me pagan a tiempo mi salario" },
    { id: "l80", pregunta: "El pago que recibo es el que me ofreció la empresa" },
    { id: "l81", pregunta: "El pago que recibo es el que merezco por el trabajo que realizo" },
    { id: "l82", pregunta: "En mi trabajo tengo posibilidades de progresar" },
    { id: "l83", pregunta: "Las personas que hacen bien el trabajo pueden progresar en la empresa" },
    { id: "l84", pregunta: "La empresa se preocupa por el bienestar de los trabajadores" },
    { id: "l85", pregunta: "Mi trabajo en la empresa es estable" },
    { id: "l86", pregunta: "El trabajo que hago me hace sentir bien" },
    { id: "l87", pregunta: "Siento orgullo de trabajar en esta empresa" },
    { id: "l88", pregunta: "Hablo bien de la empresa con otras personas" },
    { id: "l89", pregunta: "Atiendo clientes o usuarios muy enojados" },
    { id: "l90", pregunta: "Atiendo clientes o usuarios muy preocupados" },
    { id: "l91", pregunta: "Atiendo clientes o usuarios muy tristes" },
    { id: "l92", pregunta: "Mi trabajo me exige atender personas muy enfermas" },
    { id: "l93", pregunta: "Mi trabajo me exige atender personas muy necesitadas de ayuda" },
    { id: "l94", pregunta: "Atiendo clientes o usuarios que me maltratan" },
    { id: "l95", pregunta: "Mi trabajo me exige atender situaciones de violencia" },
    { id: "l96", pregunta: "Mi trabajo me exige atender situaciones muy tristes o dolorosas" },
    { id: "l97", pregunta: "Puedo expresar tristeza o enojo frente a las personas que atiendo" }
];
const FormSchema = z.object({
    l1: z.string(),
    l2: z.string(),
    l3: z.string(),
    l4: z.string(),
    l5: z.string(),
    l6: z.string(),
    l7: z.string(),
    l8: z.string(),
    l9: z.string(),
    l10: z.string(),
    l11: z.string(),
    l12: z.string(),
    l13: z.string(),
    l14: z.string(),
    l15: z.string(),
    l16: z.string(),
    l17: z.string(),
    l18: z.string(),
    l19: z.string(),
    l20: z.string(),
    l21: z.string(),
    l22: z.string(),
    l23: z.string(),
    l24: z.string(),
    l25: z.string(),
    l26: z.string(),
    l27: z.string(),
    l28: z.string(),
    l29: z.string(),
    l30: z.string(),
    l31: z.string(),
    l32: z.string(),
    l33: z.string(),
    l34: z.string(),
    l35: z.string(),
    l36: z.string(),
    l37: z.string(),
    l38: z.string(),
    l39: z.string(),
    l40: z.string(),
    l41: z.string(),
    l42: z.string(),
    l43: z.string(),
    l44: z.string(),
    l45: z.string(),
    l46: z.string(),
    l47: z.string(),
    l48: z.string(),
    l49: z.string(),
    l50: z.string(),
    l51: z.string(),
    l52: z.string(),
    l53: z.string(),
    l54: z.string(),
    l55: z.string(),
    l56: z.string(),
    l57: z.string(),
    l58: z.string(),
    l59: z.string(),
    l60: z.string(),
    l61: z.string(),
    l62: z.string(),
    l63: z.string(),
    l64: z.string(),
    l65: z.string(),
    l66: z.string(),
    l67: z.string(),
    l68: z.string(),
    l69: z.string(),
    l70: z.string(),
    l71: z.string(),
    l72: z.string(),
    l73: z.string(),
    l74: z.string(),
    l75: z.string(),
    l76: z.string(),
    l77: z.string(),
    l78: z.string(),
    l79: z.string(),
    l80: z.string(),
    l81: z.string(),
    l82: z.string(),
    l83: z.string(),
    l84: z.string(),
    l85: z.string(),
    l86: z.string(),
    l87: z.string(),
    l88: z.string(),
    l89: z.string(),
    l90: z.string(),
    l91: z.string(),
    l92: z.string(),
    l93: z.string(),
    l94: z.string(),
    l95: z.string(),
    l96: z.string(),
    l97: z.string(),
    hola: z.string()
})
type FormValues = z.infer<typeof FormSchema>
export default function Page() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
   
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
   alert('Datos enviados correctamente')
  }
  const hola = "hola"
  return (
    <div className="w-full flex justify-center p-6 mt-6">
        <Link href={"/"} className="fixed top-6 left-6 text-black flex items-center">
            <Home size={24} className="text-green-500 mr-3" />  Volver al inicio
        </Link>

        <div className="w-[30%] flex flex-col items-center">
            <Image
            src="/assets/Logo.svg"
            alt="logo"
            width={800}
            height={200}
            className="drop-shadow-2xl"
            >

            </Image>
            <h1 className="text-black text-xl mb-4">Responde todas las preguntas</h1>
            <ScrollArea className="h-[700px] w-[450px] rounded-md border p-4">


            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 p-2" >
            {DataQuestion.map((item, index) => (   
                <FormField
                    key={item.id}
                    control={form.control}
                    name={item.id as keyof FormValues}
                    render={({ field }) => (
                        <FormItem className="text-black">
                            <FormLabel className="text-black flex w-full">
                                <span className=" text-green-500 mr-4 rounded-full flex items-center justify-center">{index + 1}</span>
                               <span>{item.pregunta}</span> 
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una opción" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="nunca">Nunca</SelectItem>
                                    <SelectItem value="casi_nunca">Casi Nunca</SelectItem>
                                    <SelectItem value="algunas_veces">Algunas Veces</SelectItem>
                                    <SelectItem value="casi_siempre">Casi Siempre</SelectItem>
                                    <SelectItem value="siempre">Siempre</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
                
                <Button type="submit" >Submit</Button>
            </form>
            </Form>
            </ScrollArea>
        </div>
    </div>
  )
}

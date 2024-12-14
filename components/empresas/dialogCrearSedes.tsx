"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const FormSchema = z.object({
  nombre: z.string(),
  direccion: z.string(),
})

interface InputFormProps {
  onFormSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export function DialogCrearSedes({ onFormSubmit }: InputFormProps) {
    const [open, setOpen] = useState(false)
    
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        nombre: "",
        direccion: ""
      },
      })
    
    function onSubmit(data: z.infer<typeof FormSchema>) {
        setOpen(false)
        onFormSubmit(data);
        form.reset();
      }
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
        <Button >Crear Sede</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle className="text-green-500 text-xl">Crea una Sede</DialogTitle>
          <DialogDescription>
            Diligencia los campos solicitados para crear una nueva sede.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nombre de la sede</FormLabel>
                    <FormControl>
                        <Input placeholder="Medical sede SUR" {...field}  className="text-black"/>
                    </FormControl>
                    <FormDescription>
                        Procura poner un nombre distintivo
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="direccion"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                        <Input placeholder="Cra ###" {...field}  className="text-black"/>
                    </FormControl>
                    <FormDescription>
                        Procura poner una dirección exacta
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

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
  tipoDocumento: z.string({ required_error: "Seleccione un tipo de documento" }),
  numeroDocumento: z.string().min(5, { message: "ID debe tener al menos 5 caracteres" }),
  nombre: z.string().min(2, { message: "Nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Email inválido" }),
  tipoForm: z.string({ required_error: "Seleccione un tipo de formulario" })
})

interface InputFormProps {
  onFormSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export function DialogCrearEmpleados({ onFormSubmit }: InputFormProps) {
    const [open, setOpen] = useState(false)
    
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        nombre: "",
        tipoDocumento: "",
        numeroDocumento: "",
        email: "",
        tipoForm: ""
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
        <Button >Crear Nuevo empleado</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle className="text-green-500 text-xl">Crea un Empleado</DialogTitle>
          <DialogDescription>
            Diligencia los campos solicitados para crear un nuevo empleado.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="tipoDocumento"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Tipo de documento de identidad</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                              <SelectTrigger>
                                  <SelectValue placeholder="Selecciona una opción" />
                              </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CEDULA_CIUDADANIA">Cédula de ciudadanía</SelectItem>
                            <SelectItem value="CEDULA_EXTRANJERIA">Cédula de extranjería</SelectItem>
                            <SelectItem value="OTRA">Otra</SelectItem>                          
                          </SelectContent>
                      </Select>
                      <FormDescription>
                          This is your public type of document.
                      </FormDescription>
                      <FormMessage />
                      </FormItem>
                  )}
                />
                <FormField
                control={form.control}
                name="numeroDocumento"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Número de documento</FormLabel>
                    <FormControl>
                        <Input placeholder="1005286444" type="number" {...field}  className="text-black"/>
                    </FormControl>
                    <FormDescription>
                        This is your id.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                        <Input placeholder="Carlos Daniel Blanco Herrera" {...field}  className="text-black"/>
                    </FormControl>
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                
                
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input  placeholder="carlos@gmail.com" {...field}  className="text-black"/>
                    </FormControl>
                    <FormDescription>
                        This is your email.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="tipoForm"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tipo de form</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription>
                        This is your public type of form.
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

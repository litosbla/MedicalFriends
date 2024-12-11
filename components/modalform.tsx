'use client'
import React, { useState, useRef, useEffect } from 'react';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

Amplify.configure(outputs);

const client = generateClient<Schema>();

const formSchema = z.object({
    nombre: z.string().min(3, {
      message: "Username must be at least 2 characters.",
    }),
    nit: z.string().min(3),
    plan: z.enum(["BASICO","PREMIUM"])
  })

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      plan: "BASICO"
    },
  })
 

  function onSubmit(values: z.infer<typeof formSchema>) {
    client.models.Empresa.create({
        nit: values.nit,
        nombre: values.nombre,
        plan: values.plan
      });
    setIsOpen(false);
  }

  return (
    <div className="p-4">
      <button
        onClick={handleOpen}
        className='rounded p-2 bg-green-500 text-white font-bold '
      >
        + Nueva Empresa
      </button>

      {isOpen && (
        <div 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mt-20 bg-white border rounded-lg shadow-xl"
        >
          <div className="flex justify-between items-center p-4 ">
            <h2 className="text-xl font-semibold">Crea Una Nueva Empresa</h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem className='flex gap-2 pl-4'>
                            <FormLabel className='w-[150px] mt-2 items-center flex'>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Medical Friends S.A.S" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form-message" />
                        </FormItem>
                    )}
                    />
                    <FormField  
                    control={form.control}
                    name="nit"
                    render={({ field }) => (
                        <FormItem className='flex gap-2 pl-4'>
                            <FormLabel className='w-[150px] mt-2 items-center flex'>NIT</FormLabel>
                            <FormControl>
                                <Input placeholder="1.222.333" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form-message" />
                        </FormItem>
                    )}
                    />
                    <FormField  
                    control={form.control}
                    name="plan"
                    render={({ field }) => (
                        <FormItem className='flex gap-2 pl-4'>
                            <FormLabel className='w-[150px] mt-2 items-center flex'>NIT</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="BASICO">Básico</SelectItem>
                                    <SelectItem value="=PREMIUM">Premium</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage className="shad-form-message" />
                        </FormItem>
                    )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
          </div>

          <div className="flex justify-end gap-2 p-4 border-t">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


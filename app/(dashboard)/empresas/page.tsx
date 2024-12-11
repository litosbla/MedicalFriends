'use client'
import React, { useState, useRef, useEffect } from 'react';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button"
import Link from "next/link"
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
import { Building2, MoreVertical, Users, Calendar, Edit, Eye} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

Amplify.configure(outputs);

const client = generateClient<Schema>();

const formSchema = z.object({
    nombre: z.string().min(3, {
      message: "Username must be at least 2 characters.",
    }),
    nit: z.string().min(3),
    plan: z.enum(["BASICO","PREMIUM"])
  })

function Empresas() {

  const [empresa, setEmpresa] = useState<Array<Schema["Empresa"]["type"]>>([]);

  function listEmpresa() {
    client.models.Empresa.observeQuery().subscribe({
      next: (data) => setEmpresa([...data.items]),
    });
  }

  useEffect(() => {
    listEmpresa();
  }, []);
  
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
    <div className='flex flex-col'>
      <div className="flex justify-between items-center drop-shadow-2xl mb-5">
        <div>
          <h1 className='text-4xl font-bold drop-shadow-xl'>Empresas</h1>
          <h3 className=' text-green-600'>Acá puedes gestionar tus empresas</h3>
        </div>
        <div className="p-4">
        <button
          onClick={handleOpen}
          className='rounded p-2 bg-green-500 text-white font-bold '
        >
          + Nueva Empresa
        </button>

      {isOpen && 
        <div 
          className="fixed top-[20vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mt-20 bg-white border rounded-lg shadow-xl"
        >
          <div className="flex justify-center items-center p-4 ">
            <h2 className="text-xl font-semibold text-green-500 border-b-[1px] border-gray-100">Crea Una Nueva Empresa</h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors fixed top-1 right-1"
            >
              <X className="w-5 h-5 " />
            </button>
          </div>
          
          <div className="p-4">
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                              <FormLabel className='w-[150px] mt-2 items-center flex'>Plan</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                  <SelectTrigger>
                                      <SelectValue placeholder="Select a verified email to display" />
                                  </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                      <SelectItem value="BASICO">Básico</SelectItem>
                                      <SelectItem value="PREMIUM">Premium</SelectItem>
                                  </SelectContent>
                              </Select>
                              <FormMessage className="shad-form-message" />
                          </FormItem>
                      )}
                      />
                      <div className='w-full flex justify-center'>
                        <Button type="submit" className='bg-green-500 text-white border'>Crear</Button>
                      </div>
                     
                  </form>
              </Form>
            </div>
          </div>
        }
      </div>
        
       
  
      </div>
      <div className='w-full h-full flex flex-wrap' >
        {empresa.map((emp) => (
        <div className='w-[300px] h-[100px] p-2 flex justify-between items-center mt-3 border rounded-xl shadow-xl border-green-100 mr-3 mb-3' key={emp.nit}>
          <Link className='flex items-center flex-1' href={`/empresas/${emp.nit}`}>        
            <Building2 className="h-6 w-6 text-green-600 mr-4" />
            <div className="flex flex-col">
              <h2 className='text-lg font-semibold text-gray-800'>{emp.nombre}</h2>
              <p className='text-sm text-gray-500'>{emp.createdAt}</p>
            </div>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger> <MoreVertical className="h-5 w-5 text-green-600" /></DropdownMenuTrigger>
            <DropdownMenuContent className='w-45'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem> <Link href={`/empresas/${emp.nit}/empleados`} className='flex items-center w-full'> <Users className="h-4 w-4 mr-4 text-green-600" />Empleados </Link> </DropdownMenuItem>
              <DropdownMenuItem> <Link href={`/empresas/${emp.nit}/citas`} className='flex items-center w-full'> <Calendar className="h-4 w-4 mr-2 text-green-600" />Citas </Link></DropdownMenuItem>
              <DropdownMenuItem> <Link href={`/empresas/${emp.nit}/editar`} className='flex items-center w-full'> <Edit className="h-4 w-4 mr-2 text-green-600" />Editar</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        ))}
      </div>
      
    </div>
  )
}

export default Empresas
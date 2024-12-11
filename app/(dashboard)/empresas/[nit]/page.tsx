'use client'

import React, { useState, useRef, useEffect } from 'react';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { Building2, ChevronDown, RotateCw , MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GraficoPie from '@/components/graficopie';
import { GraficoLineas } from '@/components/graficolineas';
import { GraficoBarras } from '@/components/graficobarras';
import { TableComponent } from '@/components/tablecomponent';
import { DropdownThreeDots } from '@/components/customtreedots';
import { DatePickerForm } from '@/components/datepicker';
import { DialogCrearEmpleados } from '@/components/empresas/dialogCrearEmpleados';
import { useToast } from "@/hooks/use-toast"
import { DialogImportarEmpleados } from '@/components/empresas/dialogImportarEmpleados';

interface Option {
  value: string;
  label: string;
}

Amplify.configure(outputs);

const chartData1 = [
  { riesgo: "alto", personas: 387, fill: "var(--color-alto)" },
  { riesgo: "medio", personas: 245, fill: "var(--color-medio)" },
  { riesgo: "bajo", personas: 198, fill: "var(--color-bajo)" },
  { riesgo: "sinRiesgo", personas: 170, fill: "var(--color-sinRiesgo)" },
];

const chartData2 = [
  { riesgo: "alto", personas: 156, fill: "var(--color-alto)" },
  { riesgo: "medio", personas: 423, fill: "var(--color-medio)" },
  { riesgo: "bajo", personas: 267, fill: "var(--color-bajo)" },
  { riesgo: "sinRiesgo", personas: 154, fill: "var(--color-sinRiesgo)" },
];

const chartData3 = [
  { riesgo: "alto", personas: 187, fill: "var(--color-alto)" },
  { riesgo: "medio", personas: 234, fill: "var(--color-medio)" },
  { riesgo: "bajo", personas: 456, fill: "var(--color-bajo)" },
  { riesgo: "sinRiesgo", personas: 123, fill: "var(--color-sinRiesgo)" },
];

const chartData4 = [
  { riesgo: "alto", personas: 145, fill: "var(--color-alto)" },
  { riesgo: "medio", personas: 189, fill: "var(--color-medio)" },
  { riesgo: "bajo", personas: 234, fill: "var(--color-bajo)" },
  { riesgo: "sinRiesgo", personas: 398, fill: "var(--color-sinRiesgo)" },
];
const chartData5 = [
  { month: "Junio", alto: 186, bajo: 80, medio: 45, sinRiesgo: 20 },
  { month: "Julio", alto: 305, bajo: 200, medio: 100, sinRiesgo: 50 },
  { month: "Agosto", alto: 237, bajo: 120, medio: 150, sinRiesgo: 30 },
  { month: "Septiembre", alto: 73, bajo: 190, medio: 50, sinRiesgo: 45 },
  { month: "Octubre", alto: 209, bajo: 130, medio: 100, sinRiesgo: 60 },
  { month: "Noviembre", alto: 214, bajo: 140, medio: 160, sinRiesgo: 25 }
];
const chartData6 = [
  { riesgo: "alto", personas: 50, fill: "var(--color-alto)" },
  { riesgo: "medio", personas: 60, fill: "var(--color-medio)" },
  { riesgo: "bajo", personas: 80, fill: "var(--color-bajo)" },
  { riesgo: "sinRiesgo", personas: 75, fill: "var(--color-sinRiesgo)" }
]
const empleados1 =  [
  {
    tipoDocumento: "DNI",
    numeroDocumento: 45678912,
    nombre: "Ana María López",
    email: "ana.lopez@email.com",
    tipoForm: "Formulario A"
  },
  {
    tipoDocumento: "Pasaporte",
    numeroDocumento: 78234567,
    nombre: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    tipoForm: "Formulario B"
  },
  {
    tipoDocumento: "DNI",
    numeroDocumento: 34567891,
    nombre: "María García",
    email: "maria.garcia@email.com",
    tipoForm: "Formulario A"
  },
  {
    tipoDocumento: "CE",
    numeroDocumento: 89123456,
    nombre: "Juan Pablo Martínez",
    email: "juan.martinez@email.com",
    tipoForm: "Formulario C"
  },
  {
    tipoDocumento: "DNI",
    numeroDocumento: 23456789,
    nombre: "Laura Sánchez",
    email: "laura.sanchez@email.com",
    tipoForm: "Formulario B"
  },
  {
    tipoDocumento: "Pasaporte",
    numeroDocumento: 67891234,
    nombre: "Diego Torres",
    email: "diego.torres@email.com",
    tipoForm: "Formulario A"
  },
  {
    tipoDocumento: "CE",
    numeroDocumento: 12345678,
    nombre: "Sofia Ramírez",
    email: "sofia.ramirez@email.com",
    tipoForm: "Formulario C"
  }
];

const client = generateClient<Schema>();
const options = [
    { value: 'bateria', label: 'Bateria de Riesgo Psicosocial' },
    { value: 'trabajo', label: 'Puesto de Trabajo' }
  ];
function PaginaEmpresa({params}:{params:{nit:string}}) {
 
    const { toast } = useToast()
    const {nit} = params
    const [empresa, setEmpresa] = useState<Array<Schema["Empresa"]["type"]>>([]);
    const [empleados, setEmpleados] = useState<Array<Schema["Empleado"]["type"]>>([]);
    
    function listEmpleados() {
      client.models.Empleado.observeQuery({
        filter: {
          empresaId: {
            eq: nit
          }
        }
      }).subscribe({
        next: (data) => setEmpleados([...data.items]),
      });
    }
  
    function listEmpresa() {
        client.models.Empresa.observeQuery({
            filter: {
              nit: {
                eq: nit
              }
            }
          }).subscribe({
            next: (data) => setEmpresa([...data.items]),
          });
    }
  
    
  
    useEffect(() => {
      listEmpleados();
      listEmpresa();
    }, []);
    
    const [isOpen, setIsOpen] = useState(false);
    const [isEmpleado, setIsEmpleado] = useState(false);
    const [isCita, setIsCita] = useState(false);
    const [isOpenCita, setIsOpenCita] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option>({ value: 'bateria', label: 'Bateria de Riesgo Psicosocial' });

    const handleSelect = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    const handleEmpleado = () => {
      setIsEmpleado(true);
      setIsCita(false);

    };
    const handleEstadisticas = () => {
      setIsEmpleado(false);
      setIsCita(false);
    };
    const handleCitas = () => {
      setIsEmpleado(false);
      setIsCita(true);
    };
  
    const crearEmpleado = (data: any) => {
      console.log(empleados)
      const empleadoExistente = empleados.find(
        emp => emp.numeroDocumento === data.numeroDocumento
      );
      if (empleadoExistente) {
        toast({
          title: "Error",
          description: "El empleado ya existe",
          variant: "destructive"
        });
        return;
      }
      const empleadoData1 = {
        ...data,
        empresaId: nit
      };

      client.models.Empleado.create(empleadoData1);
      toast({
          title: "¡Éxito!",
          description: "El empleado fue creado correctamente",
          className: "bg-green-500 text-white"
      });
    }


    const handleExcelData = async (data: any[]) => {
      // Aquí puedes manejar los datos del Excel
      console.log("Datos en el componente padre:", data);

      try {
        await Promise.all(
          data.map(empleado => 
            client.models.Empleado.create({
              ...empleado,
              empresaId: nit
            })
          )
        );
    
        toast({
          title: "Éxito",
          description: `Se crearon ${data.length} empleados correctamente`,
          className: "bg-green-500 text-white"
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Hubo un error al crear los empleados",
          variant: "destructive"
        });
      }
    };
 
  return (
    <div>
      {empresa.length > 0 ? (
        <div className='w-full flex flex-col'>
            <section className='w-full justify-between flex items-center'>
                <div className='flex items-end p-2 border-b-2 border-green-200'>
                    <Building2 className='w-[40px] h-[40px] text-green-500 mr-2 self-center mt-1'/>
                    <h1 className='text-5xl text-gray-800'>{empresa[0].nombre}</h1>
                </div>
                
            </section>
            <section className='w-full flex flex-col p-4 items-center'>
                <div className='flex justify-between flex-row w-full'>
                  {/* Acciones dentro de la ventana */}
                  <div className="relative w-64">
                    {
                      isEmpleado ? (
                          <div className='flex'>

                            <DialogImportarEmpleados onDataLoad={handleExcelData} />
                          
                            <DialogCrearEmpleados onFormSubmit={crearEmpleado}/>
                          </div>
                      ) : isCita ? (
                        <button
                            type="button"
                            className="w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 flex justify-between items-center"
                            onClick={() => setIsOpenCita(!isOpenCita)}
                            >
                            Nueva Cita
                          </button>
                      ):
                      (
                        <button
                          type="button"
                          onClick={() => setIsOpen(!isOpen)}
                          className="w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 flex justify-between items-center"
                      >
                          <span className={`block truncate ${!selectedOption ? 'text-gray-500' : 'text-gray-900'}`}>
                          {selectedOption ? selectedOption.label : "selecciona una opcion"}
                          </span>
                          <ChevronDown 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                              isOpen ? 'transform rotate-180' : ''
                          }`}
                          />
                      </button>
                      )
                    
                    }
                      
                      {isOpenCita && (
                        <div className="absolute z-10 mt-1 bg-white shadow-lg overflow-auto">
                          <DatePickerForm />
                        </div>
                      )}
                      {isOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                          {options.map((option) => (
                              <div
                              key={option.value}
                              onClick={() => handleSelect(option)}
                              className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors"
                              >
                              {option.label}
                              </div>
                          ))}
                          </div>
                      )}
                  </div>
                  {/*  controladores de navegacion */}
                  <div className='flex gap-3'>
                    <Button className='bg-white text-black border hover:text-white hover:bg-green-500' onClick={() => handleEstadisticas()} >
                      Estadísticas
                    </Button>
                    <Button className='bg-white text-black border hover:text-white hover:bg-green-500' onClick={() => handleEmpleado()} >
                      Empleados
                    </Button>
                    <Button className='bg-white text-black border hover:text-white hover:bg-green-500' onClick={() => handleCitas()}>
                          Citas
                    </Button>
                  

                    {
                    (!isEmpleado && !isCita ) ? (
                    <Button className='bg-white text-black border hover:text-white hover:bg-green-500'>
                        Descargar PDF
                    </Button>): null
                    }
                    <Button className='bg-white text-black border hover:text-white hover:bg-green-500'>
                        <RotateCw />
                    </Button >
                    <Button className='bg-white text-black border hover:text-white hover:bg-green-500'>
                        <MoreVertical />
                    </Button>

                    
                  </div>
                </div>
                {isEmpleado ? (
                  <div className='w-full mt-4'> 
               
                    <TableComponent chartData={empleados} />
         
                  </div>
                  ): isCita ? (
                    <div className='w-full flex flex-wrap mt-4 gap-4'> 
                      <div className='w-[48%] border rounded-md h-[100px] p-4 flex shadow-[0_4px_12px_rgba(0,255,0,0.4)] items-center'>
                        <div className='w-full'>
                          <h1 className='text-xl font-medium'>ACTIVA</h1> 
                          <div className='flex justify-between'>
                            <span> 26 de noviembre de 2024</span>
                            <span className="text-gray-500 text-sm mr-3">432-111</span>
                          </div>
                         
                        </div>
                        <DropdownThreeDots/>
                      </div>
                      <div className='w-[48%] border rounded-md h-[100px] p-4 flex shadow-[0_4px_12px_rgba(255,165,0,0.4)] items-center'>
                        <div className='w-full'>
                          <h1 className='text-xl font-medium'>DESACTIVADA</h1> 
                          <div className='flex justify-between'>
                            <span> 26 de noviembre de 2024</span>
                            <span className="text-gray-500 text-sm mr-3">110-202</span>
                          </div>
                         
                        </div>
                        <DropdownThreeDots/>
                      </div>
                    </div>
                  ): (selectedOption.value === 'bateria') ? (
                    <div className='flex flex-col w-full gap-4 mt-4'>
                      <div className='flex w-full gap-4'>
                        <GraficoBarras chartData={chartData6} title='Riesgo Actual' className='w-[50%]'/>
                        <GraficoLineas chartData={chartData5} title='Historico de Riesgo' className='flex-1' />
                      </div>
                    <div className='flex flex-wrap w-full gap-4'>         
                      <GraficoPie chartData={chartData1} title='Liderazgo y Relaciones Sociales en el Trabajo'/>
                      <GraficoPie chartData={chartData2} title='Control Sobre el trabajo'/>
                      <GraficoPie chartData={chartData3} title='Demandas del Trabajo'/>
                      <GraficoPie chartData={chartData4} title='Recompensas'/>
                    </div> 
                    </div>
                  ) : (
                    <div className="text-gray-600">
                      {selectedOption ? selectedOption.label : "Selecciona una opción"}
                    </div>
                  )}
               
            </section>   
        </div>
      ) : (
        <div className='text-2xl w-full h-[600px] flex items-center justify-center'>Loading</div>
      )}
    </div>
  )
}

export default PaginaEmpresa
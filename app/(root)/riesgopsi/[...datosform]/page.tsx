'use client'
import FormPersonales from '@/components/formularios/formPersonales';
import { set } from 'date-fns';
import { Home } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import FormIntralaboral from '@/components/formularios/formIntralaboral';
import { dataintralaboralA,dataintralaboralB, dataextralaboral,dataestres, scaleOptions,scaleOptions2 } from "@/constants/questionsintralaboral";
Amplify.configure(outputs);

const client = generateClient<Schema>();


function PaginaFormulario({params}: {params: {datosform: string[]}}) {
    const [otp, numeroDocumento, tipoForm] = params.datosform;


    const subirPersonales = (data: any) => {
      console.log(data);
      setPersonales(false);
      setIntralaboral(true);
    }
    const subirIntralaboralA = (data: any) => {
      console.log(data);
      setPersonales(false);
      setIntralaboral(true);
    }
    const subirIntralaboralB = (data: any) => {
      console.log(data);
      setPersonales(false);
      setIntralaboral(true);
    }
    const subirExtralaboral = (data: any) => {
      console.log(data);
      setPersonales(false);
      setIntralaboral(true);
    }
    const subirEstres = (data: any) => {
      console.log(data);
      setPersonales(false);
      setIntralaboral(true);
    }

    const [personales, setPersonales] = useState(false);
    const [intralaboral, setIntralaboral] = useState(false);
    const [extralaboral, setExtralaboral] = useState(true);
    const [estres, setEstres] = useState(false);

  return (
    <div className="w-full flex justify-center p-6 bg-white min-h-max">
      <Link href={"/"} className="fixed top-6 left-6 text-black flex items-center">
          <Home size={24} className="text-green-500 mr-3" />  Volver al inicio
      </Link>
      {personales && (<FormPersonales onHitSubmit={subirPersonales} />)}
      {intralaboral && (
        tipoForm === 'A' ? (
          <FormIntralaboral onHitSubmit={subirIntralaboralA} titulo='Formulario Intralaboral A' surveyData={dataintralaboralA} scaleOptions={scaleOptions} />
        ) : (
          <FormIntralaboral onHitSubmit={subirIntralaboralB} titulo='Formulario Intralaboral B' surveyData={dataintralaboralB} scaleOptions={scaleOptions} />
        )
      )
      }
      {extralaboral && (
        <FormIntralaboral onHitSubmit={subirExtralaboral} titulo='Formulario Extralaboral' surveyData={dataextralaboral} scaleOptions={scaleOptions}/>
        )}
      {estres && (
        <FormIntralaboral onHitSubmit={subirEstres} titulo='Formulario Estrés' surveyData={dataestres} scaleOptions={scaleOptions2}/>
        )}
     


    </div>
  )
}

export default PaginaFormulario
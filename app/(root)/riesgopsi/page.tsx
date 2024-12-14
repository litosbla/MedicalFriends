"use client"

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

import React, { useState, useEffect } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"

import { useRouter } from 'next/navigation'


Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function Page() {
  const router = useRouter()
  const [value, setValue] = useState('');
  const [valueOtp, setValueOtp] = useState("");
  

  const handleDocumento = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };



  const handleSave = async () => {
    try {
      // Validar que los valores no estén vacíos
      if (!valueOtp || !value) {
        alert('Por favor complete todos los campos requeridos');
        return;
      }
  
      // Intentar obtener la cita y el empleado
      let cita, empleado, sede;
  
      try {
        cita = await client.models.Citas.get({ otp: valueOtp });
        if (!cita) {
          alert('No se encontró la cita con el OTP proporcionado');
          return;
        }
      } catch (error) {
        console.error('Error al buscar la cita:', error);
        alert('Error al verificar la cita. Por favor intente nuevamente');
        return;
      }
  
      try {
        empleado = await client.models.Empleado.get({ numeroDocumento: value });
        if (!empleado) {
          alert('No se encontró el empleado con el número de documento proporcionado');
          return;
        }
      } catch (error) {
        console.error('Error al buscar el empleado:', error);
        alert('Error al verificar el empleado. Por favor intente nuevamente');
        return;
      }

      try {
        sede = await client.models.Sedes.get({ idsedes: cita.data?.sedeId as string });
        if (!sede) {
          alert('No se encontró la sede de la cita');
          return;
        }
      } catch (error) {
        console.error('Error al buscar la sede:', error);
        alert('Error al verificar la sede. Por favor intente nuevamente');
        return;
      }
  
      // Realizar validaciones adicionales
      const validaciones = {
        citaActiva: cita.data?.estado === 'ACTIVA',
        coincideEmpleado: sede.data?.empresaId === empleado.data?.empresaId,
      };
  
      // Verificar todas las validaciones
      if (Object.values(validaciones).every(v => v)) {
        router.push(`/riesgopsi/${cita.data?.otp}/${empleado.data?.numeroDocumento}/${empleado.data?.tipoForm}`);
      } else {
        let mensaje = 'Los datos no son correctos:\n';
        if (!validaciones.citaActiva) mensaje += '- La cita no está activa\n';
        if (!validaciones.coincideEmpleado) mensaje += '- La cita no corresponde al empleado\n';
       
        alert(mensaje);
      }
  
    } catch (error) {
      console.error('Error en handleSave:', error);
      alert('Ocurrió un error inesperado. Por favor intente nuevamente');
    }
  };

  return (
    <div className='w-full h-full flex items-center justify-center'>
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-xl">
      <div className="mb-8">
        <h1 className='text-black mb-4 text-xl w-full text-center'>Digita tu documento de identidad</h1>
        <input
          type="number"
          value={value}
          onChange={handleDocumento}
          placeholder="1000000"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all bg-gray-50"
        />
      </div>

      <div className="space-y-6">
      <h1 className='text-black mb-4 text-xl w-full text-center'>Digita el código de seguridad</h1>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <InputOTP 
            maxLength={6} 
            value={valueOtp} 
            onChange={setValueOtp} 
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-100 text-black" />
              <InputOTPSlot index={1} className="bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-100 text-black" />
              <InputOTPSlot index={2} className="bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-100 text-black" />
            </InputOTPGroup>
            <InputOTPSeparator className="text-gray-300">-</InputOTPSeparator>
            <InputOTPGroup>
              <InputOTPSlot index={3} className="bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-100 text-black" />
              <InputOTPSlot index={4} className="bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-100 text-black" />
              <InputOTPSlot index={5} className="bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-100 text-black" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        <Button 
          onClick={handleSave}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors"
        >
          Ingresar
        </Button>
        

      </div>
    </div>
    </div>
  )
}
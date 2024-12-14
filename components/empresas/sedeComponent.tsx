'use client'

import React, { useState } from 'react'


type SedeComponentProps ={
  data: any;
  cita?:any;
  onTogglePress: (dataontoggle:any) => void 
}

const defaultCita = {
  otp: "xxx-xxx",
  estado: "DESACTIVADA",
  fecha: "No hay citas aún",
  contadorFormularios: 0,
}


function SedeComponent({data,onTogglePress, cita = defaultCita}: SedeComponentProps) {
    const [isChecked, setIsChecked] = useState(cita.estado === "ACTIVA");
    const handleToggle = () => {
      const newValue = !isChecked;
      setIsChecked(newValue);
      onTogglePress({
        checked: newValue,
        ...data
      }
      );
    };

  return (
    <div className={`w-[48%] border rounded-md h-[100px] p-4 flex ${isChecked ? 'shadow-[0_4px_12px_rgba(0,255,0,0.4)]' : 'shadow-[0_4px_12px_rgba(255,165,0,0.4)]'} items-center`} >
        <div className='w-full flex justify-between items-center'>
          <div>
            <h1 className='text-xl font-medium'>{data.nombre}</h1> 
            <h1 className='text-sm text-gray-600 font-bold'>{cita.fecha}</h1>
            {cita.otp === "xxx-xxx" ? null : <h1 className='text-sm text-gray-600 font-bold'>{cita.contadorFormularios} personas han contestado</h1>}
          </div>
          <div className='flex justify-between'>
            <span className="text-gray-500 text-sm mr-3">{cita.otp}</span>
          </div>
          <div 
            className="relative inline-block w-12 h-6 cursor-pointer"
            onClick={handleToggle}
          >
            {/* Fondo del switch */}
            <div 
              className={`absolute w-full h-full rounded-full transition-colors duration-300 ${
                isChecked ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
            {/* Círculo que se mueve */}
            <div 
              className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 top-0.5 ${
                isChecked ? 'translate-x-7' : 'translate-x-0.5'
              }`}
            />
            <input 
              type="checkbox"
              className="hidden"
              checked={isChecked}
              onChange={handleToggle}
            />
          </div>
        </div>
    </div>
  )
}

export default SedeComponent
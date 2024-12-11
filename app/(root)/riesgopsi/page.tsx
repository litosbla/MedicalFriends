"use client"
import React, { useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"

import { useRouter } from 'next/navigation'
export default function Page() {
  const router = useRouter()
  const [value, setValue] = useState('');
  const [valueOtp, setValueOtp] = useState("");
  const [savedValueOtp, setSavedValueOtp] = useState("");

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  const handleComplete = (valueOtp: any) => {
    setValue(value);
  };

  const handleSave = () => {
    setSavedValueOtp(valueOtp);
    if (valueOtp === '432111' && value === '45678912') {
      setSavedValueOtp(valueOtp);
      router.push('/riesgopsi/formulario'); }
      else {alert('Los datos no son correctos')}
    
  };

  return (
    <div className='w-full h-full flex items-center justify-center'>
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-xl">
      <div className="mb-8">
        <h1 className='text-black mb-4 text-xl w-full text-center'>Digita tu documento de identidad</h1>
        <input
          type="number"
          value={value}
          onChange={handleChange}
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
            onComplete={handleComplete}
            
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
          Guardar Código
        </Button>
        
        {savedValueOtp && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-600">
              Código guardado: <span className="font-medium">{savedValueOtp}</span>
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
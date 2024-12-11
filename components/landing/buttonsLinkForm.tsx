"use client"

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button';
export default function ButtonsLinkForm() {
  const router = useRouter()
  return (
    <div className='flex gap-10 mt-10'>
      <Button onClick={() => router.push('/puestotrab')} className='rounded-xl w-[200px] h-[50px] text-lg'>
        Puesto de Trabajo
      </Button>
      <Button onClick={() => router.push('/riesgopsi')} className='rounded-xl w-[200px] h-[50px] text-lg'>
        Riesgo Psicosocial
      </Button>
    </div>
  );
}
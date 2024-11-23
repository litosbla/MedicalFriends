"use client"
import style from './landingcomponents.module.css'
import { useRouter } from 'next/navigation'
export default function ButtonsLinkForm() {
  const router = useRouter()
  return (
    <div className={style.contenedorBotones}>
      <button onClick={() => router.push('/puestotrab')}>
        Puesto de Trabajo
      </button>
      <button onClick={() => router.push('/riesgopsi')}>
        Rieso Psicosocial
      </button>
    </div>
  );
}
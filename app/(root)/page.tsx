import "@aws-amplify/ui-react/styles.css";
import styles from './landing.module.css'
import ButtonsLinkForm from "../../components/landing/buttonsLinkForm";
import Image from 'next/image'
import { Users } from 'lucide-react';
import Link from 'next/link'
export default function App() {

  return (

    <main className={`${styles.main} bg-white`}>
     
        <header className={styles.header}>
            <nav>
                <Link href={"/empresas"} className='text-black items-center text-xl drop-shadow-xl border rounded-xl p-2 pr-4 pl-4 shadow-lg bg-gray-50 flex'>
                <Users className="w-5 h-5 mr-2 text-green-500" />
                  Equipo Medical
                </Link>
            </nav>
        </header>
    
        
    
      <section className={`${styles.sectionTitles} `}>
        <Image src="assets/Logo.svg" alt="logo" width={800} height={200} className="drop-shadow-2xl"/>
        <h1 className="text-green-400 text-xl">Bienestar laboral, éxito empresarial</h1>

        <ButtonsLinkForm/>
       
      </section>
    </main>
  );
}

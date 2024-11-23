import "@aws-amplify/ui-react/styles.css";
import styles from './landing.module.css'
import ButtonsLinkForm from "../../components/landing/buttonsLinkForm";
import Image from 'next/image'

export default function App() {

  return (
    <main className={styles.main}>
      <section className={styles.sectionTitles}>
        <Image src="assets/Logo.svg" alt="logo" width={800} height={200} className={styles.imagensombra} />
        <h1 className={styles.subtitulo}>Bienestar laboral, éxito empresarial</h1>
        <h2 className={styles.subtitulo}>Portal Colaboradores</h2>
        <ButtonsLinkForm/>
      </section>
    </main>
  );
}

import React from 'react'
import styles from './landing.module.css'

import Link from 'next/link'

function layout({ children }: { children: React.ReactNode }) {
  return (
      <div className={styles.homescreen}>
          <header className={styles.header}>
              <nav>
                  <Link href={"/dashboard"}>
                    Equipo de Medical
                  </Link>
              </nav>
          </header>
    
          {children}
      </div>
  )
}

export default layout
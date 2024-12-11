import React from 'react'
import styles from './landing.module.css'
import { Users } from 'lucide-react';
import Link from 'next/link'

function layout({ children }: { children: React.ReactNode }) {
  return (
      <div className={`${styles.homescreen} bg-white`}>
      
    
          {children}
      </div>
  )
}

export default layout
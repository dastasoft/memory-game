import { ReactNode } from 'react'

import Footer from './Footer'
import styles from './Layout.module.css'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.Layout}>
      <main className={styles.Main}>{children}</main>
      <Footer />
    </div>
  )
}

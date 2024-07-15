import React from 'react';
import Quiz from './quiz';
import styles from './page.module.css'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Metadata } from 'next'
 
export const metadata = {
  title: 'TypeScript Quiz',
}

const Page = () => {
  return (
    <div className={styles.main}>
      <ErrorBoundary>
        <Quiz />
      </ErrorBoundary>
      <h5 className={styles.name}>Made by &nbsp; 
        <b className={styles.yellow}>Osaid</b>
      </h5>
    </div>
  )
}

export default Page
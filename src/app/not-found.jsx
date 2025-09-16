"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './notFound.module.css';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    // Inicia contagem regressiva para redirecionamento
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/');
    }
  }, [countdown, router]);

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        
        <div className={styles.errorGraphic}>
          <div className={styles.pot}>
            <div className={styles.lid}></div>
            <div className={styles.steam}></div>
          </div>
        </div>
        
        <h2 className={styles.title}>Ooops! Página não encontrada</h2>
        <p className={styles.redirectMessage}>
          Redirecionando para a página inicial em <span className={styles.countdown}>{countdown}</span> segundos...
        </p>
        
        <p className={styles.description}>
          Parece que esta receita ainda não foi inventada! 
          A página que você está procurando não existe ou foi removida.
        </p>
        
        <div className={styles.suggestions}>
          <p>Você pode tentar:</p>
          <ul>
            <li>Verificar se digitou o endereço corretamente</li>
            <li>Explorar nossas deliciosas receitas na página inicial</li>
            <li>Procurar por uma receita específica usando a pesquisa</li>
          </ul>
        </div>
        
        
        
        <div className={styles.actions}>
          <Link href="/" className={styles.primaryButton}>
            Ir para a Página Inicial
          </Link>
          <Link href="/recipes" className={styles.secondaryButton}>
            Explorar Receitas
          </Link>
        </div>
      </div>
    </div>
  );
}
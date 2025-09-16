"use client";

import Link from 'next/link';
import styles from './footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerAbout}>
            <h3>Receitinhas da Vovó</h3>
            <p>
              Compartilhando sabores e memórias através de receitas caseiras tradicionais 
              que trazem o aconchego e o carinho da cozinha da vovó.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fa fa-facebook-square"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fa fa-youtube-play"></i>
              </a>
              
            </div>
          </div>
          
          <div className={styles.footerLinks}>
            <h4>Links Rápidos</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/recipes">Todas as Receitas</Link></li>
              <li><Link href="/about">Sobre Nós</Link></li>
              <li><Link href="/contact">Contato</Link></li>
              <li><Link href="/privacy-policy">Política de Privacidade</Link></li>
              <li><Link href="/terms">Termos de Uso</Link></li>
            </ul>
          </div>

          <div className={styles.footerCategories}>
            <h4>Categorias</h4>
            <ul>
              <li><Link href="/?category=entradas">Entradas</Link></li>
              <li><Link href="/recipes?category=pratos-principais">Pratos Principais</Link></li>
              <li><Link href="/?category=sobremesas">Sobremesas</Link></li>
              <li><Link href="/?category=bebidas">Bebidas</Link></li>
              <li><Link href="/?category=lanches">Lanches</Link></li>
              <li><Link href="/?category=massas">Massas</Link></li>
            </ul>
          </div>

          
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Receitinhas da Vovó - Todos os direitos reservados</p>
          <p>Feito com <span className={styles.heart}>&hearts;</span> e muito café</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
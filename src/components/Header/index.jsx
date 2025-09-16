"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './header.module.css';
import Image from 'next/image';


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar se o usuário está logado (token no localStorage ou cookie)
    const token = localStorage.getItem('authToken') || '';
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Lógica para logout
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/img/logo.svg"
              alt="Receitinhas da Vovó"
              className={styles.logoImg}
              width={100}
              height={100}
            />
            <h1>Receitinhas da Vovó</h1>
          </Link>
        </div>

        {/* Menu para tela grande */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">Sobre Nós</Link>
            </li>
            <li>
              <Link href="/contact">Contato</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/dashboard">Meu Painel</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className={styles.logoutButton}>
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/auth" className={styles.loginButton}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Botão do menu mobile */}
        <button 
          className={styles.mobileMenuButton} 
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <span className={isMobileMenuOpen ? styles.closeIcon : styles.menuIcon}></span>
        </button>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavLinks}>
              <li>
                <Link href="/" onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li>
                <Link href="/recipes" onClick={toggleMobileMenu}>Receitas</Link>
              </li>
              <li>
                <Link href="/about" onClick={toggleMobileMenu}>Sobre Nós</Link>
              </li>
              <li>
                <Link href="/contact" onClick={toggleMobileMenu}>Contato</Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link href="/dashboard" onClick={toggleMobileMenu}>Meu Painel</Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                      }} 
                      className={styles.logoutButtonMobile}
                    >
                      Sair
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/auth" onClick={toggleMobileMenu} className={styles.loginButtonMobile}>
                    Login / Cadastro
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
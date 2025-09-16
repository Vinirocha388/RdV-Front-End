"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/loginForm";
import RegisterForm from "@/components/auth/registerForm";
import styles from "./auth.module.css";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authTabs}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "login" ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange("login")}
          >
            Login
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "register" ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange("register")}
          >
            Cadastro
          </button>
        </div>

        <div className={styles.authForm}>
          {activeTab === "login" ? (
            <div className={styles.loginContainer}>
              <h2>Bem-vindo novamente!</h2>
              <p className={styles.subtitle}>Entre para acessar suas receitas favoritas</p>
              <LoginForm />
            </div>
          ) : (
            <div className={styles.registerContainer}>
              <h2>Crie sua conta</h2>
              <p className={styles.subtitle}>Junte-se à nossa comunidade de amantes da culinária</p>
              <RegisterForm />
            </div>
          )}
        </div>
      </div>

      <div className={styles.authInfo}>
        <h2>Receitinhas da Vovó</h2>
        <p>
          Acesse sua conta de administrador para gerenciar receitas, categorias e usuários.
        </p>
        <p>
          Com uma conta, você pode:
        </p>
        <ul>
          <li>Salvar suas receitas favoritas</li>
          <li>Compartilhar suas próprias criações culinárias</li>
          <li>Receber recomendações personalizadas</li>
          <li>Interagir com outros entusiastas da culinária</li>
        </ul>
        <div className={styles.authBackButton}>
          <button onClick={() => router.push("/")} className={styles.backToHome}>
            Voltar para a página inicial
          </button>
        </div>
      </div>
    </div>
  );
}
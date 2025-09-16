"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllRecipes } from "./services/recipeService";
import Link from "next/link";
import styles from "./page.module.css";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        console.log("Iniciando requisição para buscar receitas...");
        const response = await getAllRecipes();
        console.log("Resposta recebida:", response);
        
        if (response.success) {
          console.log("Receitas carregadas com sucesso:", response.data);
          setRecipes(response.data);
        } else {
          console.error("Erro na resposta:", response);
          setError(response.message || "Erro ao carregar receitas");
        }
      } catch (err) {
        console.error("Erro crítico ao buscar receitas:", err);
        setError(`Erro: ${err.message || "Falha ao carregar receitas. Por favor, tente novamente mais tarde."}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (id) => {
    router.push(`/recipes/${id}`);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Carregando receitas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Ops! Algo deu errado</h2>
        <p>{error}</p>
        <div style={{ marginTop: '20px', textAlign: 'left', maxWidth: '600px', margin: '0 auto', padding: '15px', backgroundColor: '#f8f8f8', borderRadius: '5px' }}>
          <p><strong>Possíveis soluções:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Verifique se a API está rodando em <code>http://localhost:4000</code></li>
            <li>Certifique-se de que o endpoint <code>/recipes</code> está disponível</li>
            <li>Verifique se há erros CORS na API</li>
            <li>Verifique se o banco de dados está conectado corretamente</li>
          </ul>
        </div>
        <button onClick={() => window.location.reload()} className={styles.retryButton} style={{ marginTop: '20px' }}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className={styles.recipesContainer}>
      <header className={styles.header}>
        <h1>Receitinhas da Vovó</h1>
        <p>Explore nossa coleção de receitas incríveis</p>
      </header>

      <div className={styles.filters}>
        <input 
          type="text" 
          placeholder="Buscar receitas..." 
          className={styles.searchInput} 
        />
        <select className={styles.categoryFilter}>
          <option value="">Todas as categorias</option>
          <option value="doces">Doces</option>
          <option value="salgados">Salgados</option>
          <option value="bebidas">Bebidas</option>
          <option value="vegetarianas">Vegetarianas</option>
        </select>
      </div>

      {recipes.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>Nenhuma receita encontrada</h2>
          <p>Desculpe, não encontramos nenhuma receita disponível no momento.</p>
        </div>
      ) : (
        <div className={styles.recipeGrid}>
          {recipes.map((recipe) => (
            <div 
              key={recipe._id || recipe.id} 
              className={styles.recipeCard}
              onClick={() => handleRecipeClick(recipe._id || recipe.id)}
            >
              {recipe.image ? (
                <div 
                  className={styles.recipeImage} 
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
              ) : (
                <div className={styles.recipePlaceholder}>
                  <span>Sem imagem</span>
                </div>
              )}
              <div className={styles.recipeInfo}>
                <h3>{recipe.name || recipe.title}</h3>
                <p className={styles.recipeDescription}>
                  {recipe.description?.substring(0, 100)}
                  {recipe.description?.length > 100 ? "..." : ""}
                </p>
                <div className={styles.recipeFooter}>
                  <span className={styles.recipeCategory}>
                    {recipe.category || "Geral"}
                  </span>
                  <span className={styles.recipeTime}>
                    {recipe.prepTime || "30 min"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
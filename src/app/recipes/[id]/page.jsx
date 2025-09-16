"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getRecipeById } from "../../services/recipeService";
import styles from "./recipeDetail.module.css";
import React from 'react';

export default function RecipeDetailPage({ params }) {
  const { id } = React.use(params);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await getRecipeById(id);
        
        if (response.success) {
          setRecipe(response.data);
        } else {
          setError(response.message || "Erro ao carregar receita");
        }
      } catch (err) {
        setError("Falha ao carregar detalhes da receita.");
        console.error("Erro ao buscar receita:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const toggleIngredient = (index) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const toggleStep = (index) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  const getDifficultyEmoji = (difficulty) => {
    const diff = (difficulty || "média").toLowerCase();
    if (diff.includes("fácil") || diff.includes("facil")) return "😊 Fácil";
    if (diff.includes("média") || diff.includes("media")) return "🤔 Média";
    if (diff.includes("difícil") || diff.includes("dificil")) return "😤 Difícil";
    return "🤔 Média";
  };

  const getCategoryEmoji = (category) => {
    const cat = (category || "geral").toLowerCase();
    if (cat.includes("sobremesa") || cat.includes("doce")) return "🍰";
    if (cat.includes("salgado")) return "🥘";
    if (cat.includes("bebida")) return "🥤";
    if (cat.includes("vegetarian")) return "🥗";
    if (cat.includes("massa")) return "🍝";
    if (cat.includes("carne")) return "🥩";
    return "🍴";
  };

  if (loading) {
    return (
      <div className={styles.recipePageBackground}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Carregando receita deliciosa...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className={styles.recipePageBackground}>
        <div className={styles.recipeDetailContainer}>
          <div className={styles.errorContainer}>
            <h2>🍳 Ops! Algo deu errado</h2>
            <p>{error || "Não foi possível encontrar esta receita."}</p>
            <div className={styles.errorActions}>
              <button onClick={() => router.push("/recipes")} className={styles.backButton}>
                ← Voltar para receitas
              </button>
              <button onClick={() => window.location.reload()} className={styles.retryButton}>
                🔄 Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ingredients = recipe.ingredientes || [];
  const instructions = recipe.modoPreparo || [];
  const recipeTitle = recipe.titulo || recipe.title;

  return (
    <div className={styles.recipePageBackground}>
      <div className={styles.recipeDetailContainer}>
        <nav className={styles.breadcrumbs}>
          <Link href="/">🏠 Receitas</Link> &gt; <span>{recipeTitle}</span>
        </nav>

      <div className={styles.recipeHeader}>
        <h1>{recipeTitle}</h1>
        <div className={styles.recipeMetadata}>
          <span className={styles.category}>
            {getCategoryEmoji(recipe.categoria)} {recipe.categoria || "Geral"}
          </span>
          <span className={styles.prepTime}>
            ⏱️ {recipe.prepTime || "30 min"}
          </span>
          <span className={styles.difficulty}>
            {getDifficultyEmoji(recipe.difficulty)}
          </span>
        </div>
      </div>

      {recipe.image && (
        <div className={styles.recipeImageContainer}>
          <img 
            src={recipe.image} 
            alt={recipeTitle}
            className={styles.recipeImage} 
          />
        </div>
      )}

      <div className={styles.recipeContent}>
        <section className={styles.recipeDescription}>
          <h2>📝 Descrição</h2>
          <p>{recipe.descricao || "Uma receita deliciosa que vai encantar seu paladar!"}</p>
        </section>

        <section className={styles.ingredients}>
          <h2>🛒 Ingredientes ({ingredients.length} itens)</h2>
          {ingredients.length > 0 ? (
            <ul>
              {ingredients.map((ingredient, index) => (
                <li 
                  key={index}
                  onClick={() => toggleIngredient(index)}
                  style={{
                    opacity: checkedIngredients.has(index) ? 0.6 : 1,
                    textDecoration: checkedIngredients.has(index) ? 'line-through' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          ) : (
            <p>📋 Nenhum ingrediente listado.</p>
          )}
          {ingredients.length > 0 && (
            <p style={{ 
              textAlign: 'center', 
              marginTop: '20px', 
              color: '#EFA261',
              fontStyle: 'italic',
              fontSize: '0.9rem'
            }}>
              💡 Clique nos ingredientes para marcá-los como separados!
            </p>
          )}
        </section>

        <section className={styles.instructions}>
          <h2>👨‍🍳 Modo de Preparo</h2>
          {Array.isArray(instructions) && instructions.length > 0 ? (
            <ol>
              {instructions.map((step, index) => (
                <li 
                  key={index}
                  onClick={() => toggleStep(index)}
                  style={{
                    opacity: completedSteps.has(index) ? 0.7 : 1,
                    cursor: 'pointer',
                    backgroundColor: completedSteps.has(index) 
                      ? 'rgba(239, 162, 97, 0.2)' 
                      : 'rgba(239, 162, 97, 0.05)'
                  }}
                >
                  {step}
                </li>
              ))}
            </ol>
          ) : typeof instructions === 'string' ? (
            <div style={{ 
              padding: '20px', 
              background: 'rgba(239, 162, 97, 0.05)', 
              borderRadius: '15px',
              lineHeight: '1.8'
            }}>
              <p>{instructions}</p>
            </div>
          ) : (
            <p>📝 Nenhuma instrução disponível.</p>
          )}
          {Array.isArray(instructions) && instructions.length > 0 && (
            <p style={{ 
              textAlign: 'center', 
              marginTop: '20px', 
              color: '#EFA261',
              fontStyle: 'italic',
              fontSize: '0.9rem'
            }}>
              ✅ Clique nos passos para marcá-los como concluídos!
            </p>
          )}
        </section>

        {(recipe.tips || recipe.dicas) && (
          <section className={styles.tips}>
            <h2>💡 Dicas do Chef</h2>
            <p>{recipe.tips || recipe.dicas}</p>
          </section>
        )}

        {(recipe.servings || recipe.porcoes || recipe.rendimento) && (
          <section style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            textAlign: 'center'
          }}>
            <h2>👥 Rendimento</h2>
            <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#EFA261' }}>
              🍽️ {recipe.servings || recipe.porcoes || recipe.rendimento}
            </p>
          </section>
        )}
      </div>

      <div className={styles.actions}>
        <button onClick={() => router.push("/")} className={styles.backButton}>
          ← Voltar para receitas
        </button>
        <button 
          onClick={() => window.print()} 
          className={styles.retryButton}
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
        >
          🖨️ Imprimir receita
        </button>
      </div>
      </div>
    </div>
  );
}
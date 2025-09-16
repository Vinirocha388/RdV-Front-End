"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecipeById, updateRecipe } from "../../../../services/recipeService";
import styles from "../../recipeForm.module.css";
import React from 'react';

export default function EditRecipePage({ params }) {
  // Usar React.use() para desempacotar params que agora é uma Promise
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "geral",
    prepTime: "",
    difficulty: "media",
    ingredients: [""],
    instructions: [""],
    image: "",
    tips: ""
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        
        const response = await getRecipeById(id);
        
        if (response.success) {
          const recipe = response.data;
          
          // Formatar os dados para o formulário
          setFormData({
            name: recipe.name || recipe.title || "",
            description: recipe.description || "",
            category: recipe.category || "geral",
            prepTime: recipe.prepTime || "",
            difficulty: recipe.difficulty || "media",
            ingredients: recipe.ingredients && recipe.ingredients.length > 0 
              ? recipe.ingredients 
              : [""],
            instructions: recipe.instructions && recipe.instructions.length > 0 
              ? (Array.isArray(recipe.instructions) 
                ? recipe.instructions 
                : [recipe.instructions]) 
              : [""],
            image: recipe.image || "",
            tips: recipe.tips || ""
          });
        } else {
          setError(response.message || "Erro ao carregar receita");
        }
      } catch (err) {
        setError("Falha ao carregar receita: " + (err.message || "Erro desconhecido"));
        console.error("Erro ao buscar receita:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""]
    });
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = [...formData.ingredients];
      updatedIngredients.splice(index, 1);
      setFormData({
        ...formData,
        ingredients: updatedIngredients
      });
    }
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData({
      ...formData,
      instructions: updatedInstructions
    });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ""]
    });
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const updatedInstructions = [...formData.instructions];
      updatedInstructions.splice(index, 1);
      setFormData({
        ...formData,
        instructions: updatedInstructions
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name.trim()) {
      setError("Nome da receita é obrigatório");
      return;
    }

    // Remover ingredientes e instruções vazios
    const filteredIngredients = formData.ingredients.filter(i => i.trim());
    const filteredInstructions = formData.instructions.filter(i => i.trim());
    
    if (filteredIngredients.length === 0) {
      setError("Adicione pelo menos um ingrediente");
      return;
    }
    
    if (filteredInstructions.length === 0) {
      setError("Adicione pelo menos uma instrução");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const recipeData = {
        ...formData,
        ingredients: filteredIngredients,
        instructions: filteredInstructions
      };

      const response = await updateRecipe(id, recipeData);
      
      if (response.success) {
        // Redirecionar para a página de gerenciamento de receitas
        router.push("/dashboard/recipes");
      } else {
        setError(response.message || "Erro ao atualizar receita");
      }
    } catch (err) {
      setError("Falha ao atualizar receita: " + (err.message || "Erro desconhecido"));
      console.error("Erro ao atualizar receita:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Carregando dados da receita...</p>
      </div>
    );
  }

  if (error && !formData.name) {
    return (
      <div className={styles.errorContainer}>
        <h2>Erro ao carregar receita</h2>
        <p>{error}</p>
        <button 
          onClick={() => router.push("/dashboard/recipes")}
          className={styles.backButton}
        >
          Voltar para gerenciamento
        </button>
      </div>
    );
  }

  return (
    <div className={styles.recipeFormContainer}>
      <header className={styles.header}>
        <h1>Editar Receita</h1>
        <p>Atualize as informações da sua receita</p>
      </header>

      {error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.recipeForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome da Receita *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Bolo de Chocolate"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Uma breve descrição da receita..."
            rows="3"
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="category">Categoria</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="geral">Geral</option>
              <option value="doces">Doces</option>
              <option value="salgados">Salgados</option>
              <option value="bebidas">Bebidas</option>
              <option value="vegetarianas">Vegetarianas</option>
              <option value="carnes">Carnes</option>
              <option value="massas">Massas</option>
              <option value="sopas">Sopas</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="prepTime">Tempo de Preparo</label>
            <input
              type="text"
              id="prepTime"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              placeholder="Ex: 30 min"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="difficulty">Dificuldade</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="facil">Fácil</option>
              <option value="media">Média</option>
              <option value="dificil">Difícil</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">URL da Imagem</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://exemplo.com/imagem-da-receita.jpg"
          />
          <small className={styles.helpText}>Coloque um link para uma imagem da sua receita</small>
        </div>

        <div className={styles.formGroup}>
          <label>Ingredientes *</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredientRow}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingrediente ${index + 1}`}
              />
              <button 
                type="button" 
                onClick={() => removeIngredient(index)}
                className={styles.removeButton}
                disabled={formData.ingredients.length === 1}
              >
                Remover
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={addIngredient}
            className={styles.addButton}
          >
            + Adicionar Ingrediente
          </button>
        </div>

        <div className={styles.formGroup}>
          <label>Modo de Preparo *</label>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className={styles.instructionRow}>
              <div className={styles.instructionNumber}>{index + 1}</div>
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                placeholder={`Passo ${index + 1}`}
                rows="2"
              />
              <button 
                type="button" 
                onClick={() => removeInstruction(index)}
                className={styles.removeButton}
                disabled={formData.instructions.length === 1}
              >
                Remover
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={addInstruction}
            className={styles.addButton}
          >
            + Adicionar Passo
          </button>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tips">Dicas do Chef</label>
          <textarea
            id="tips"
            name="tips"
            value={formData.tips}
            onChange={handleChange}
            placeholder="Alguma dica especial para esta receita..."
            rows="3"
          />
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={() => router.push("/dashboard/recipes")}
            className={styles.cancelButton}
            disabled={saving}
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className={styles.submitButton}
            disabled={saving}
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
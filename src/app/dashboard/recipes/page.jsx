"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  getAllRecipes, 
  deleteRecipe 
} from "../../../services/recipeService";
import { useAuth } from "../../../context/AuthContext";
import styles from "./recipes.module.css";

export default function RecipeManagement() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await getAllRecipes();
      
      if (response.success) {
        setRecipes(response.data);
      } else {
        setError(response.message || "Erro ao carregar receitas");
      }
    } catch (err) {
      setError("Falha ao carregar receitas. Por favor, tente novamente.");
      console.error("Erro ao buscar receitas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecipe = () => {
    router.push("/dashboard/recipes/new");
  };

  const handleEditRecipe = (id) => {
    router.push(`/dashboard/recipes/edit/${id}`);
  };

  const confirmDelete = (id) => {
    setDeleteConfirm(id);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleDeleteRecipe = async (id) => {
    try {
      setLoading(true);
      const response = await deleteRecipe(id);
      
      if (response.success) {
        setRecipes(recipes.filter(recipe => (recipe._id || recipe.id) !== id));
        setDeleteConfirm(null);
      } else {
        setError(response.message || "Erro ao excluir receita");
      }
    } catch (err) {
      setError("Falha ao excluir receita.");
      console.error("Erro ao excluir receita:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecipe = (id) => {
    router.push(`/recipes/${id}`);
  };

  const filteredRecipes = recipes.filter(recipe => {
    const recipeName = (recipe.titulo || recipe.name || recipe.title || "").toLowerCase();
    const recipeDesc = (recipe.descricao || recipe.description || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    
    return recipeName.includes(search) || recipeDesc.includes(search);
  });

  if (loading && recipes.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Carregando receitas...</p>
      </div>
    );
  }

  return (
    <div className={styles.recipeManagementContainer}>
      <header className={styles.header}>
        <h1>Gerenciamento de Receitas</h1>
        <p>Crie, edite e exclua receitas</p>
      </header>

      <div className={styles.actionBar}>
        <input
          type="text"
          placeholder="Buscar receitas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleAddRecipe} className={styles.addButton}>
          Adicionar Nova Receita
        </button>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
          <button onClick={fetchRecipes} className={styles.retryButton}>
            Tentar novamente
          </button>
        </div>
      )}

      {filteredRecipes.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>Nenhuma receita encontrada</h2>
          <p>
            {searchTerm 
              ? "Nenhuma receita corresponde à sua busca." 
              : "Você ainda não criou nenhuma receita."}
          </p>
          {!searchTerm && (
            <button onClick={handleAddRecipe} className={styles.addButtonEmpty}>
              Criar primeira receita
            </button>
          )}
        </div>
      ) : (
        <div className={styles.recipeTable}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Data de Criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecipes.map((recipe) => (
                <tr key={recipe._id || recipe.id}>
                  <td>{recipe.titulo || recipe.name || recipe.title}</td>
                  <td>{recipe.categoria || recipe.category || "Geral"}</td>
                  <td>
                    {recipe.createdAt 
                      ? new Date(recipe.createdAt).toLocaleDateString("pt-BR") 
                      : "N/A"}
                  </td>
                  <td className={styles.actions}>
                    <button 
                      onClick={() => handleViewRecipe(recipe._id || recipe.id)} 
                      className={styles.viewButton}
                      title="Visualizar receita"
                    >
                      Ver
                    </button>
                    <button 
                      onClick={() => handleEditRecipe(recipe._id || recipe.id)} 
                      className={styles.editButton}
                      title="Editar receita"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => confirmDelete(recipe._id || recipe.id)} 
                      className={styles.deleteButton}
                      title="Excluir receita"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteConfirm && (
        <div className={styles.deleteModal}>
          <div className={styles.deleteModalContent}>
            <h2>Confirmar exclusão</h2>
            <p>Tem certeza que deseja excluir esta receita? Esta ação não pode ser desfeita.</p>
            <div className={styles.deleteModalActions}>
              <button 
                onClick={cancelDelete} 
                className={styles.cancelButton}
              >
                Cancelar
              </button>
              <button 
                onClick={() => handleDeleteRecipe(deleteConfirm)} 
                className={styles.confirmDeleteButton}
              >
                Excluir receita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
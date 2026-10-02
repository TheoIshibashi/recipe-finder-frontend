import React, { useState, useEffect } from "react";
import type{ Recipe, RecipeSummary, } from "./types/recipe";
import {RecipeCard} from "./components/RecipeCard";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;


function App(){
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [hasNameSearched, setHasNameSearched] = useState<boolean>(false);

  const[ingredientTerm, setIngredientTerm] = useState<string>("");
  const[ingredientResults, setIngredientResults] = useState<RecipeSummary[]>([]);
  const[hasIngredientSearched, setHasIngredientSearched] = useState<boolean>(false);

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchMode, setSearchMode] = useState<"name" | "ingredient">("name");

  const [detailsLoading, setDetailsLoading] = useState<boolean>(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/recipes/random`)
    .then((response) => {
      if (!response.ok){
        throw new Error("Resposta inválida")
      }

      return response.json();
    })
    .then((data) =>{
      setRecipe(data)
    })
    .catch(() =>{
      setError("Ocorreu um erro inesperado.")
    })
    .finally(() =>{
      setLoading(false);
    })
  }, []);


  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanTerm = searchTerm.trim();
    if (!cleanTerm){
      setError("Digite um nome para buscar.");
      return;
    }

    setHasNameSearched(true);

    const safeTerm = encodeURIComponent(cleanTerm);
    const url = `${API_URL}/recipes/search?name=${safeTerm}`

    setLoading(true);
    setError(null);

    fetch(url)
    .then((response) => {
      if (!response.ok){
        throw new Error("Resposta inválida")
      }

      return response.json();
    })
    .then((data) =>{
      setSearchResults(data)
    })
    .catch(() =>{
      setError("Ocorreu um erro inesperado.")
    })
    .finally(() =>{
      setLoading(false);
    });
  };

  const handleIngredientSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanTerm = ingredientTerm.trim();
    if (!cleanTerm){
      setError("Digite um ingrediente para buscar.");
      return;
    }

    setHasIngredientSearched(true);

    const safeTerm = encodeURIComponent(cleanTerm);
    const url = `${API_URL}/recipes/by-ingredient?ingredient=${safeTerm}`

    setLoading(true);
    setError(null);

    fetch(url)
    .then((response) => {
      if (!response.ok){
        throw new Error("Resposta inválida")
      }

      return response.json();
    })
    .then((data) =>{
      setIngredientResults(data)
    })
    .catch(() =>{
      setError("Ocorreu um erro inesperado.")
    })
    .finally(() =>{
      setLoading(false);
    });
  };

  const handleRecipeSelect = (recipeId: string) => {
    const url = `${API_URL}/recipes/${recipeId}`;

    setDetailsLoading(true);
    setDetailsError(null);

    setSelectedRecipe(null);
    fetch(url)
    .then((response) => {
      if (!response.ok){
        throw new Error("Resposta inválida")
      }
      
      return response.json();
    })
    .then((data) => {
      setSelectedRecipe(data)
    })
    .catch(() =>{
      setDetailsError("Ocorreu um erro inesperado.")
    })
    .finally(() =>{
      setDetailsLoading(false);
    });
  }


  return(
    <>
      <header className="app-header">
        <div className="app-header-content">
          <div className="app-brand">
            <div className="app-brand-icon">🍳</div>
            <h1>Recipe Finder</h1>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">

            <p className="hero-eyebrow">Descubra receitas incríveis</p>

            <h2>
              O que vamos <span>cozinhar</span> hoje?
            </h2>

            <p className="hero-description">
              Busque por nome ou ingrediente e descubra sua próxima receita favorita.
            </p>

            <section id="search">
              <div className="search-mode">
                <button
                  type="button"
                  className={searchMode === "name" ? "active" : ""}
                  onClick={() => setSearchMode("name")}
                >
                  Por nome
                </button>

                <button
                  type="button"
                   className={searchMode === "ingredient" ? "active" : ""}
                  onClick={() => setSearchMode("ingredient")}
                >
                  Por Ingrediente
                </button>
              </div>

              {searchMode === "name" && (
                <>
                  <form onSubmit={handleSearch}>
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar por nome"
                    />

                    <button type="submit">Buscar</button>
                  </form>
                
                  {hasNameSearched && searchResults.length === 0 && (
                    <p>Nenhuma receita encontrada.</p>
                  )}
                </>
               )} 
              

              {searchMode === "ingredient" && (
                <>
                  <form onSubmit={handleIngredientSearch}>
                    <input
                      value={ingredientTerm}
                      onChange={(e) => setIngredientTerm(e.target.value)}
                      placeholder="Buscar por ingrediente"
                    />

                    <button type="submit">Buscar</button>
                  </form>

                  {hasIngredientSearched && ingredientResults.length === 0 && (
                    <p>Nenhuma receita encontrada para esse ingrediente.</p>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </section>

      <main>
        {loading && (
          <div className="status-message loading-message">
            <p>Carregando...</p>
          </div>
        )}

        {error && (
          <div className="status-message error-message">
            <p>{error}</p>
          </div>
        )}

        {detailsLoading && (
          <div className="status-message loading-message">
            <p className="loading-text">
              <span className="loading-spinner"></span>
              Carregando detalhes da receita...
            </p>
          </div>
        )}
        {detailsError && (
          <div className="status-message error-message">
            <p>{detailsError}</p>
          </div>
        )}
        {selectedRecipe && (
          <section id="recipe-detail">
            <h2>Detalhes da receita</h2>
            
            <div className="recipe-detail-top">
              <img 
                src={selectedRecipe.thumbnail} 
                alt={selectedRecipe.name}
              />
              <div>
                <h3>{selectedRecipe.name}</h3>
                <p>Categoria: {selectedRecipe.category}</p>
                <p>Área: {selectedRecipe.area}</p>

                {selectedRecipe.tags.length > 0 && (
                  <p>Tags: {selectedRecipe.tags.join(", ")}</p>
                )}

                <h3>Ingredientes:</h3>

                <ul>  
                  {selectedRecipe.ingredients.map((ingredient) => (
                    <li key={ingredient.name}>
                      {ingredient.name} {ingredient.measure}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
                
            <h3>Modo de preparo</h3>
            <p>{selectedRecipe.instructions}</p>

              {selectedRecipe.youtube && (
                <a
                  href={selectedRecipe.youtube}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver vídeo no Youtube.
                </a>
              )}
          </section>  
        )}
        
        {hasNameSearched && (
          <section id="recipe-results">
            <div className="results-header">
              <h2>Resultados por nome</h2>
              <p>{searchResults.length} receitas encontradas</p>
            </div>
          
          <div className="recipe-grid">
              {searchResults.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe}
                  onSelect={handleRecipeSelect}
                />
              ))}
          </div>
          
          </section>
        )}
        
        {hasIngredientSearched && (
        <section id="ingredient-results">
           <div className="results-header">
              <h2>Resultados por ingrediente</h2>
              <p>{ingredientResults.length} receitas encontradas</p>
            </div>
          
          <div className="recipe-grid">
            {ingredientResults.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe}
                onSelect={handleRecipeSelect}
              />
          ))}
          </div>
          
          </section> 
        )}
        
        {recipe && (
          <section 
            id="random-recipe" 
            aria-labelledby="random-recipe-title"
          >
            
            <img src={recipe.thumbnail} alt={recipe.name}/>

            <div className="random-recipe-content">
              <h2 id="random-recipe-title">Sugestão aleatória</h2>
              <h3>{recipe.name}</h3>
              <p>{recipe.category} • {recipe.area}</p>
              <button type="button" onClick={() => handleRecipeSelect(recipe.id)}>
                Ver Detalhes
              </button>
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export default App
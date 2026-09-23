import React, { useState, useEffect } from "react";
import type{ Recipe, RecipeSummary, } from "./types/recipe";
import {RecipeCard} from "./components/RecipeCard";
import "./App.css";


function App(){
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [hasNameSearched, setHasNameSearched] = useState<boolean>(false)

  const[ingredientTerm, setIngredientTerm] = useState<string>("");
  const[ingredientResults, setIngredientResults] = useState<RecipeSummary[]>([]);
  const[hasIngredientSearched, setHasIngredientSearched] = useState<boolean>(false)

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:8000/recipes/random")
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
    const url = `http://localhost:8000/recipes/search?name=${safeTerm}`

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
    const url = `http://localhost:8000/recipes/by-ingredient?ingredient=${safeTerm}`

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
    const url = `http://localhost:8000/recipes/${recipeId}`;

    setLoading(true);
    setError(null);

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
      setError("Ocorreu um erro inesperado.")
    })
    .finally(() =>{
      setLoading(false);
    });
  }

  return(
    <main>
      <h1>Recipe Finder</h1>
      <section id="search">
        <h2>Buscar receitas</h2>

        <h3>Por nome</h3>
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

        <h3>Por ingrediente</h3>
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
      </section>
      
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}


      {selectedRecipe && (
        <section id="recipe-detail">
          <h2>Detalhes da receita</h2>
            <div>
              <h3>{selectedRecipe.name}</h3>
              <p>Categoria: {selectedRecipe.category}</p>
              <p>Área: {selectedRecipe.area}</p>
              {selectedRecipe.tags.length > 0 && (
                <p>Tags: {selectedRecipe.tags.join(", ")}</p>
              )}
              

              <img 
                src={selectedRecipe.thumbnail} 
                alt={selectedRecipe.name}
              />

              <h3>Ingredientes:</h3>

              <ul>
                {selectedRecipe.ingredients.map((ingredient) => (
                  <li key={ingredient.name}>
                    {ingredient.name} {ingredient.measure}
                  </li>
                ))}
              </ul>

              <h3>Modo de preparo</h3>
              <p>{selectedRecipe.instructions}</p>

              {selectedRecipe.youtube && (
                <a
                  href={selectedRecipe.youtube}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver vídeo no youtube.
                </a>
              )}
            </div>
        </section>  
      )}
      
      
      {hasNameSearched && (
        <section id="recipe-results">
        <h2>Resultados por nome</h2>

        {searchResults.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe}
            onSelect={handleRecipeSelect}
          />
          ))}
        </section>
      )}
      
      {hasIngredientSearched && (
       <section id="ingredient-results">
        <h2>Resultados por ingrediente</h2>
        {ingredientResults.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe}
            onSelect={handleRecipeSelect}
          />
        ))}
        </section> 
      )}
      
      {recipe && (
        <section id="random-recipe">
          <h2>Sugestão aleatória</h2>
          <h3>{recipe.name}</h3>
          <p>{recipe.category} {recipe.area}</p>
          <img src={recipe.thumbnail} alt={recipe.name}/>
        </section>
      )}
    </main>
  )
}

export default App
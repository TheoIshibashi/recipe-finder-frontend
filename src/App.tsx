import React, { useState, useEffect } from "react";
import type{ Recipe, RecipeSummary, } from "./types/recipe";
import {RecipeCard} from "./components/RecipeCard";

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
      <form onSubmit={handleSearch}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {hasNameSearched && searchResults.length === 0 && (
        <p>Nenhuma receita encontrada.</p>
      )}
      
      <form onSubmit={handleIngredientSearch}>
        <input
        value={ingredientTerm}
        onChange={(e) => setIngredientTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {hasIngredientSearched && ingredientResults.length === 0 && (
        <p>Nenhuma receita encontrada para esse ingrediente.</p>
      )}

      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}

      {selectedRecipe && (
        <section>
          <h2>Nome da Receita: {selectedRecipe.name}</h2>
          <p>Categoria: {selectedRecipe.category}</p>
          <p>Area: {selectedRecipe.area}</p>
          <img 
            src={selectedRecipe.thumbnail} 
            alt={selectedRecipe.name}
          />
        </section>
      )}

      <section>
        {searchResults.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe}
            onSelect={handleRecipeSelect}
          />
        ))}
      </section>
      
      <section>
        {ingredientResults.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe}
            onSelect={handleRecipeSelect}
          />
        ))}
      </section>
      
      {recipe && (
        <section>
          <h2>Receita atual: {recipe.name}</h2>
          <p>{recipe.category} {recipe.area}</p>
          <img src={recipe.thumbnail} alt={recipe.name}/>
        </section>
      )}
    </main>
  )
}

export default App
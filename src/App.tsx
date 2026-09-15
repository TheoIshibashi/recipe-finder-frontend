import React, { useState, useEffect } from "react";
import type { Recipe } from "./types/recipe";

function App(){
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);

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
      setError("ocorreu um erro inesperado.")
    })
    .finally(() =>{
      setLoading(false);
    })
  }, []);


  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanTerm = searchTerm.trim();
    if (!cleanTerm) return;

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
      setError("ocorreu um erro inesperado.")
    })
    .finally(() =>{
      setLoading(false);
    });
  };

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
      
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}

      <section>
        {searchResults.map((recipe) => (
          <article key={recipe.id}>
            <h3>{recipe.name}</h3>
            <img
              src={recipe.thumbnail}
              alt={recipe.name}
            />

          </article>
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
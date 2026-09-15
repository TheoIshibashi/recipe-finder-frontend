import { useState, useEffect } from "react";
import type { Recipe } from "./types/recipe";

function App(){
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:8000/recipes/random")
    .then((response) => {
      if (!response.ok){
        throw new Error("Resposta invalida")
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

  return(
    <main>
      <h1>Recipe Finder</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
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
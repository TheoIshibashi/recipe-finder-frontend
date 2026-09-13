import { useState, useEffect } from "react";
import type { Recipe } from "./types/recipe";

function App(){
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() =>{
    fetch("http://localhost:8000/recipes/random")
      .then((response) => response.json())
      .then((data) =>{
        setRecipe(data)
      });

  }, []);

  return(
    <main>
      <h1>Recipe Finder</h1>
      {recipe && <p>Receita atual: {recipe.name}</p>}
    </main>
  )
}

export default App
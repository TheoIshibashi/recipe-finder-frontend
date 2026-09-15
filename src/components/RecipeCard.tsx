import type { Recipe } from "../types/recipe";

interface RecipeCardProps{
    recipe: Recipe
}

export function RecipeCard({recipe}: RecipeCardProps){
    return(
        <article>
            <h3>Nome da Receita: {recipe.name}</h3>
            <img 
            src={recipe.thumbnail}
            alt={recipe.name}
            />
        </article>
    )
}
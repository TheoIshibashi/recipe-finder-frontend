import type { RecipeSummary } from "../types/recipe";

interface RecipeCardProps{
    recipe: RecipeSummary
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
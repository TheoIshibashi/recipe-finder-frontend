import type { RecipeSummary } from "../types/recipe";

interface RecipeCardProps{
    recipe: RecipeSummary;
    onSelect: (recipeId: string) => void;
}

export function RecipeCard({recipe, onSelect}: RecipeCardProps){
    return (
        <article>
            <h3>Nome da Receita: {recipe.name}</h3>

            <img 
                src={recipe.thumbnail}
                alt={recipe.name}
            />

            <button
                type="button"
                onClick={() => {
                    onSelect(recipe.id);
                }}
            >
                Ver Detalhes
            </button>
        </article>
    );
}
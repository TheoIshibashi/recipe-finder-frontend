import type { RecipeSummary } from "../types/recipe";
import { RecipeCard } from "./RecipeCard";

interface RecipeResultsProps {
    title: string;
    sectionId: string;
    recipes: RecipeSummary[];
    onSelect: (recipeId: string) => void;
}

export function RecipeResults({
    title,
    sectionId,
    recipes,
    onSelect,
}: RecipeResultsProps){
    return(
        <section id={sectionId}>
            <div className="results-header">
                <h2>{title}</h2>
                <p>{recipes.length} receitas encontradas</p>
            </div>
                    
            <div className="recipe-grid">
                {recipes.map((recipe) => (
                    <RecipeCard 
                        key={recipe.id} 
                        recipe={recipe}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </section>
    )}
import { render, screen } from "@testing-library/react";
import { it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { RecipeCard } from "./RecipeCard"

const recipe = {
    id: "123",
    name: "Test Recipe",
    thumbnail: "https://example.com/image.jpg",
};

it("renders recipe information", () => {
    render (
        <RecipeCard
            recipe={recipe}
            onSelect={() => {}}
        />
    );

    expect(
        screen.getByText(`Nome da Receita: ${recipe.name}`)
    ).toBeInTheDocument();

    expect(
        screen.getByRole("img", {name: recipe.name})
    ).toBeInTheDocument();

    expect(
        screen.getByRole("button", {name: "Ver Detalhes"})
    ).toBeInTheDocument();
});



it("calls onSelect with recipe id when button clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    
    render (
        <RecipeCard 
            recipe={recipe} 
            onSelect={onSelect} 
        />       
    );

    const button = screen.getByRole("button", {
        name: "Ver Detalhes"
    });

    await user.click(button);

    expect(onSelect).toHaveBeenCalledWith(recipe.id);
});
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import {beforeEach, expect, it, vi} from "vitest"
import App from "./App"
import { jsx } from "react/jsx-runtime";
import { useReducer } from "react";
import { input } from "@testing-library/user-event/dist/cjs/event/input.js";

const mockRecipe = {
  id: "123",
  name: "Test Recipe",
  category: "Test Category",
  area: "Test Area",
  instructions: "Test instructions",
  thumbnail: "https://example.com/image.jpg",
  youtube: "",
  tags: [],
  ingredients: [
    {
      name: "Ingredient 1",
      measure: "1 cup",
    },
  ],
};

const searchRecipe = {
  id: "456",
  name: "Chicken Test",
  category: "Chicken",
  area: "American",
  instructions: "Test instructions",
  thumbnail: "https://example.com/chicken.jpg",
  youtube: "",
  tags: [],
  ingredients: [],
};

const ingredientRecipe = {
id: "789",
  name: "Chicken Salad",
  thumbnail: "https://example.com/chicken-salad.jpg",
};


beforeEach(() => {
  vi.restoreAllMocks();
});
it("loads and displays a random recipe", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: async () => mockRecipe,
  } as Response);

  render(<App />);

  expect(
    await screen.findByText(mockRecipe.name)
  ).toBeInTheDocument();
});

it("searches recipes by name", async () => {
  const fetchMock = vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecipe,
    }as Response).mockResolvedValueOnce({
        ok: true,
        json: async () => [searchRecipe],
    } as Response);

  const user = userEvent.setup();

  render(<App />);

    const input = screen.getByPlaceholderText('Buscar por nome')
    const button = screen.getByRole("button", {name: "Buscar"})

    await user.type(input, "Chicken");
    await user.click(button);

    expect(
        await screen.findByText(`Nome da Receita: ${searchRecipe.name}`)
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenNthCalledWith(
        2, 
        "http://localhost:8000/recipes/search?name=Chicken"
    );
});

it("searches recipes by ingredient", async () => {
  const fetchMock = vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecipe,
    }as Response).mockResolvedValueOnce({
        ok: true,
        json: async () => [ingredientRecipe],
    } as Response);

  const user = userEvent.setup();

  render(<App />);

    const ingredientModeButton = screen.getByRole("button", {
        name: "Por Ingrediente",
    });

    await user.click(ingredientModeButton);
    const input = screen.getByPlaceholderText('Buscar por ingrediente')
    const button = screen.getByRole("button", {name: "Buscar"})

    await user.type(input, "Chicken");
    await user.click(button);

    expect(
        await screen.findByText(`Nome da Receita: ${ingredientRecipe.name}`)
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenNthCalledWith(
        2, 
        "http://localhost:8000/recipes/by-ingredient?ingredient=Chicken"
    );
});
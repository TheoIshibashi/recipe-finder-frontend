import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import {beforeEach, expect, it, vi} from "vitest"
import App from "./App"

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

const selectedRecipe = {
  id: "3",
  name: "Selected Recipe",
  category: "Test Category",
  area: "Test Area",
  instructions: "Selected recipe instructions",
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
    const searchButton = screen.getByRole("button", {name: "Buscar"})

    await user.type(input, "Chicken");
    await user.click(searchButton);

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

it("shows recipe details when selecting a recipe", async () => {
  const fetchMock = vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
      ok: true,
      json: async() => mockRecipe,
    } as Response)
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [searchRecipe],
    }as Response)
    .mockResolvedValueOnce({
      ok: true,
      json: async () => selectedRecipe,
    }as Response);

    const user = userEvent.setup();

    render(<App />)

    const input = screen.getByPlaceholderText('Buscar por nome')
    const searchButton = screen.getByRole("button", {name: "Buscar"})

    await user.type(input, "Chicken");
    await user.click(searchButton);

    const detailsButton = await screen.findByRole("button", {
      name: "Ver Detalhes",
    });

    await user.click(detailsButton);

    expect(
      await screen.findByRole("heading", {
        name: selectedRecipe.name,
      })
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      `http://localhost:8000/recipes/${searchRecipe.id}`
    );
});

it("shows a message when no recipe are found", async () => {
  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecipe,
    }as Response).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
    } as Response);

  const user = userEvent.setup();

  render(<App />);

    const input = screen.getByPlaceholderText('Buscar por nome')
    const searchButton = screen.getByRole("button", {name: "Buscar"})

    await user.type(input, "Chicken");
    await user.click(searchButton);

    expect(
      await screen.findByText("Nenhuma receita encontrada.")
    ).toBeInTheDocument();
});

it("shows an error when searching with an empty name", async () => {
  const fetchMock = vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecipe,
    } as Response);

  const user = userEvent.setup();

  render(<App />)

  const searchButton = screen.getByRole("button", {name: "Buscar"})
  await user.click(searchButton)

  expect(
    await screen.findByText("Digite um nome para buscar.")
  ).toBeInTheDocument();
  expect(fetchMock).toHaveBeenCalledTimes(
    1,
  )
});

it("shows an error when the name search request fails", async () => {
  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecipe,
    } as Response).mockResolvedValueOnce({
      ok: false,
    }as Response);

    const user = userEvent.setup();

    render(<App />)

    const input = screen.getByPlaceholderText('Buscar por nome');
    const searchButton = screen.getByRole("button", {name: "Buscar"});

    await user.type(input, "Chicken");
    await user.click(searchButton);

    expect(
      await screen.findByText("Ocorreu um erro inesperado.")
    ).toBeInTheDocument();
});

it("shows an error when loading recipe details fails", async () => {
  const fetchMock = vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
      ok: true,
      json: async() => mockRecipe,
    } as Response)
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [searchRecipe],
    }as Response)
    .mockResolvedValueOnce({
      ok: false,
    }as Response);

    const user = userEvent.setup();

    render(<App />)

    const input = screen.getByPlaceholderText('Buscar por nome')
    const searchButton = screen.getByRole("button", {name: "Buscar"})

    await user.type(input, "Chicken");
    await user.click(searchButton);

    const detailsButton = await screen.findByRole("button", {
      name: "Ver Detalhes",
    });

    await user.click(detailsButton);

    expect(
      await screen.findByText("Ocorreu um erro inesperado.")
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      `http://localhost:8000/recipes/${searchRecipe.id}`
    );
});

it("shows a message when no recipes are found by ingredient", async () => {
  const fetchMock = vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecipe,
    }as Response).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
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
        await screen.findByText("Nenhuma receita encontrada para esse ingrediente.")
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenNthCalledWith(
        2, 
        "http://localhost:8000/recipes/by-ingredient?ingredient=Chicken"
    );
});

it("shows an error when searching with an empty ingredient", async () => {
  const fetchMock = vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecipe,
    }as Response);

  const user = userEvent.setup();

  render(<App />);

    const ingredientModeButton = screen.getByRole("button", {
        name: "Por Ingrediente",
    });

    await user.click(ingredientModeButton);
    const button = screen.getByRole("button", {name: "Buscar"})

    await user.click(button);

    expect(
        await screen.findByText("Digite um ingrediente para buscar.")
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(
        1,
    );
});

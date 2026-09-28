import {render, screen} from "@testing-library/react"
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
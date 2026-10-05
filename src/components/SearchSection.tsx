import type React from "react";

interface SearchSectionProps {
    searchMode: "name" | "ingredient";
    setSearchMode: React.Dispatch<React.SetStateAction<"name" | "ingredient">>;

    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (event: React.SyntheticEvent<HTMLFormElement>) => void;
    hasNameSearched: boolean;
    searchResultsCount: number;

    ingredientTerm: string;
    setIngredientTerm: React.Dispatch<React.SetStateAction<string>>;
    handleIngredientSearch: (event: React.SyntheticEvent<HTMLFormElement>) => void;
    hasIngredientSearched: boolean;
    ingredientResultsCount: number;
}

export function SearchSection({
    searchMode,
    setSearchMode,
    searchTerm,
    setSearchTerm,
    handleSearch,
    hasNameSearched,
    searchResultsCount,
    ingredientTerm,
    setIngredientTerm,
    handleIngredientSearch,
    hasIngredientSearched,
    ingredientResultsCount,
}:SearchSectionProps){
    return (
        <section id="search">
              <div className="search-mode">
                <button
                  type="button"
                  className={searchMode === "name" ? "active" : ""}
                  onClick={() => setSearchMode("name")}
                >
                  Por nome
                </button>

                <button
                  type="button"
                   className={searchMode === "ingredient" ? "active" : ""}
                  onClick={() => setSearchMode("ingredient")}
                >
                  Por Ingrediente
                </button>
              </div>

              {searchMode === "name" && (
                <>
                  <form onSubmit={handleSearch}>
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar por nome"
                    />

                    <button type="submit">Buscar</button>
                  </form>
                
                  {hasNameSearched && searchResultsCount === 0 && (
                    <p>Nenhuma receita encontrada.</p>
                  )}
                </>
               )} 
              

              {searchMode === "ingredient" && (
                <>
                  <form onSubmit={handleIngredientSearch}>
                    <input
                      value={ingredientTerm}
                      onChange={(e) => setIngredientTerm(e.target.value)}
                      placeholder="Buscar por ingrediente"
                    />

                    <button type="submit">Buscar</button>
                  </form>

                  {hasIngredientSearched && ingredientResultsCount === 0 && (
                    <p>Nenhuma receita encontrada para esse ingrediente.</p>
                  )}
                </>
              )}
        </section>
    );
}
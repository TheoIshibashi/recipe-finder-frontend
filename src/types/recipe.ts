export interface Recipe{
    id: string;
    name: string;
    category: string | null;
    area: string | null;
    instructions: string;
    thumbnail: string | null;
    youtube: string | null;
    tags: string[];
    ingredients: Ingredient[];

}

export interface Ingredient{
    name: string;
    measure: string | null;
}

export interface RecipeSummary{
    id: string;
    name: string;
    thumbnail: string | null;
}
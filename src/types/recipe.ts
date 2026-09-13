export interface Recipe{
    id: string;
    name: string;
    category: string;
    area: string;
    instructions: string;
    thumbnail: string;
    youtube: string;
    tags: string[];
    ingredients: Ingredient[];

}

export interface Ingredient{
    name: string;
    measure: string;
}
export interface ICategory {
  id: string;
  category: string;
  img: string;
}

export interface ICategoryMeal {
  id: string;
  meal: string;
  img: string;
}

export type IIngredients = (string | undefined)[];

export interface IRecipe {
  idMeal: string;
  meal: string;
  category?: string;
  area?: string;
  instructions?: string;
  img?: string;
  linkYT?: string;
  linkWeb?: string;
  ingredients?: (string | undefined)[];
  ingredientMeasures?: (string | undefined)[];
}

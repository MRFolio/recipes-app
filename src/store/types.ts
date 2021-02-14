export interface ICategory {
  id: string;
  category: string;
  img: string;
}

export interface ISingleMeal {
  id: string;
  meal: string;
  img: string;
}

export interface IFetchedMeals {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export type IIngredients = string[];

export interface IRecipe {
  idMeal: string;
  meal: string;
  category?: string;
  area?: string;
  instructions?: string;
  img?: string;
  linkYT?: string;
  linkWeb?: string;
  ingredients?: string[];
  ingredientMeasures?: string[];
}

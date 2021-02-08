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

export interface IRecipe {
  meal: string;
  category: string;
  area: string;
  instructions: string;
  img: string;
  linkYT: string;
  linkWeb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
}

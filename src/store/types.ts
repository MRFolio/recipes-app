export interface ICategory {
  id: string;
  category?: string;
  img: string;
}

export interface ICategoryRecipe extends ICategory {
  meal: string;
}

// export interface IRecipe {
//   id: string;
//   name: string;
// }

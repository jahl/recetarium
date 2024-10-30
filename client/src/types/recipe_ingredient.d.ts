import TIngredient from "./ingredient";

interface TRecipeIngredient {
  id?: string;
  recipeId?: string;
  ingredientId: string;
  quantity: number;
  measuringUnit: string;
  ingredient: TIngredient;
};

export default TRecipeIngredient;
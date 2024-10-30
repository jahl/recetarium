import React from 'react';
import TRecipeIngredient from '../../types/recipe_ingredient';

interface TIngredientLineItem {
  ingredientOnRecipe: TRecipeIngredient;
  onIngredientEdit: (ingredient : TRecipeIngredient) => void;
  onIngredientDeleted: (ingredientId : string) => void;
};

const IngredientLineItem : React.FC<TIngredientLineItem> = (props) => {
  const { ingredientOnRecipe, onIngredientEdit, onIngredientDeleted } = props;
  const { ingredient, quantity, measuringUnit } = ingredientOnRecipe;

  return (
    <li className='text-lg grid grid-cols-12 gap-5 py-1'>
      <div className='col-span-8'>
        <b className='font-bold'>{ingredient.name}</b> - <i>{`${quantity} ${measuringUnit}`}</i>
      </div>
      <button
        className='mx-2 text-yellow-600 hover:text-yellow-900 col-span-2'
        onClick={() => { onIngredientEdit(ingredientOnRecipe) }}>
        Edit
      </button>
      <button
        className='mx-2 text-red-600 hover:text-red-900 col-span-2'
        onClick={() => { onIngredientDeleted(ingredient.id) }} >
          Delete
      </button>
    </li>
  );
}

export default IngredientLineItem;
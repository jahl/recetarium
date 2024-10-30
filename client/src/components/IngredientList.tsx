import React, { useState } from 'react';
import TRecipeIngredient from '../types/recipe_ingredient';
import IngredientLineItem from './IngredientList/IngredientLineItem';
import IngredientModal from './IngredientFormModal';

interface TIngredientList {
  ingredients: Array<TRecipeIngredient>;
  onIngredientsUpdated: (updatedIngredients : TRecipeIngredient[]) => void;
};

const IngredientList : React.FC<TIngredientList> = ({ ingredients, onIngredientsUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredientToEdit, setIngredientToEdit] = useState<TRecipeIngredient | null>();

  const onIngredientDeleted = (ingredientId : string) => {
    onIngredientsUpdated(
      ingredients.filter((ingredient) => ingredient.ingredientId != ingredientId)
    );
  }

  const onIngredientEditClicked = (ingredient : TRecipeIngredient) => {
    setIngredientToEdit(ingredient);
    setIsModalOpen(true);
  }

  const onIngredientAddClicked = () => {
    setIngredientToEdit(null);
    setIsModalOpen(true);
  }

  const onIgredientAdded = (updatedIngredient : TRecipeIngredient) => {
    const ingredientIndex = ingredients.findIndex((ingredient) => ingredient.ingredientId == updatedIngredient.ingredientId);
    if (ingredientIndex > -1) {
      onIngredientsUpdated([
        ...ingredients.slice(0, ingredientIndex),
        updatedIngredient,
        ...ingredients.slice(ingredientIndex + 1)
      ])
    } else {
      onIngredientsUpdated([
        ...ingredients,
        updatedIngredient
      ]);
    }
    setIsModalOpen(false);
  }

  return (
    <div className='w-full md:w-1/4 px-6 py-2 lg:px-8 min-h-96 flex flex-col justify-between'>
      <div>
        <h2 className='text-2xl font-bold py-3 min-w-full'>Ingredients</h2>
        <ul>
          {
            ingredients.map((ingredient) => {
              return <IngredientLineItem 
                        ingredientOnRecipe={ingredient}
                        key={ingredient.ingredientId}
                        onIngredientEdit={onIngredientEditClicked}
                        onIngredientDeleted={onIngredientDeleted} />;
            })
          }
        </ul>
      </div>
      <button
        className='text-lg w-full rounded-md text-orange-400 px-3 py-2 my-3 text-sm font-semibold leading-6 shadow-sm hover:bg-orange-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400'
        onClick={onIngredientAddClicked}>
          Add Ingredient
      </button>
      <IngredientModal
        ingredientToEdit={ingredientToEdit}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onIngredientAdded={onIgredientAdded}
        ingredients={ingredients} />
    </div>
  );
};

export default IngredientList;
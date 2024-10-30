import React, { useState, useEffect } from 'react';
import { createIngredient, getIngredients } from '../api/ingredients';
import TIngredient from '../types/ingredient';
import TOption from '../types/option';
import AsyncCreatableSelect from 'react-select/async-creatable';

interface TIngredientSelect {
  selectedIngredient: TOption | null;
  disabledOptions: Array<any>;
  onIngredientSelected: (value : any) => void;
}

const IngredientSelect : React.FC<TIngredientSelect> = ({ disabledOptions, selectedIngredient, onIngredientSelected }) => {
  const [ingredientOptions, setIngredientOptions] = useState<TOption[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchIngredients('');
  }, [refresh]);

  const fetchIngredients = async (searchTerm : string) => {
    try {
      const response = await getIngredients(searchTerm);
      const ingredients = response.data.ingredients;
      const options = ingredients.map((ingredient : TIngredient) => {
          return { value: ingredient.id, label: ingredient.name };
      });

      setIngredientOptions(options);
      return options;
    } catch (error) {
      console.error('There was an error processing the request:', error);
      return [];
    }
  };

  const onCreateOption = async (ingredientName : string) => {
    try {
      const response = await createIngredient(ingredientName);
      const ingredient = response.data.ingredient;
      const newOption : TOption = { value: ingredient.id, label: ingredient.name };
      setRefresh(true);
      onIngredientSelected(ingredient);
    } catch (error) {
      console.error('There was an error processing the request:', error);
    }
  }

  const onOptionSelected = (option : any) => {
    onIngredientSelected(option ? {
      id: option.value,
      name: option.label
    } : null);
  }

  return (
    <>
      <label htmlFor='ingredient'>Ingredient</label>
      <AsyncCreatableSelect
        isClearable
        classNames={{ control: () => 'border-slate-400' }}
        defaultOptions={ingredientOptions}
        loadOptions={fetchIngredients}
        onChange={onOptionSelected}
        onCreateOption={onCreateOption}
        value={selectedIngredient}
        placeholder={`Some ingredient, for example: Cheese`}
        isOptionDisabled={(option) => disabledOptions.includes(option.value)}/>
    </>
  );
}

export default IngredientSelect;
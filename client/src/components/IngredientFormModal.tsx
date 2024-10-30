import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Modal from './Modal';
import IngredientSelect from './IngredientSelect';
import MEASURING_OPTIONS from '../utils/consts/measuring_options';
import TRecipeIngredient from '../types/recipe_ingredient';
import TIngredient from '../types/ingredient';

interface TIngredientFormModal {
  ingredients: Array<TRecipeIngredient>;
  ingredientToEdit?: TRecipeIngredient | null;
  isModalOpen: boolean;
  onIngredientAdded: (ingredient : TRecipeIngredient) => void;
  setIsModalOpen: (modalState : boolean) => void;
};

const IngredientModal : React.FC<TIngredientFormModal> = ({ ingredients, ingredientToEdit, isModalOpen, onIngredientAdded, setIsModalOpen }) => {
  const [ingredient, setIngredient] = useState<TIngredient | null>(null);
  const [measuringUnit, setMeasuringUnit] = useState<any>(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (ingredientToEdit) {
      setIngredient(ingredientToEdit.ingredient)
      setMeasuringUnit(ingredientToEdit.measuringUnit);
      setQuantity(ingredientToEdit.quantity);
    } else {
      setIngredient(null)
      setMeasuringUnit(null);
      setQuantity(0);
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const onMeasuringUnitSelected = (option : any) => {
    setMeasuringUnit(option.value);
  }

  const onQuantityChanged = (value : any) => {
    let inputValue = value ? Math.abs(parseFloat(value)) : 0;
    setQuantity(inputValue);
  }

  const onIngredientSubmit = async () => {
    try {
      if (!ingredient || !quantity || !measuringUnit) return;

      onIngredientAdded({
        ingredientId: ingredient.id,
        ingredient,
        quantity,
        measuringUnit
      });
    } catch (error) {
      console.error(error);
    }
  }

  const onIngredientSelected = (selectedIngredient : any) => {
    setIngredient(selectedIngredient);
  }

  return (
    <Modal 
      isOpen={isModalOpen}
      title="Add Ingredient to Recipe"
      onClose={() => { setIsModalOpen(false); }}
      onSubmit={onIngredientSubmit}>
      <div className="py-5 text-gray-900">
        <IngredientSelect
          onIngredientSelected={onIngredientSelected}
          selectedIngredient={ingredient ? { value: parseInt(ingredient.id), label: ingredient.name } : null}
          disabledOptions={ingredients.map((ingredient) => ingredient.ingredientId)}/>
        <div className='py-5 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-5 md:space-y-0'>
          <div className='md:w-1/2'>
            <label htmlFor='quantity'>Quantity</label>
            <input 
              className='w-full rounded border border-slate-400 h-9 px-2'
              type='number'
              placeholder='0'
              min={0}
              disabled={!ingredient}
              onChange={(e) => onQuantityChanged(e.target.value) }
              value={quantity} />
          </div>
          <div className='md:w-1/2'>
            <label htmlFor='measuring-unit'>Measuring Unit</label>
            <Select
              classNames={{ control: () => 'rounded border border-slate-400 h-9' }}
              options={MEASURING_OPTIONS}
              onChange={onMeasuringUnitSelected}
              placeholder='Measuring Unit'
              isDisabled={!ingredient}
              value={{ label: measuringUnit, value: measuringUnit }} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default IngredientModal;
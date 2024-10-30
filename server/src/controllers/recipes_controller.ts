
import { Request, Response } from "express";
import client from '../config/client';

export const getRecipe = async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id);
    const recipe = await client.recipe.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        ingredients: {
          select: {
            quantity: true,
            measuringUnit: true,
            ingredientId: true,
            recipeId: true,
            ingredient: true
          }
        }
      }
    });

    response.status(200).json({ recipe });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: `There was an error processing your request: ${error}`});
  }
}

export const indexRecipes = async (request: Request, response: Response) => {
  const searchTerm = <string>request.query.search_term;
  try {
    const recipes = await client.recipe.findMany({
      where: {
        title: { contains: searchTerm, mode: 'insensitive' }
      },
      select: {
        id: true,
        title: true
      }
    });

    response.status(200).json({ recipes: recipes });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: `There was an error processing your request: ${error}`});
  }
}

export const createRecipe = async (request: Request, response: Response) => {
  const { title, ingredients } = request.body;

  try {
    const ingredientAttributes = ingredients.map((ingredient : any) => {
      return {
        quantity: ingredient.quantity,
        measuringUnit: ingredient.measuringUnit,
        ingredientId: ingredient.ingredientId
      };
    });

    const recipe = await client.recipe.create({
      data: {
        title,
        ingredients: {
          create: ingredientAttributes
        }
      }
    });

    response.status(201).json(recipe);
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: `Recipe could not be created: ${error}`});
  }
}

export const editRecipe = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { title, description, ingredients } = request.body;

  try {
    const recipeId = parseInt(id);
    const oldIngredientIds = await client.ingredienstOnRecipes.findMany({ 
      where: { recipeId },
      select: { ingredientId: true }
    });
    const updatedIngredientIds = ingredients.map((ingredient : any) => ingredient.ingredientId);
    const ingredientsToRemove = oldIngredientIds.filter((oldId : any) => !updatedIngredientIds.includes(oldId.ingredientId));

    const ingredientAttributes = ingredients.map((ingredient : any) => {
      return {
        where: {
          recipeId_ingredientId: { recipeId,  ingredientId: ingredient.ingredientId }
        },
        create: {
          ingredientId: ingredient.ingredientId,
          quantity: ingredient.quantity,
          measuringUnit: ingredient.measuringUnit
        },
        update: {
          quantity: ingredient.quantity,
          measuringUnit: ingredient.measuringUnit
        }
      };
    });

    const recipe = await client.recipe.update({
      where: { id: recipeId },
      data: {
        title,
        description,
        ingredients: {
          deleteMany: ingredientsToRemove.map((ingredientId) => ({
            recipeId: recipeId,
            ingredientId: ingredientId.ingredientId,
          })),
          upsert: ingredientAttributes
        }
      }
    });

    response.status(200).json({ recipe });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: `Recipe could not be edited: ${error}`});
  }
}

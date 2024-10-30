
import { Request, Response } from "express";
import client from '../config/client';
import { capitalizeFirstLetter } from "../util/strings";

export const indexIngredients = async (request: Request, response: Response) => {
  const searchTerm = <string>request.query.search_term;
  try {
    const ingredients = await client.ingredient.findMany({
      where: {
        name: { contains: searchTerm, mode: 'insensitive' }
      },
      select: {
        id: true,
        name: true
      }
    });

    response.status(200).json({ ingredients });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: `There was an error processing your request: ${error}`});
  }
}

export const createIngredient = async (request: Request, response: Response) => {
  const { name } = request.body;

  try {
    const ingredient = await client.ingredient.create({
      data: {
        name: capitalizeFirstLetter(name)
      }
    });

    response.status(201).json({ ingredient });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: `Ingredient could not be created: ${error}`});
  }
}

export const getIngredientsByRecipe = async (request: Request, response: Response) => {
  try {
    const recipeId = parseInt(request.params.recipeId);
    const ingredients = await client.ingredienstOnRecipes.findMany({
      where: { recipeId },
      include: {
        ingredient: true
      }
    });

    response.status(200).json({ ingredients });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: `There was an error processing your request: ${error}`});
  }
}

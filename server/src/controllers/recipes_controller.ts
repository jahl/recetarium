
import { Request, Response } from "express";
import client from '../config/client';

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
};

export const createRecipe = async (request: Request, response: Response) => {
  const { title, ingredients } = request.body;

  try {
    const ingredientAttributes = ingredients.map((ingredient : any) => {
      return {
        quantity: ingredient.quantity,
        measuringUnit: ingredient.measuringUnit,
        ingredient: {
          connectOrCreate: {
            where: {
              name: ingredient.name
            },
            create: {
              name: ingredient.name
            }
          }
        }
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

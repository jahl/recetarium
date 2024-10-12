
import { Request, Response } from "express";
import client from '../config/client';

export const indexUsers = async (request: Request, response: Response) => {
  try {
    const users = await client.user.findMany({
      select: {
        id: true,
        username: true
      }
    });
    response.status(200).json({ users: users });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: `There was an error processing your request: ${error}`});
  }
};

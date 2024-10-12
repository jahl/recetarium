
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import client from '../config/client';
import jwt from 'jsonwebtoken';

export const registerUser = async (request: Request, response: Response) => {
  const { username, password } = request.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await client.user.create({
      data: {
        username,
        password: hashedPassword
      }
    });

    response.status(201).json(user);
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: `User could not be created: ${error}`});
  }
};

export const logIn = async (request: Request, response: Response) => {
  const { username, password } = request.body;

  try {
    const user = await client.user.findUnique({
      where: { username }
    });
    if (!user) {
      response.status(401).json({ error: 'invalid username or password'});
      return;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      response.status(401).json({ error: 'invalid username or password'});
      return;
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username
      },
      process.env.JWT_SECRET || 'secret', 
      {
        expiresIn: '1h'
      }
    );

    response.json({ token });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: `There was an error logging you in: ${error}`});
  }
};
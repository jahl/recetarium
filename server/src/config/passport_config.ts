import { Strategy, StrategyOptions } from 'passport-jwt';
import { Request } from 'express';
import client from './client';

const cookieExtractor = (request: Request) => {
  let token = null;
  if (request && request.cookies) {
    token = request.cookies.token; 
  }
  return token;
};

const options : StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET || 'secret'
};

const passportConfig = (passport: any) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        console.log(payload)
        const user = await client.user.findUnique({
          where: {
            id: payload.id
          },
          select: {
            id: true,
            username: true
          }
        });

        if (user) {
          return done(null, user);
        }
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );
};

export default passportConfig;
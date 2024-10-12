import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import client from './client';

const options : StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
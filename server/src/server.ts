import './config/setup';
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import passportConfig from './config/passport_config';
import routes from './config/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

passportConfig(passport);
app.use(passport.initialize());

app.use(routes);

app.listen(port, () => {
  console.log(`server is running @ http://localhost:${port}`);
});


import { Router } from 'express';
import Answer from './Answer';

const routes = new Router();

routes.get('/', async (req, res) => {
  const data = await Answer.All();

  res.render('index.ejs', { data });
});

export default routes;
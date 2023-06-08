import {
  create,
  get,
  getId,
  remove,
  update,
} from "../controllers/user.controller";
import {verifyToken} from '../middlewares/auth'

export const userRoutes = (app: any) => {
     app.post('/v1/user', create);
    app.get('/v1/user', verifyToken, get);
    app.get('/v1/user/:id', verifyToken, getId);
    app.put('/v1/user/:id', verifyToken, update);
    app.delete('/v1/user/:id', verifyToken, remove);
}

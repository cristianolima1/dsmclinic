import { authRoutes } from './auth.routes';
import  {userRoutes} from './user.routes';

const routes = (app: any) =>{
    userRoutes(app);
    authRoutes(app);
}
export default routes; 
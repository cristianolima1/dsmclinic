import {auth, validate} from '../controllers/auth.controller';

export const authRoutes = (app: any) => {
    app.post('/v1/login', auth);
    app.post('/v1/validate', validate);
    
}
import { Router } from 'express';

import { userCreationSchema } from '../users/user.validation';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';

const AuthRouter: Router = Router();

AuthRouter.post(
    '/register',
    validateRequest(userCreationSchema),
    AuthControllers.registerCustomer,
);

AuthRouter.post('/login', AuthControllers.loginCustomer);
AuthRouter.put('/change-password', AuthControllers.changePassword);
AuthRouter.put('/update', AuthControllers.updateUser);
AuthRouter.get('/', AuthControllers.getUsers);
AuthRouter.get('/:id', AuthControllers.getSingleUser);
AuthRouter.put('/users/:id', AuthControllers.toggleUserBlock);

export default AuthRouter;

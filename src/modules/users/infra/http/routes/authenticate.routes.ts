import AuthenticateUserController from '@modules/users/useCases/authenticateUser/AuthenticateUserController';
import { Router } from 'express';

const authenticateUserController = new AuthenticateUserController();

const authenticateRoutes = Router();
authenticateRoutes.post('/sessions', authenticateUserController.handle);

export { authenticateRoutes };

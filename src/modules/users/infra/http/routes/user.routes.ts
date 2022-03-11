import { Router } from 'express';
import CreateUserController from '@modules/users/useCases/createUser/CreateUserController';
import DeleteUserController from '@modules/users/useCases/deleteUser/DeleteUserController';
import ShowUserController from '@modules/users/useCases/showUSer/ShowUserController';
import UpdateUserController from '@modules/users/useCases/updateUser/UpdateUserController';

const userRouter = Router();
const createUserController = new CreateUserController();
const showUserController = new ShowUserController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();

userRouter.post('/', (request, response) => createUserController.handle(request, response));

userRouter.get('/:id', (request, response) => showUserController.handle(request, response));

userRouter.put('/', (request, response) => updateUserController.handle(request, response));

userRouter.delete('/:id', (request, response) => deleteUserController.handle(request, response));

export { userRouter };

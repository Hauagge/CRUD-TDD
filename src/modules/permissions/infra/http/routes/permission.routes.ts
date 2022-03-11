import { Router } from 'express';
import CreatePermissionController from '@modules/permissions/useCases/createPermission/CreatePermissionController';
import ShowPermissionController from '@modules/permissions/useCases/showPermission/ShowPermissionController';
import IndexPermissionController from '@modules/permissions/useCases/indexPermission/IndexPermissionController';
import DeletePermissionController from '@modules/permissions/useCases/deletePermission/DeletePermissionController';
import UpdatePermissionController from '@modules/permissions/useCases/updatePermission/UpdatePermissionController';

const permissionRouter = Router();
const createPermissionController = new CreatePermissionController();
const showPermissionController = new ShowPermissionController();
const indexPermissionController = new IndexPermissionController();
const deletePermissionController = new DeletePermissionController();
const updatePermissionController = new UpdatePermissionController();

permissionRouter.post('/', (request, response) => createPermissionController.handle(request, response));
permissionRouter.get('/:id', (request, response) => showPermissionController.handle(request, response));
permissionRouter.get('/', (request, response) => indexPermissionController.handle(request, response));
permissionRouter.delete('/:id', (request, response) => deletePermissionController.handle(request, response));
permissionRouter.put('/', (request, response) => updatePermissionController.handle(request, response));

export { permissionRouter };

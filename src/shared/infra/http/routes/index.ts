import { Router } from 'express';

import { userRouter } from '@modules/users/infra/http/routes/user.routes';
import { equipmentRouter } from '@modules/equipments/infra/http/routes/equipments.routes';
import { authenticateRoutes } from '@modules/users/infra/http/routes/authenticate.routes';
import { permissionRouter } from '@modules/permissions/infra/http/routes/permission.routes';

const routes = Router();

routes.use(authenticateRoutes);
routes.use('/users', userRouter);

routes.use('/equipments', equipmentRouter);

routes.use('/permissions', permissionRouter);

export default routes;

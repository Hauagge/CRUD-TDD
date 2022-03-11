import { Router } from 'express';
import CreateEquipmentController from '@modules/equipments/useCases/createEquipment/CreateEquipmentController';
import ShowEquipmentController from '@modules/equipments/useCases/showEquipment/ShowEquipmentController';
import DeleteEquipmentController from '@modules/equipments/useCases/deleteEquipment/DeleteEquipmentController';
import UpdateEquipmentController from '@modules/equipments/useCases/updateEquipment/UpdateEquipmentController';
import IndexEquipmentController from '@modules/equipments/useCases/indexEquipment/IndexEquipmentController';

const equipmentRouter = Router();
const createEquipmentController = new CreateEquipmentController();
const showEquipmentController = new ShowEquipmentController();
const deleteEquipmentController = new DeleteEquipmentController();
const updateEquipmentController = new UpdateEquipmentController();
const indexEquipmentUseCase = new IndexEquipmentController();

equipmentRouter.post('/', (request, response) => createEquipmentController.handle(request, response));

equipmentRouter.get('/description/:id', (request, response) => showEquipmentController.handle(request, response));

equipmentRouter.put('/', (request, response) => updateEquipmentController.handle(request, response));

equipmentRouter.delete('/:id', (request, response) => deleteEquipmentController.handle(request, response));

equipmentRouter.get('/', (request, response) => indexEquipmentUseCase.handle(request, response));

export { equipmentRouter };

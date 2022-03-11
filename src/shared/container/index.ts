import { container } from 'tsyringe';

import '@modules/users/providers';

import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import { UserRepository } from '@modules/users/infra/repositories/implementation/UserRepository';

import IEquipamentRepository from '@modules/equipments/infra/repositories/IEquipmentRepository';
import { EquipmentRepository } from '@modules/equipments/infra/repositories/implementation/EquipmentRepository';

import IPermissionRepository from '@modules/permissions/infra/repositories/IPermissionRepository';
import { PermissionRepository } from '@modules/permissions/infra/repositories/implementation/PermissionRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IEquipamentRepository>('EquipmentRepository', EquipmentRepository);

container.registerSingleton<IPermissionRepository>('PermissionRepository', PermissionRepository);

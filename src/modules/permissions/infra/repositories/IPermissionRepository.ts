import { Permission } from '../../entities/Permissions';

export default interface IPermissionRepository {
	findById(id: string): Promise<Permission | undefined>;
	create(permission: Permission): Promise<Permission>;
	update(permission: Permission): Promise<Permission>;
	delete(permission: Permission): Promise<Permission>;
	listAllPermissions(): Promise<Permission[]>;
};

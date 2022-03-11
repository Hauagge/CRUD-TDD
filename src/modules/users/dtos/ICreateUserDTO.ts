export interface ICreateUserDTO {
	email: string;
	name?: string;
	password: string;
	avatar?: string;
	code_post?: string;
	country?: string;
	state?: string;
	city?: string;
	district?: string;
	street?: string;
	number?: string;
	complement?: string;
	document_type?: string;
	document_number?: string;
	userType?: string;
	deleted_at?: Date;
}

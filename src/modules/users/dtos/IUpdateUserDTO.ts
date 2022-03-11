export interface IUpdateUserDTO {
	user_id: string;
	email: string;
	name?: string;
	old_password?: string;
	password?: string;
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
}

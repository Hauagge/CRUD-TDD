class User {
	id?: string;
	name?: string;
	email: string;
	password: string;
	avatar?: string | null;
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
	privice_police?: boolean;
	terms_user?: boolean;
	email_confirmed?: boolean;
	isAdmin?: boolean;
	deleted_at?: Date;

	private constructor({
		name,
		email,
		password,
		avatar,
		code_post,
		country,
		state,
		city,
		district,
		street,
		number,
		complement,
		document_type,
		document_number,
		userType,
		deleted_at
	}: User) {
		return Object.assign(this, {
			name,
			email,
			password,
			avatar,
			code_post,
			country,
			state,
			city,
			district,
			street,
			number,
			complement,
			document_type,
			document_number,
			userType,
			deleted_at
		});
	}

	static create({
		name,
		email,
		password,
		avatar,
		code_post,
		country,
		state,
		city,
		district,
		street,
		number,
		complement,
		document_type,
		document_number,
		userType,
		deleted_at
	}: User) {
		const user = new User({
			name,
			email,
			password,
			avatar,
			code_post,
			country,
			state,
			city,
			district,
			street,
			number,
			complement,
			document_type,
			document_number,
			userType,
			deleted_at,
			privice_police: false,
			terms_user: false,
			email_confirmed: false,
			isAdmin: false
		});
		return user;
	}
}

export { User };

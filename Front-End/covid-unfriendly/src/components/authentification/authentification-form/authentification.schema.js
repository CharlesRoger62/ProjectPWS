export const AuthentificationSchema = {
	type: 'object',
	properties: {
		login: { type: 'string', maxLength: 30 },
        password: { type: 'string', maxLength: 30}
	},
	required: [
		'login',
        'password'
	],
};
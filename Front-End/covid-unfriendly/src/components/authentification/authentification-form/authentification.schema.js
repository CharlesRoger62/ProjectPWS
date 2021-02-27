const AuthentificationSchema = {
	type: 'object',
	properties: {
		login: { type: 'string', format: 'text', maxLength: 30 },
        password: { type: 'string', format: 'password', maxLength: 30}
	},
	required: [
		'login',
        'password'
	],
};
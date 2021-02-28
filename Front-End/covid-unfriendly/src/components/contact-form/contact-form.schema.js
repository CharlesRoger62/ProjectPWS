export const contactSchema = {
	type: 'object',
	properties: {
		nom: { type: 'string' },
		prenom: { type: 'string' },
		mail: { type: 'string', format: 'email' },
		commentaire: { type: 'string', minLength: 30, maxLength: 500 },
	},
	required: [
		'nom',
		'prenom',
		'mail',
		'commentaire'
	],
  };
const swaggerJSDoc = require("swagger-jsdoc");

/**
* @swagger
* /api:
*   post:
*     tags:
*       - APIkeys
*     summary: Request for API key
*     operationId: giveAPIkey
*     parameters:
*       - name: name
*         in: query
*         description: Username
*         required: true
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/APIkeys'         
*       '400':
*         description: Invalid request body
*       '500':
*         description: Internal server error
* /api/{id}:
*   delete:
*     tags:
*       - APIkeys
*     summary: Request to remove the API key
*     operationId: delAPIkey
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: Id of the key to delete
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/APIkeys'         
*       '400':
*         description: Invalid request body
*       '500':
*         description: Internal server error
* /models:
*   get:
*     tags:
*       - Models
*     summary: Request for a list of models
*     operationId: showModels
*     responses:
*       '200':
*         description: successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/models'
*       '404':
*         description: No models found
*       '500':
*         description: Internal server error
*   post:
*     tags:
*       - Models
*     summary: Request to add a model
*     operationId: insertModel
*     parameters:
*       - name: name
*         in: query
*         description: Username
*         required: true
*         schema:
*           type: string
*       - name: modelname
*         in: query
*         description: Model name
*         required: true
*         schema:
*           type: string
*       - name: modeltype
*         in: query
*         description: Model type
*         required: true
*         schema:
*           type: string
*       - name: object
*         in: query
*         description: Object
*         required: true
*         schema:
*           type: string
*       - name: description
*         in: query
*         description: Model description
*         required: true
*         schema:
*           type: string
*       - name: comments
*         in: query
*         description: Commentary to the model
*         required: true
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/models'
*       '400':
*         description: Invalid API key
*       '500':
*         description: Internal server error
*     security:
*       - pkey: []
* /models/{id}:
*   get:
*     tags:
*       - Models
*     summary: Request to display a model by Id
*     operationId: showModelId
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: Id of the model to retrieve
*         schema:
*           type: string
*     responses:
*       '200':
*         description: successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/models'
*       '404':
*         description: No models found
*       '500':
*         description: Internal server error
*   put:
*     tags:
*       - Models
*     summary: Request to change the model by Id
*     operationId: updateModel
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: ID of the model to retrieve
*         schema:
*           type: string
*       - name: name
*         in: query
*         description: Username
*         required: true
*         schema:
*           type: string
*       - name: modelname
*         in: query
*         description: Model name
*         schema:
*           type: string
*       - name: modeltype
*         in: query
*         description: Model type
*         schema:
*           type: string
*       - name: object
*         in: query
*         description: Object
*         required: true
*         schema:
*           type: string
*       - name: description
*         in: query
*         description: Model description
*         schema:
*           type: string
*       - name: comments
*         in: query
*         description: Commentary to the model
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/models'
*       '400':
*         description: Invalid request body
*       '404':
*         description: Model not found
*       '500':
*         description: Internal server error
*     security:
*       - pkey: []
*   delete:
*     tags:
*       - Models
*     summary: Request to delete a model
*     operationId: delModelId
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: Id of the model to retrieve
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Model deleted successfully
*       '400':
*         description: Invalid API key
*       '404':
*         description: Model not found
*       '500':
*         description: Internal server error
*     security:
*       - pkey: []
*/

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
			title: "Welcome to SWAGGER OpenAPI 3.0",
			version: "1.0.0"
	},
	servers: [
			{url: "http://127.0.0.1:5500/v2"}
	],
	tags: [
			{ name: "APIkeys", description: "Everything about APIkeys"},
			{ name: "Models", description: "Everything about Models"}
	],
	components: {
			schemas: {
				models: {
							type: "object",
							properties: {
							name: 		     { type: "string", description: "user name",  example: "ayxtest"},
							modelname:     { type: "string", description: "model name", example: "testmodel"},
							modeltype:     { type: "string", description: "model type", example: "typetest"},
							object:        { type: "string", description: "object",     example: "planetest"},
							description:   { type: "string", description: "model description",       example: "WRITETESTDESC"},
							comments:      { type: "string", description: "comments", example: "areyouwrite"}
							}
					},
					APIkeys: {
							type: "object",	
							properties: {
									name: { type: "string", description: "username",	  example: "testaaa"}
							}
					}
			},
			securitySchemes: {
				pkey: {
							type: "apiKey",
							name: "pkey",
							in: "query"
					}
			}
	}
};

const options = {
	swaggerDefinition,
	apis: ["./*.js"]
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
const APIkey = require("../models/APIkeys");
const Model = require("../models/models");
const db = require("../configs/config");
const crypto = require("crypto");


function authorization(req, res, next) {
	try {
		const apiKey = req.query.pkey;
		APIkey.findOne({ key: apiKey })
			.then((result) => {
				if (result) {
					next();
				} else {
					const error = new Error("Доступ запрещен");
					error.statusCode = 400;
					throw error;
				}
			})
			.catch((err) => {
				next(err);
			});
	} catch (err) {
		next(err);
	}
}

async function giveAPIkey(req, res, next) {
	try {
			const apikey = new APIkey({name: req.query.name});
			const newapikey = crypto.randomBytes(8).toString("hex");
			apikey.key = newapikey;

			apikey
				.save()
				.then(() => {
					res.status(200).json(newapikey);
				})
				.catch((err) => {
					next(err);
				});
	} catch (err) {
		next(err);
	}
}

async function delAPIkey(req, res, next) {
	try {
		const id = req.params.id;

		APIkey.findOneAndDelete({ key: id })
			.then((result) => {
				if (result) {
					res.status(200).json("Данные успешно удалены");
				} else {
					const error = new Error("Такого документа не существует");
					error.statusCode = 404;
					throw error;
				}
			})
			.catch((err) => {
				next(err);
			});
	} catch (err) {
		next(err);
	}
}

async function showModels(req, res, next) {
	try {
		Model.find({}, { modelname: 1, modeltype: 1 })
			.then((models) => {
				res.status(200).json(models);
			})
			.catch((err) => {
				next(err);
			});
	} catch (err) {
		next(err);
	}
}

async function showModelId(req, res, next) {
	try {
		const id = req.params.id;
		Model.findById(id)
			.then((result) => {
				if (result) {
					res.status(200).json(result);
				} else {
					const error = new Error("Такого документа не существует");
					error.statusCode = 404;
					throw error;
				}
			})
			.catch((err) => {
				next(err);
			});
	} catch (err) {
		next(err);
	}
}

async function insertModel(req, res, next) {
	try {
			const model = new Model({
				name: req.query.name,
				modelname: req.query.modelname,
				modeltype: req.query.modeltype,
				object: req.query.object,
				description: req.query.description,
				comments: req.query.comments});
			
			model
				.save()
				.then(() => {
					res.status(200).json(`Данные успешно отправлены!`);
				})
				.catch((err) => {
					next(err);
				});
	} catch (err) {
		next(err);
	}
}

async function updateModel(req, res, next) {
	try {
			const id = req.params.id;
			Model.findByIdAndUpdate(id, {
				name: req.query.name,
				modelname: req.query.modelname,
				modeltype: req.query.modeltype,
				object: req.query.object,
				description: req.query.description,
				comments: req.query.comments,
				datachange: Date.now()
			})
				.then((result) => {
					if (result) {
						res.status(200).json("Данные успешно обновлены");
					} else {
						const error = new Error("Такого документа не существует");
						error.statusCode = 404;
						throw error;
					}
				})
				.catch((err) => {
					next(err);
				});
	} catch (err) {
		next(err);
	}
}

async function delModelId(req, res, next) {
	try {
		const id = req.params.id;
		Model.findByIdAndDelete(id)
			.then((result) => {
				if (result) {
					res.status(200).json("Данные успешно удалены");
				} else {
					const error = new Error("Такого документа не существует");
					error.statusCode = 404;
					throw error;
				}
			})
			.catch((err) => {
				next(err);
			});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	giveAPIkey,
	delAPIkey,
	showModels,
	showModelId,
	insertModel,
	updateModel,
	delModelId,
	authorization,
};
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const restAPI = require("./router/rest");
const dbAPI = require("./controllers/controller");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const HOST = "127.0.0.1";
const PORT = 5500;

const app = express();
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use("/v1", restAPI);
app.use("/v2", dbAPI);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, HOST, () => {
	console.log(`Сервер запущен http://${HOST}:${PORT}`);
});

app.use(function (err, req, res, next) {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal server error";
	res.status(statusCode).json({ message: message });
});

app.use((req, res, next) => {
	res.status(400).send("Такой страницы не существует!");
});
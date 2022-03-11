import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'dotenv/config';
import AppError from '@shared/errors/AppErrors';
import '@shared/container';
import routes from './routes';

const app = express();

// Tratar retorno dos ERROS DE

app.use(express.json());
app.use(routes);
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(400).json({
			status: 'error',
			message: err.message
		});
	}
	console.log(err);
	return res.status(500).json({
		status: 'error',
		message: `Internal server error  - ${err}`
	});
});

export { app };

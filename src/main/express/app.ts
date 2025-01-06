import { makeHandleApplicationErrorMiddleware } from '@/application/shared/http/middlewares/factories/make-handle-application-error-middleware';
import express from 'express';
import { errorMiddlewareAdapter } from './adapters/error-middleware-adapter';
import { appRouter } from './routes/app-router';

const app = express();

app.use(express.json());

app.use(appRouter);

app.use(errorMiddlewareAdapter(makeHandleApplicationErrorMiddleware()));

export { app };


import { makeHandleApplicationErrorMiddleware } from '@/application/shared/http/middlewares/factories/make-handle-application-error-middleware';
import cors from 'cors';
import express from 'express';

import { makeCheckoutProvider } from '@/application/shared/providers/checkout-provider/make-checkout-provider';
import { errorMiddlewareAdapter } from './adapters/error-middleware-adapter';
import { appRouter } from './routes/app-router';

const app = express();

app.use(cors());

app.post('/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const checkoutProvider = makeCheckoutProvider();
    const sig = req.headers['stripe-signature'] as string;

    const event = checkoutProvider.generateWebhookEvent(req.body, sig);
    await checkoutProvider.handleWebhookEvent(event);

    res.status(200).send('Evento processado com sucesso');
  }
);

app.use(express.json());

app.use(appRouter);

app.use(errorMiddlewareAdapter(makeHandleApplicationErrorMiddleware()));

export { app };


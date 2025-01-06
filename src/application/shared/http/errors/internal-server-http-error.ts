

import { IHttpStatusCode } from '../interfaces/http';
import { type ErrorMessage, HttpError } from './http-error';

export class InternalServerHTTPError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(IHttpStatusCode.INTERNAL_SERVER_ERROR, message);
  }
}

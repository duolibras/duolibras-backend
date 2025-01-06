

import { IHttpStatusCode } from '../interfaces/http';
import { type ErrorMessage, HttpError } from './http-error';

export class ForbiddenHTTPError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(IHttpStatusCode.FORBIDDEN, message);
  }
}

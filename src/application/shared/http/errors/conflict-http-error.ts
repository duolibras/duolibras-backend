

import { IHttpStatusCode } from '../interfaces/http';
import { ErrorMessage, HttpError } from './http-error';

export class ConflictHTTPError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(IHttpStatusCode.CONFLICT, message);
  }
}

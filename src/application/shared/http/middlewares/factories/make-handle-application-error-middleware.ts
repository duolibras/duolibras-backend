import { HandleApplicationErrorMiddleware } from '../handle-application-error-middleware';

export function makeHandleApplicationErrorMiddleware() {
  return new HandleApplicationErrorMiddleware();
}

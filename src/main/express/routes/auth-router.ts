import { makeGetProfileController } from '@/application/modules/auth/use-cases/get-profile/factories/make-get-profile-controller';
import { makeSignInController } from '@/application/modules/auth/use-cases/sign-in/factories/make-sign-in-controller';
import { makeSignUpStudentController } from '@/application/modules/auth/use-cases/sign-up/factories/make-sign-up-student-controller';
import { makeSignUpTeacherController } from '@/application/modules/auth/use-cases/sign-up/factories/make-sign-up-teacher-controller copy';
import { makeAuthenticationMiddleware } from '@/application/shared/http/middlewares/factories/make-authentication-middleware';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const authRouter = Router();

authRouter.post('/sign-up/student', routeAdapter(makeSignUpStudentController()));
authRouter.post('/sign-up/teacher', routeAdapter(makeSignUpTeacherController()));
authRouter.post('/sign-in', routeAdapter(makeSignInController()));

authRouter.get('/me', middlewareAdapter(makeAuthenticationMiddleware()), routeAdapter(makeGetProfileController()));

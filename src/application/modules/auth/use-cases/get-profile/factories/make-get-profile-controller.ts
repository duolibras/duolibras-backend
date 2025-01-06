import { GetProfileController } from '../get-profile-controller';
import { makeGetProfileUseCase } from './make-get-profile-use-case';

export function makeGetProfileController() {
  const getProfileUseCase = makeGetProfileUseCase();

  return new GetProfileController(getProfileUseCase);
}

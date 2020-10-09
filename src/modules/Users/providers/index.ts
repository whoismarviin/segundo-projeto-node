import {container} from 'tsyringe'

import IHashProvider from './HashProviders/models/IHashProvider';
import BcryptHashProvider from './HashProviders/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider',BcryptHashProvider)

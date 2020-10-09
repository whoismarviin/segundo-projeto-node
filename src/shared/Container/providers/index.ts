import {container} from 'tsyringe';


import IStorageProvider from './storedProviders/models/IStoredProvider'
import DiskStorageProvider from './storedProviders/implementations/DiskStoredProvider';

import IMailProvider from './MailProvider/Models/IMailProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'
import HandleBarsMailTemplate from './MailTemplateProvider/implementations/HandleBarsMailTemplate';



container.registerSingleton<IStorageProvider>('StorageProvider',DiskStorageProvider)

container.registerInstance<IMailProvider>('MailProvider',new EtherealMailProvider())

container.registerSingleton<IMailTemplateProvider>('StorageProvider',HandleBarsMailTemplate)
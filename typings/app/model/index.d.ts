// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCurrency from '../../../app/model/Currency';
import ExportSignIn from '../../../app/model/SignIn';
import ExportUsers from '../../../app/model/Users';

declare module 'egg' {
  interface IModel {
    Currency: ReturnType<typeof ExportCurrency>;
    SignIn: ReturnType<typeof ExportSignIn>;
    Users: ReturnType<typeof ExportUsers>;
  }
}

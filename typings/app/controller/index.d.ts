// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';
import ExportUserInstruction from '../../../app/controller/user_instruction';
import ExportUserShop from '../../../app/controller/user_shop';
import ExportUtilsServerUtil from '../../../app/controller/utils/serverUtil';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    user: ExportUser;
    userInstruction: ExportUserInstruction;
    userShop: ExportUserShop;
    utils: {
      serverUtil: ExportUtilsServerUtil;
    }
  }
}

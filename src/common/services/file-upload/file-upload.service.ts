import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';
import { MONGODB_URI } from '../../constants/database';

@Injectable()
export class FileUploadService implements MulterOptionsFactory {
  gridFsStorage; // storage
  constructor() {
    this.gridFsStorage = new GridFsStorage({
      url: MONGODB_URI,
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          const filename =
            new Date().getTime() + '-' + file.originalname.trim();
          const fileinfo = { filename };
          resolve(fileinfo);
        });
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}

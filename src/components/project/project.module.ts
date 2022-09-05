/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadService } from '../../common/services/file-upload/file-upload.service';
import { ProjectSchema } from '../../schemas/project.schema';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    MulterModule.registerAsync({
      useClass: FileUploadService,
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, FileUploadService],
})
export class ProjectModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectService } from './project/project.service';
import { ProjectModule } from './project/project.module';
import { MONGODB_URI } from '../common/constants/database';
import { ProjectSchema } from '../schemas/project.schema';

@Module({
  imports: [
    ProjectModule,
    MongooseModule.forRoot(MONGODB_URI),
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, ProjectService],
})
export class AppModule {}

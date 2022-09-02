/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '../../schemas/project.schema';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }])],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectModule {}

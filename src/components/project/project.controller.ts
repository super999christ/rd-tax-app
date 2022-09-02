import { Controller, Delete, Get, Post, Put, Query, Body, Param } from '@nestjs/common';
import { ProjectDocument } from 'src/schemas/project.schema';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/')
  async getProjects(@Query() query: { startPage: number; pageSize: number }) {
    const projects = await this.projectService.findAll(query.startPage, query.pageSize);
    return projects;
  }

  @Post('/')
  async addProject(@Body() body: ProjectDocument) {
    const result = await this.projectService.addOne(body);
    return result;
  }

  @Put()
  async updateProject(@Body() body: ProjectDocument) {
    const result = await this.projectService.updateOne(body);
    return result;
  }

  @Delete('/:id')
  async deleteProject(@Param('id') id: string) {
    const result = await this.projectService.deleteOne(id);
    return result;
  }

  @Post('upload')
  async uploadDocument() {
    
  }
}
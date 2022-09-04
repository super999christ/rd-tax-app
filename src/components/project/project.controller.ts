import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiOkResponse, ApiConsumes } from '@nestjs/swagger';
import {
  DownloadDocumentRequest,
  FileInfo,
  GetProjectsRequest,
  ProjectDocument,
  UploadDocumentRequest,
} from './project.dto';
import { ProjectService } from './project.service';
@Controller('api/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'Get all projects' })
  @ApiOkResponse({ type: [ProjectDocument] })
  @Get('/')
  async getProjects(@Query() query: GetProjectsRequest) {
    const projects = await this.projectService.findAll(
      query.startPage,
      query.pageSize,
    );
    return projects;
  }

  @ApiOperation({ summary: 'Add new project' })
  @ApiOkResponse({ type: ProjectDocument })
  @Post('/')
  async addProject(@Body() body: ProjectDocument) {
    const result = await this.projectService.addOne(body);
    return result;
  }

  @ApiOperation({ summary: 'Update existing project' })
  @ApiOkResponse({ type: ProjectDocument })
  @Put('/')
  async updateProject(@Body() body: ProjectDocument) {
    const result = await this.projectService.updateOne(body);
    return result;
  }

  @ApiOperation({ summary: 'Delete project' })
  @ApiOkResponse({ type: ProjectDocument })
  @Delete('/:id')
  async deleteProject(@Param('id') id: string) {
    const result = await this.projectService.deleteOne(id);
    return result;
  }

  @ApiOperation({ summary: 'Upload pdf file' })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: FileInfo })
  @Post('/uploadDocument')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @Body() body: UploadDocumentRequest,
    @UploadedFile() file: { id: string },
  ) {
    await this.projectService.uploadDocument(
      body.projectId,
      body.expenseId,
      file.id,
    );
    return file;
  }

  @ApiOperation({ summary: 'Download pdf file' })
  @Get('/viewDocument')
  async viewDocument(
    @Query() query: DownloadDocumentRequest,
    @Res({ passthrough: true }) res,
  ) {
    const docStream = await this.projectService.viewDocument(query.docId);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
    });
    return docStream;
  }
}

import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import mongoose, { Connection, Model } from 'mongoose';
import { Project } from '../../schemas/project.schema';
import { ProjectDocument } from './project.dto';

@Injectable()
export class ProjectService {
  private fileModel: MongoGridFS;

  constructor(
    @InjectModel(Project.name) private readonly model: Model<ProjectDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }

  async findAll(
    startPage: number,
    pageSize: number,
  ): Promise<ProjectDocument[]> {
    const pagination = { skip: startPage * pageSize, limit: pageSize };
    const projects = await this.model.find({}, {}, pagination).exec();
    return projects;
  }

  updateTimestamp(project: ProjectDocument) {
    project.expenses.forEach((expense) => {
      const now = new Date();
      if (expense._id) {
        expense.updatedAt = now;
      } else {
        expense._id = new mongoose.Types.ObjectId();
        expense.createdAt = now;
        expense.updatedAt = now;
      }
    });
  }

  async addOne(project: ProjectDocument): Promise<ProjectDocument> {
    // Calculate timestamp
    this.updateTimestamp(project);

    const newProject = await this.model.create(project);
    return newProject;
  }

  async updateOne(project: ProjectDocument): Promise<ProjectDocument> {
    // Calculate timestamp
    this.updateTimestamp(project);

    await this.model.updateOne({ _id: project._id }, { $set: project });

    const updatedProject = await this.model.findById(project._id);
    return updatedProject;
  }

  async deleteOne(projectId: string): Promise<ProjectDocument> {
    const deletedProject = await this.model.findOneAndRemove({
      _id: projectId,
    });
    return deletedProject;
  }

  async uploadDocument(
    projectId: string,
    expenseId: string,
    docId: string,
  ): Promise<string> {
    const project = await this.model.findById(projectId);
    if (!project) {
      return;
    }
    const expense = project.expenses.find(
      (expense) => expense._id === expenseId,
    );
    if (!expense) {
      return;
    }
    expense.docId = docId;

    await this.model.updateOne({ _id: projectId }, { $set: project });
  }

  async viewDocument(docId: string): Promise<StreamableFile> {
    const stream = await this.fileModel.readFileStream(docId);
    return new StreamableFile(stream);
  }
}

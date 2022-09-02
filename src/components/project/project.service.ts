import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Project, ProjectDocument } from '../../schemas/project.schema';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private readonly model: Model<ProjectDocument>) {

    }

    async findAll(startPage: number, pageSize: number): Promise<ProjectDocument[]> {
        const pagination = pageSize < 0 ? {} : { skip: startPage * pageSize, limit: pageSize };
        return await this.model.find({}, {}, pagination).exec();
    }

    updateTimestamp(project: ProjectDocument) {
        project.expenses.forEach(expense => {
            const now = new Date();
            if (expense._id) {
                expense.updatedAt = now;
            } else {
                expense._id = new mongoose.Types.ObjectId();
                expense.createdAt = now;
                expense.updatedAt = now;
            }
        })
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
        const deletedProject = await this.model.findOneAndRemove({_id: projectId});
        return deletedProject;
    }
}

import { ApiProperty } from '@nestjs/swagger';

export class GetProjectsRequest {
  @ApiProperty({ type: Number, required: false })
  startPage: number;

  @ApiProperty({ type: Number, required: false })
  pageSize: number;
}

export class UploadDocumentRequest {
  @ApiProperty({ type: String, required: false })
  projectId: string;

  @ApiProperty({ type: String, required: false })
  expenseId: string;

  @ApiProperty({ type: String, format: 'binary' })
  file: Express.Multer.File;
}

export class DownloadDocumentRequest {
  @ApiProperty({ type: String })
  docId: string;
}

export class ExpenseDocument {
  @ApiProperty({ type: String, required: false })
  _id: any;

  @ApiProperty({ type: Boolean })
  isQualified: boolean;

  @ApiProperty({ type: Number })
  amount: number;


  @ApiProperty({ type: String, required: false })
  docId: string;

  @ApiProperty({ type: Date, required: false })
  createdAt: Date;

  @ApiProperty({ type: Date, required: false })
  updatedAt: Date;
}

export class ProjectDocument {
  @ApiProperty({ type: String, required: false })
  _id: any;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: [ExpenseDocument] })
  expenses: Array<ExpenseDocument>;
}

export class FileInfo {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  id: string;
  filename: string;
  bucketName: string;
  chunkSize: number;
  size: number;
  uploadDate: string;
  contentType: string;
}

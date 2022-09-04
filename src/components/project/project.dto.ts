import { ApiProperty } from '@nestjs/swagger';

export class GetProjectsRequest {
  @ApiProperty({ type: Number })
  startPage: number;

  @ApiProperty({ type: Number })
  pageSize: number;
}

export class UploadDocumentRequest {
  @ApiProperty({ type: String })
  projectId: string;

  @ApiProperty({ type: String })
  expenseId: string;

  @ApiProperty({ type: String, format: 'binary' })
  file: Express.Multer.File;
}

export class DownloadDocumentRequest {
  @ApiProperty({ type: String })
  docId: string;
}

export class ExpenseDocument {
  @ApiProperty({ type: String })
  _id: any;

  @ApiProperty({ type: Boolean })
  isQualified: boolean;

  @ApiProperty({ type: Number })
  amount: number;

  @ApiProperty({ type: String })
  docId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}

export class ProjectDocument {
  @ApiProperty({ type: String })
  _id: any;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: [ExpenseDocument] })
  expenses: Array<ExpenseDocument>;
}

export class FileInfo {
  @ApiProperty({ type: String })
  fieldname: string;

  @ApiProperty({ type: String })
  originalname: string;

  @ApiProperty({ type: String })
  encoding: string;

  @ApiProperty({ type: String })
  mimetype: string;

  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  filename: string;

  @ApiProperty({ type: String })
  bucketName: string;

  @ApiProperty({ type: Number })
  chunkSize: number;

  @ApiProperty({ type: Number })
  size: number;

  @ApiProperty({ type: String })
  uploadDate: string;

  @ApiProperty({ type: String })
  contentType: string;
}

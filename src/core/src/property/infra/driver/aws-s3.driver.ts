import { S3 } from 'aws-sdk';
import {
  Driver,
  FileInput,
  FileOutput,
} from '../../domain/driver/driver-contracts';

export class AwsS3Driver implements Driver {
  private s3: S3;
  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async upload(file: FileInput, folder: string): Promise<FileOutput> {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${folder}/${file.filename}`,
      Body: await file.createReadStream(),
      ACL: 'public-read',
    };

    const { Location } = await this.s3.upload(params).promise();
    return {
      filename: file.filename,
      mimetype: file.mimetype,
      encoding: file.encoding,
      url: Location,
    };
  }

  async uploadMany(files: FileInput[], folder: string): Promise<FileOutput[]> {
    const urls = [];

    for (const file of files) {
      const url = await this.upload(file, folder);
      urls.push(url);
    }

    return urls;
  }

  async getUrl(id: string, folder?: string): Promise<string> {
    return `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${folder}/${id}`;
  }

  async delete(id: string, folder?: string): Promise<void> {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${folder}/${id}`,
    };

    await this.s3.deleteObject(params).promise();
  }
}

import { configEnv } from '#shared/infra';
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
      accessKeyId: configEnv.cloud.accessKeyId,
      secretAccessKey: configEnv.cloud.secretAccessKey,
      region: configEnv.cloud.vendor !== 'LOCALSTACK' && configEnv.cloud.region,
      s3ForcePathStyle: configEnv.cloud.vendor === 'LOCALSTACK',
      endpoint: configEnv.cloud.endpoint,
    });
  }

  async upload(file: FileInput, folder: string): Promise<FileOutput> {
    const { Location } = await this.s3
      .upload({
        Bucket: configEnv.storage.bucket,
        Key: `${folder}/${file.filename}`,
        Body: file.createReadStream(),
        ACL: 'public-read',
      })
      .promise();
    console.log(Location);
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

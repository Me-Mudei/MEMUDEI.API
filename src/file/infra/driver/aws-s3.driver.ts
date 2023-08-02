import { S3 } from "@aws-sdk/client-s3";
import { configEnv } from "#shared/infra";
import { nanoid } from "nanoid";

import {
  Driver,
  FileInput,
  FileOutput
} from "../../domain/driver/driver-contracts";

export class AwsS3Driver implements Driver {
  private s3: S3;
  constructor() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: configEnv.cloud.accessKeyId,
        secretAccessKey: configEnv.cloud.secretAccessKey
      },
      //forcePathStyle: configEnv.cloud.vendor === "LOCALSTACK",
      region: configEnv.cloud.region
      /* endpoint:
        configEnv.cloud.vendor === "LOCALSTACK"
          ? configEnv.cloud.endpoint
          : undefined */
    });
  }

  async upload(file: FileInput, folder: string): Promise<FileOutput> {
    const hash = nanoid();
    const fileName = `${folder}/${hash}-${file.filename}`;
    await this.s3.putObject({
      Bucket: configEnv.storage.bucket,
      Key: fileName,
      Body: file.createReadStream(),
      ACL: "public-read"
    });
    const url =
      configEnv.cloud.vendor === "LOCALSTACK"
        ? `${configEnv.cloud.endpoint}/${configEnv.storage.bucket}/${fileName}`
        : `https://${configEnv.storage.bucket}.s3.${configEnv.cloud.region}.amazonaws.com/${fileName}`;
    return {
      filename: file.filename,
      mimetype: file.mimetype,
      url
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
    await this.s3.deleteObject({
      Bucket: process.env.AWS_BUCKET,
      Key: `${folder}/${id}`
    });
  }
}

import { Driver, FileInput } from '#property/domain';
import { configEnv } from '#shared/infra';
import { createReadStream } from 'fs';
import { AwsS3Driver } from './aws-s3.driver';

describe('AwsS3Driver Unit tests', () => {
  let driver: Driver;

  beforeEach(() => {
    driver = new AwsS3Driver();
  });
  it('should upload file test', async () => {
    const file: FileInput = {
      filename: 'upload-file-test.txt',
      mimetype: 'text/plain',
      encoding: '7bit',
      createReadStream: () =>
        createReadStream(`${__dirname}/upload-file-test.txt`),
    };
    const res = await driver.upload(file, 'uploads');
    expect(res).toEqual({
      filename: file.filename,
      mimetype: file.mimetype,
      encoding: file.encoding,
      url: `${configEnv.cloud.endpoint}/${configEnv.storage.bucket}/uploads/${file.filename}`,
    });
  });
});

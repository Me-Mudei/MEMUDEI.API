import { createReadStream } from 'fs';
import { Driver, FileInput } from '../../domain/driver/driver-contracts';
import { InMemoryDriver } from './in-memory.driver';

describe('InMemoryDriver Unit tests', () => {
  let driver: Driver;

  beforeEach(() => {
    driver = new InMemoryDriver();
  });
  it('should upload file test', async () => {
    const file: FileInput = {
      filename: 'upload-file-test.txt',
      mimetype: 'text/plain',
      createReadStream: () =>
        createReadStream(`${__dirname}/upload-file-test.txt`),
    };
    const res = await driver.upload(file, 'uploads');
    expect(res).toEqual({
      filename: file.filename,
      mimetype: file.mimetype,
      url: `${__dirname}/tmp/uploads/${file.filename}`,
    });
  });
});

import { configEnv } from "#shared/infra";
import { createReadStream } from "fs";

import { Driver, FileInput } from "../../domain";

import { AwsS3Driver } from "./aws-s3.driver";

describe("AwsS3Driver Unit tests", () => {
  let driver: Driver;

  beforeEach(() => {
    driver = new AwsS3Driver();
  });
  it("should upload file test", async () => {
    const file: FileInput = {
      filename: "upload-file-test.txt",
      mimetype: "text/plain",
      createReadStream: () =>
        createReadStream(`${__dirname}/upload-file-test.txt`)
    };
    const res = await driver.upload(file, "uploads");
    expect(res).toEqual({
      filename: file.filename,
      mimetype: file.mimetype,
      url: `${configEnv.cloud.endpoint}/${configEnv.storage.bucket}/uploads/${file.filename}`
    });
  });
});

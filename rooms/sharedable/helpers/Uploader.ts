import { PutObjectCommand, S3Client, PutObjectCommandOutput, PutObjectAclCommandInput } from '@aws-sdk/client-s3';

const client = new S3Client({
  endpoint: 'https://fra1.digitaloceanspaces.com',
  forcePathStyle: false,
  region: 'eu-central-1',
  credentials: {
    accessKeyId: process.env.CDN_ACCESS_KEY,
    secretAccessKey: process.env.CDN_SECRET_ACCESS_KEY,
  },
});

export default class {
  static async send({ Key, Body }: { Key: string; Body: Uint8Array }): Promise<PutObjectCommandOutput | undefined> {
    try {
      const params = {
        Bucket: 'haxtube',
        ACL: 'public-read',
        Key: Key,
        Body: Body,
      };
      //@ts-ignore
      const object = new PutObjectCommand(params);

      const data = await client.send(object);

      return data;
    } catch (err) {
      console.log(err);

      return undefined;
    }
  }
}

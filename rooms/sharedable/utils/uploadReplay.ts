import Uploader from '@sharedable/helpers/Uploader';

export default async (buffer: Uint8Array) => {
  const Key = `replays/${Date.now()}-rs.hbr2`;

  const response = await Uploader.send({ Key, Body: buffer });

  const success = response?.$metadata?.httpStatusCode == 200;

  const replayUrl = success ? `https://www.haxball.com/replay?v=3#https://cdn.haxtube.com/${Key}` : 'Upload error';

  return replayUrl;
};

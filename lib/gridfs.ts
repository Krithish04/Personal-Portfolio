import mongoose from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";
import { connectDB } from "./db";
import { Readable } from "stream";

export async function getGridFSBucket(bucketName = "uploads"): Promise<GridFSBucket> {
  await connectDB();
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("MongoDB database instance not connected");
  }
  return new GridFSBucket(db, { bucketName });
}

export async function uploadToGridFS(
  buffer: Buffer,
  filename: string,
  contentType: string,
  bucketName = "uploads"
): Promise<string> {
  const bucket = await getGridFSBucket(bucketName);
  const stream = Readable.from(buffer);
  const uploadStream = bucket.openUploadStream(filename, {
    metadata: { contentType },
  });

  return new Promise((resolve, reject) => {
    stream
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", () => {
        resolve(uploadStream.id.toString());
      });
  });
}

export async function downloadFromGridFS(
  fileId: string,
  bucketName = "uploads"
): Promise<{
  stream: Readable;
  filename: string;
  contentType: string;
  length: number;
} | null> {
  const bucket = await getGridFSBucket(bucketName);
  let id: ObjectId;
  try {
    id = new ObjectId(fileId);
  } catch {
    return null;
  }

  const files = await bucket.find({ _id: id }).toArray();
  if (!files || files.length === 0) {
    return null;
  }

  const fileDoc = files[0];
  const stream = bucket.openDownloadStream(id);
  const metadata = fileDoc.metadata as { contentType?: string } | undefined;

  return {
    stream: stream as unknown as Readable,
    filename: fileDoc.filename,
    contentType: metadata?.contentType || "application/octet-stream",
    length: fileDoc.length,
  };
}

export async function deleteFromGridFS(fileId: string, bucketName = "uploads"): Promise<boolean> {
  try {
    const bucket = await getGridFSBucket(bucketName);
    const id = new ObjectId(fileId);
    await bucket.delete(id);
    return true;
  } catch (err) {
    console.error("Error deleting from GridFS:", err);
    return false;
  }
}

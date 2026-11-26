import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Post } from "@/models";
import PostForm from "../PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  await connectDB();
  const post = await Post.findById(params.id).lean();
  if (!post) notFound();

  const plainData = JSON.parse(JSON.stringify(post));
  return <PostForm initialData={plainData} isNew={false} />;
}

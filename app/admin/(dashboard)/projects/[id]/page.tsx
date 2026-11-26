import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Project } from "@/models";
import ProjectForm from "../ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  await connectDB();
  const project = await Project.findById(params.id).lean();
  if (!project) notFound();

  // Convert MongoDB document to plain JSON object
  const plainData = JSON.parse(JSON.stringify(project));

  return <ProjectForm initialData={plainData} isNew={false} />;
}

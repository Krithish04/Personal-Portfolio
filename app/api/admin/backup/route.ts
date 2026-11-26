import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import {
  Profile,
  Project,
  Post,
  Experience,
  Education,
  SkillGroup,
  FeatureFlag,
} from "@/models";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const [profile, projects, posts, experiences, educations, skills, flags] =
    await Promise.all([
      Profile.find().lean(),
      Project.find().lean(),
      Post.find().lean(),
      Experience.find().lean(),
      Education.find().lean(),
      SkillGroup.find().lean(),
      FeatureFlag.find().lean(),
    ]);

  const backupData = {
    exportedAt: new Date().toISOString(),
    version: "2.0",
    data: {
      profile,
      projects,
      posts,
      experiences,
      educations,
      skills,
      flags,
    },
  };

  return new NextResponse(JSON.stringify(backupData, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="portfolio_backup.json"',
    },
  });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    if (!body?.data) {
      return NextResponse.json({ error: "Invalid backup format" }, { status: 400 });
    }

    await connectDB();
    const { profile, projects, posts, experiences, educations, skills, flags } = body.data;

    if (Array.isArray(profile) && profile.length > 0) {
      await Profile.deleteMany({});
      await Profile.insertMany(profile);
    }
    if (Array.isArray(projects) && projects.length > 0) {
      await Project.deleteMany({});
      await Project.insertMany(projects);
    }
    if (Array.isArray(posts) && posts.length > 0) {
      await Post.deleteMany({});
      await Post.insertMany(posts);
    }
    if (Array.isArray(experiences) && experiences.length > 0) {
      await Experience.deleteMany({});
      await Experience.insertMany(experiences);
    }
    if (Array.isArray(educations) && educations.length > 0) {
      await Education.deleteMany({});
      await Education.insertMany(educations);
    }
    if (Array.isArray(skills) && skills.length > 0) {
      await SkillGroup.deleteMany({});
      await SkillGroup.insertMany(skills);
    }
    if (Array.isArray(flags) && flags.length > 0) {
      await FeatureFlag.deleteMany({});
      await FeatureFlag.insertMany(flags);
    }

    return NextResponse.json({ success: true, message: "Backup imported successfully." });
  } catch (err) {
    console.error("Backup import error:", err);
    return NextResponse.json({ error: "Failed to import backup data." }, { status: 500 });
  }
}

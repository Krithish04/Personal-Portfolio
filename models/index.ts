import mongoose, { Schema, Document, Model } from "mongoose";

// Profile Model (Singleton)
export interface IProfile extends Document {
  name: string;
  tagline: string;
  eyebrow?: string;
  intro: string;
  heroIntro?: string;
  aboutMarkdown?: string;
  contactBlurb?: string;
  email: string;
  phone: string;
  socials: { platform: string; url: string }[];
  portraitFileId?: string;
  metaDescription: string;
  footerText: string;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    eyebrow: { type: String, default: "FULL-STACK DEVELOPER & DEVOPS INTERN" },
    intro: { type: String, required: true },
    heroIntro: { type: String, default: "" },
    aboutMarkdown: { type: String, default: "" },
    contactBlurb: { type: String, default: "" },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    socials: [{ platform: String, url: String }],
    portraitFileId: { type: String },
    metaDescription: { type: String, default: "" },
    footerText: { type: String, default: "" },
  },
  { timestamps: true }
);

// Project Model
export interface IProject extends Document {
  title: string;
  slug: string;
  subtitle: string;
  summary: string;
  bodyMarkdown: string;
  deployment?: string;
  role: string;
  timeframe: string;
  tech: string[];
  links: { repo?: string; demo?: string };
  images: { fileId: string; alt: string }[];
  flowNodes: string[];
  featured: boolean;
  order: number;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String, default: "" },
    summary: { type: String, required: true },
    bodyMarkdown: { type: String, default: "" },
    deployment: { type: String, default: "" },
    role: { type: String, default: "Full-Stack Developer" },
    timeframe: { type: String, default: "" },
    tech: [{ type: String }],
    links: {
      repo: { type: String, default: "" },
      demo: { type: String, default: "" },
    },
    images: [{ fileId: String, alt: String }],
    flowNodes: [{ type: String }],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "published" },
  },
  { timestamps: true }
);

// Post Model (Blog)
export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  bodyMarkdown: string;
  tags: string[];
  status: "draft" | "published";
  publishedAt?: Date;
  readingTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    bodyMarkdown: { type: String, required: true },
    tags: [{ type: String }],
    status: { type: String, enum: ["draft", "published"], default: "published" },
    publishedAt: { type: Date, default: Date.now },
    readingTime: { type: String, default: "3 min read" },
  },
  { timestamps: true }
);

// Experience Model
export interface IExperience extends Document {
  role: string;
  org: string;
  location: string;
  date: string;
  bullets: string[];
  order: number;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    role: { type: String, required: true },
    org: { type: String, required: true },
    location: { type: String, default: "" },
    date: { type: String, required: true },
    bullets: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Education Model
export interface IEducation extends Document {
  school: string;
  degree: string;
  location: string;
  date: string;
  order: number;
}

const EducationSchema = new Schema<IEducation>(
  {
    school: { type: String, required: true },
    degree: { type: String, required: true },
    location: { type: String, default: "" },
    date: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// SkillGroup Model
export interface ISkillGroup extends Document {
  title: string;
  items: string[];
  order: number;
}

const SkillGroupSchema = new Schema<ISkillGroup>(
  {
    title: { type: String, required: true },
    items: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Resume Model
export interface IResume extends Document {
  fileId: string;
  originalName: string;
  size: number;
  uploadedAt: Date;
  active: boolean;
}

const ResumeSchema = new Schema<IResume>({
  fileId: { type: String, required: true },
  originalName: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
});

// Message Model (Contact inbox)
export interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  read: boolean;
  archived: boolean;
  ipHash?: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
    ipHash: { type: String },
  },
  { timestamps: true }
);

// FeatureFlag Model
export interface IFeatureFlag extends Document {
  key: string;
  enabled: boolean;
  updatedAt: Date;
}

const FeatureFlagSchema = new Schema<IFeatureFlag>(
  {
    key: { type: String, required: true, unique: true },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// PageView Model (Privacy-Friendly Analytics)
export interface IPageView extends Document {
  path: string;
  referrerHost?: string;
  device?: string;
  browser?: string;
  country?: string;
  visitorHash?: string;
  createdAt: Date;
}

const PageViewSchema = new Schema<IPageView>({
  path: { type: String, required: true },
  referrerHost: { type: String },
  device: { type: String },
  browser: { type: String },
  country: { type: String },
  visitorHash: { type: String },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 395 }, // 13 months TTL
});

// Event Model (e.g. resume download, contact submit)
export interface IEvent extends Document {
  type: string;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>({
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Media Model
export interface IMedia extends Document {
  fileId: string;
  filename: string;
  mime: string;
  size: number;
  alt: string;
  createdAt: Date;
}

const MediaSchema = new Schema<IMedia>({
  fileId: { type: String, required: true },
  filename: { type: String, required: true },
  mime: { type: String, required: true },
  size: { type: Number, required: true },
  alt: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

// Avoid Model re-compilation errors during Next.js hot reload
export const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export const Experience: Model<IExperience> =
  mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);

export const Education: Model<IEducation> =
  mongoose.models.Education ||
  mongoose.model<IEducation>("Education", EducationSchema);

export const SkillGroup: Model<ISkillGroup> =
  mongoose.models.SkillGroup ||
  mongoose.model<ISkillGroup>("SkillGroup", SkillGroupSchema);

export const Resume: Model<IResume> =
  mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);

export const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export const FeatureFlag: Model<IFeatureFlag> =
  mongoose.models.FeatureFlag ||
  mongoose.model<IFeatureFlag>("FeatureFlag", FeatureFlagSchema);

export const PageView: Model<IPageView> =
  mongoose.models.PageView ||
  mongoose.model<IPageView>("PageView", PageViewSchema);

export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export const Media: Model<IMedia> =
  mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);

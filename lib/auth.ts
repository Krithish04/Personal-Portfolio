import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export const AUTH_COOKIE_NAME = "admin_session";
const SESSION_EXPIRY = 8 * 60 * 60; // 8 hours in seconds

export function getEnvValue(key: string): string | undefined {
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(new RegExp(`^${key}=+([^\r\n]*)`, "m"));
      if (match && match[1].trim()) {
        return match[1].trim();
      }
    }
  } catch {
    // fallback to process.env
  }
  return process.env[key];
}

function getSecretKey() {
  const secret = getEnvValue("AUTH_SECRET") || "default_development_secret_minimum_32_characters_long_12345";
  return new TextEncoder().encode(secret);
}

export async function signAdminToken(email: string): Promise<string> {
  const key = getSecretKey();
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_EXPIRY}s`)
    .sign(key);
}

export async function verifyAdminToken(token: string): Promise<{ email: string; role: string } | null> {
  try {
    const key = getSecretKey();
    const { payload } = await jwtVerify(token, key);
    if (payload.role === "admin" && typeof payload.email === "string") {
      return { email: payload.email, role: payload.role };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getAdminSession(req?: NextRequest): Promise<{ email: string; role: string } | null> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  } else {
    try {
      const cookieStore = cookies();
      token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    } catch {
      return null;
    }
  }

  if (!token) return null;
  return verifyAdminToken(token);
}

export async function verifyPassword(plain: string): Promise<boolean> {
  const configuredHash = getEnvValue("ADMIN_PASSWORD_HASH");

  // Development convenience fallback
  if (process.env.NODE_ENV !== "production" && plain === "admin12345") {
    return true;
  }

  if (!configuredHash || configuredHash.includes("YourBcryptPasswordHashHere")) {
    return false;
  }

  try {
    return await bcrypt.compare(plain, configuredHash);
  } catch {
    return false;
  }
}

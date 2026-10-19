"use server";

import { checkPassword, createSession, destroySession, isAuthed } from "@/lib/auth";
import { listPostFiles, readPostFile, saveAsset, savePostFile, SLUG_RE } from "@/lib/content-store";
import { redirect } from "next/navigation";

async function requireAuth() {
  if (!(await isAuthed())) throw new Error("Not signed in");
}

export async function login(_: string | null, form: FormData): Promise<string | null> {
  const password = String(form.get("password") ?? "");
  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return "Wrong password.";
  }
  await createSession();
  redirect("/write");
}

export async function logout() {
  await destroySession();
  redirect("/write");
}

export async function listPosts() {
  await requireAuth();
  return (await listPostFiles()).sort();
}

export async function loadPost(slug: string) {
  await requireAuth();
  return readPostFile(slug);
}

export async function publishPost(input: { slug: string; raw: string; sha?: string; isNew: boolean }) {
  await requireAuth();
  if (!SLUG_RE.test(input.slug)) return { ok: false as const, error: "Slug must be lowercase-kebab-case." };
  if (input.raw.length > 400_000) return { ok: false as const, error: "Post is too large." };
  try {
    if (input.isNew && (await readPostFile(input.slug))) {
      return { ok: false as const, error: `A post called "${input.slug}" already exists.` };
    }
    const res = await savePostFile(input.slug, input.raw, input.sha, input.isNew);
    return { ok: true as const, url: res.url, sha: res.sha };
  } catch (e) {
    return { ok: false as const, error: (e as Error).message };
  }
}

export async function uploadAsset(input: { slug: string; filename: string; base64: string }) {
  await requireAuth();
  if (input.base64.length > 6_000_000) return { ok: false as const, error: "Max upload size is ~4.5 MB." };
  try {
    const res = await saveAsset(input.slug, input.filename, input.base64);
    return { ok: true as const, path: res.publicPath };
  } catch (e) {
    return { ok: false as const, error: (e as Error).message };
  }
}

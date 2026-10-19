import { allPosts, type Post } from "content-collections";

export type { Post };

const byDate = (a: Post, b: Post) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

/** Published posts, newest first. */
export function getPosts(): Post[] {
  return allPosts.filter((p) => !p.draft).sort(byDate);
}

/** Featured posts in rank order (featured: 1 first), then the rest by date. */
export function getRankedPosts(): Post[] {
  return [...getPosts()].sort((a, b) => {
    const ra = a.featured ?? Number.POSITIVE_INFINITY;
    const rb = b.featured ?? Number.POSITIVE_INFINITY;
    return ra === rb ? byDate(a, b) : ra - rb;
  });
}

export function getPost(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getAllTags(posts: Post[] = getPosts()) {
  const counts = new Map<string, number>();
  for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag, count]) => ({ tag, count }));
}

export function postNumber(post: Post) {
  const ordered = [...getPosts()].reverse();
  return ordered.findIndex((p) => p.slug === post.slug) + 1;
}

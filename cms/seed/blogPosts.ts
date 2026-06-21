import type { Payload } from "payload";
import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";
import { clearCollection, isCollectionEmpty } from "./_utils";

type BlogPostSource = { title: string; category: string; excerpt: string };

export async function seedBlogPosts(
  payload: Payload,
  { reset = false }: { reset?: boolean } = {},
): Promise<void> {
  const slug = "blog-posts";

  if (reset) {
    await clearCollection(payload, slug);
  } else if (!(await isCollectionEmpty(payload, slug))) {
    return;
  }

  const trPosts = (trMessages.blog as { posts: Record<string, BlogPostSource> })
    .posts;
  const enPosts = (enMessages.blog as { posts: Record<string, BlogPostSource> })
    .posts;

  for (const [i, [postSlug, trPost]] of Object.entries(trPosts).entries()) {
    const enPost = enPosts[postSlug];

    const doc = await payload.create({
      collection: "blog-posts",
      locale: "tr",
      data: {
        order: i,
        slug: postSlug,
        title: trPost.title,
        category: trPost.category,
        excerpt: trPost.excerpt,
        readingMinutes: 5,
        publishedAt: new Date(Date.now() - i * 7 * 86400000).toISOString(),
      },
    });

    if (enPost) {
      await payload.update({
        collection: "blog-posts",
        id: doc.id,
        locale: "en",
        data: {
          title: enPost.title,
          category: enPost.category,
          excerpt: enPost.excerpt,
        },
      });
    }
  }
}

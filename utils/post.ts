import { extract } from "https://deno.land/std@0.186.0/front_matter/any.ts";

export interface Post {
  id: string;
  title: string;
  publishedAt: Date;
  description: string;
  author: string;
  content: string;
}

export async function loadPost(id: string): Promise<Post | null> {
  let text: string;
  try {
    text = await Deno.readTextFile(`./data/posts/${id}.md`);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return null;
    }
    throw err;
  }

  const { attrs, body } = extract(text);
  const params = attrs as Record<string, string>;

  return {
    id: id,
    title: params.title,
    publishedAt: new Date(params.publishedAt),
    description: params.description,
    author: params.author,
    content: body,
  };
}

export async function listPosts(): Promise<Post[] | null> {
  const promises = [];
  for await (const file of Deno.readDir("./data/posts")) {
    if (!(file.isFile)) {
      continue;
    }
    const id = file.name.slice(0, -3);
    promises.push(await loadPost(id));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => {
    return b.publishedAt.getTime() - a.publishedAt.getTime();
  });
  return posts;
}

import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { tw } from "https://esm.sh/twind@0.16.19";
import { listPosts, Post } from "../utils/post.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    if (!posts) {
      return ctx.render();
    }
    return ctx.render(posts);
  },
};

export default function Home(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <h1 class={tw`text-8xl font-bold mt-12 mb-12`}>Wonky blog</h1>
      <ul>
        {posts.map((post) => {
          return <PostEntry post={post} />;
        })}
      </ul>
    </div>
  );
}

function PostEntry(props: { post: Post }) {
  const post = props.post;
  return (
    <li class={tw`border-t text-2xl pt-2 mb-4 flex flex-row`}>
      <span class={tw`text-gray-600 mr-4`}>
        {post.publishedAt.toLocaleDateString()}
      </span>
      <div class={tw`flex flex-col`}>
        <a class={tw`text-5xl mb-4 hover:underline`} href={`/blog/${post.id}`}>
          {post.title}
        </a>
        <p class={tw`text-gray-700`}>{post.description}</p>
      </div>
    </li>
  );
}

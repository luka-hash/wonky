import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { CSS, render } from "https://deno.land/x/gfm@0.2.2/mod.ts";
import { tw } from "https://esm.sh/twind@0.16.19";
import Back from "../../islands/back.tsx";
import { loadPost, Post } from "../../utils/post.ts";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const post = await loadPost(id);
    if (!post) {
      return new Response("page not found", { status: 404 });
    }
    return ctx.render(post);
  },
};

export default function BlogPostPage(props: PageProps) {
  const post = props.data;
  const content = render(post.content);
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <div class={tw`mt-8`}>
        <Back />
        {/* meta */}
        <h1 class={tw`text-3xl mb-3`}>{post.title}</h1>
        <span class={tw`text-gray-600`}>
          Published at{" "}
          <em>{post.publishedAt.toLocaleDateString()} by {post.author}</em>
        </span>
      </div>
      <style dangerouslySetInnerHTML={{ __html: CSS }}></style>
      <div
        class={tw`mt-8` + " markdown-body"}
        dangerouslySetInnerHTML={{ __html: content }}
      >
      </div>
    </div>
  );
}

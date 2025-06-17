import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupCardType } from "@/components/StartupCardType";

export const experimental_ppr = true;

<style>
  {`
  #fancy-box {
    position: relative;
  }

  #fancy-box::before {
    content: '';
    position: absolute;
    top: 0.5rem; /* top-2 */
    left: 0.5rem; /* left-2 */
    border-top: 10px solid black;
    border-right: 10px solid transparent;
  }

  #fancy-box::after {
    content: '';
    position: absolute;
    bottom: 0.5rem; /* bottom-2 */
    right: 0.5rem; /* right-2 */
    border-bottom: 10px solid black;
    border-left: 10px solid transparent;
  }
`}
</style>;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  
  const [post, {select: editorPosts} ] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: "editor-picks",}),
  ])
  
  const md = markdownit();
  const parsedContent = md.render(post?.pitch || "");

  if (!post) return notFound();

  return (
    <>
      <section
        style={{
          backgroundImage: `linear-gradient(
      to right,
      transparent 49.5%,
      rgba(251, 232, 67, 0.2) 49.5%,
      rgba(251, 232, 67, 0.6) 50.5%,
      transparent 50.5%
    )`,
          backgroundSize: "5% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-x",
        }}
        className=" w-full bg-[#EE2B69] min-h-[230px] pattern flex justify-center items-center flex-col py-10 px-6 "
      >
        <p
          id="fancy-box"
          className="bg-[#FBE843] px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative tag-tri"
        >
          {formatDate(post?._createdAt)}
        </p>
        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          {post.title}
        </h1>
        <p className="font-medium text-[20px] text-white max-w-5xl text-center break-words;">
          {post.description}
        </p>
      </section>

      <section className=" px-6 py-10 max-w-7xl mx-auto">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y- mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-center gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="font-medium text-[20px] text-black">
                  {post.author.name}
                </p>
                <p className="font-medium text-[16px] text-slate-800">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full">
              {post.category}
            </p>
          </div>
          <h3 className=" text-[30px] font-bold text-black">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="text-black-100 text-sm font-normal">
              No Details Provided
            </p>
          )}
        </div>
        <hr className=" border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />
        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="font-semibold text-[30px] text-black">Editor Picks</p>

            <ul className="mt-7 grid sm:grid-cols-2 gap-5">
              {editorPosts.map((post: StartupCardType, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense
          fallback={
            <Skeleton className="bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />
          }
        >
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;

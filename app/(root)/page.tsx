import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCardType";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = {search : query || null}
  const session = await auth()
  console.log(session?.id)
  
  const POSTS = await client.fetch(STARTUPS_QUERY, params)

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
        className="w-full bg-[#EE2B69] min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6;"
      >
        <h1 className="heading">
          Pitch Your Startup <br /> Connect With Entrepreneurs{" "}
        </h1>
        <p className="font-medium text-[20px] text-white max-w-3xl text-center break-words">
          Submit ideas, Vote on Pitches, and Get Noticed in Virtual
          Competetions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        <p className="font-extrabold text-[30px] text-black">
          {query ? `Search Results for ${query}` : "All Startups"}
        </p>

        <ul className="mt-7  grid md:grid-cols-3 sm:grid-cols-2 gap-5">
          {POSTS ?. length > 0 ?  (
            POSTS.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post}/>
            ))
          ): (
            <p className=" text-black-100 text-sm font-normal">No Posts Of Such Found</p>
          ) 
        }
      
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}

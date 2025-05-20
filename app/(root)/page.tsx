import PostCard from "@/components/PostCard";
import SearchForm from "../../components/SearchForm";
import { STARTUP_QUERY } from "@/sanity/lib/query";
import { StartupType } from "@/components/PostCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = (await searchParams).query;

  //const posts = await client.fetch(STARTUP_QUERY);
  const { data: posts } = await sanityFetch({
    query: STARTUP_QUERY,
    params: { search: params || null },
  });

  return (
    <>
      <section className="mx-auto">
        <div className="pink_container">
          <div className="heading">IdeaShare</div>
          <div className="subheading">Share and explore startup ideas</div>
          <SearchForm query={params} />
        </div>
      </section>
      <section className="w-[70%] mx-auto">
        <div className="text-3xl font-semibold my-4">
          {params ? `Search result for '${params}'` : "All posts"}
        </div>
        <ul className="startup_card_grid">
          {posts?.length > 0 &&
            posts.map((post: StartupType) => (
              <PostCard key={post._id} post={post} />
            ))}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}

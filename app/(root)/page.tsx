import PostCard from "@/components/PostCard";
import SearchForm from "../../components/SearchForm";
import { STARTUP_QUERY } from "@/sanity/lib/query";
import { StartupType } from "@/components/PostCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { Separator } from "@/components/ui/separator";

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
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            IdeaShare
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover, share, and collaborate on innovative startup ideas.
            Connect with entrepreneurs and bring your vision to life.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <SearchForm query={params} />
          </div>
        </div>
      </section>
      <Separator className="max-w-7xl mx-auto my-8" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {params ? `Search result for '${params}'` : "All posts"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.length > 0 &&
            posts.map((post: StartupType) => (
              <PostCard key={post._id} post={post} />
            ))}
        </div>
      </section>
      <SanityLive />
    </>
  );
}

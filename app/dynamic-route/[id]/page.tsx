// app/users/[id]/page.tsx (server-side)
import { unstable_cache } from 'next/cache';
import getUserById from "@/lib/db";

export default async function Page({ params }: { params: { id: string } }) {
  // Create a cache per user ID to avoid caching the wrong data
  const getUser = unstable_cache(
    async (id: string) => {
      const user = await getUserById(id);
      return user;
    },
    [params.id], // Cache key is the user ID
    { revalidate: 3600, tags: ['user'] } // Cache for 1 hour
  );

  // Fetch the user data from cache or DB
  const user = await getUser(params.id);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// app/users/[id]/page.tsx (server-side)
import { getUserById } from '@/database/getUsers';
import { unstable_cache } from 'next/cache';


export default async function Page({ params }: { params: { id: any } }) {
  // Create a cache per user ID to avoid caching the wrong data
  const getUser = unstable_cache(
    async (id: number) => {
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
      <h1>{user.username}</h1>
      <p>{user.email}</p>
    </div>
  );
}

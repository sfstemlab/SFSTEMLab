"use client"
import { useParams } from 'next/navigation';

const dummyPosts = [
  { slug: 'first-post', title: 'First Post', content: 'This is the content of the first post.' },
  { slug: 'second-post', title: 'Second Post', content: 'This is the content of the second post.' },
  { slug: 'third-post', title: 'Third Post', content: 'This is the content of the third post.' },
];

export default function Page() {
  const { slug } = useParams();
  const post = dummyPosts.find(post => post.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

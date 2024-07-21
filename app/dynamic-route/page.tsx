import Link from 'next/link';

const dummyPosts = [
  { slug: 'first-post', title: 'First Post', content: 'This is the content of the first post.' },
  { slug: 'second-post', title: 'Second Post', content: 'This is the content of the second post.' },
  { slug: 'third-post', title: 'Third Post', content: 'This is the content of the third post.' },
];

const PostList = () => {
  return (
    <div>
      {dummyPosts.map((post) => (
        <div key={post.slug}>
          <Link href={`/dynamic-route/${post.slug}`}>
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;

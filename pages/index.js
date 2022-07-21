import Head from 'next/head'
import { fetchContent } from '../utils/contentful'
import Link from 'next/link';
import Post from '../components/Post';

export default function Home({ posts }) {
  return (
    <div className="flex flex-row justify-center items-center h-screen w-screen">
      <Head>
        <title>Bloggerfy</title>
        <meta name="NextJS Blog with Contentful" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="container" className="flex flex-col p-10 items-center">
        <h1>Welcome to my Blog!</h1>
        <p>Sample blog in NextJS and Contentful using GraphQL API</p>
        <ul className="flex flex-col gap-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
              <Post 
                date={post.publishDate}
              />
            </li>
          ))}
        </ul>
      </div>      
      <footer>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetchContent(`
    query myQuery {
      blogPostCollection (order: publishDate_DESC, limit: 5) {
        items {
          title
          slug
          heroImage {
            url
          }
          publishDate
          author {
            name
          }
          body {
            json
          }
          tags
        }
      }
    }
  `);
  return {
    props: {
      posts: response.blogPostCollection.items,
    }
  }
}
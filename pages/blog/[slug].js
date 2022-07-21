import { fetchContent } from '../../utils/contentful'
import Post from '../../components/Post'
import Link from 'next/link';

export default function SinglePage({ posts }) {
    const singlePost = posts[0];
    return (
        <div id="container" className="flex flex-row justify-center">
            <div className="flex flex-col w-4/5 md:w-3/4 lg:w-1/2">
                <Link href={`/`}>
                    <a>Back to Home</a>
                </Link>
                <Post 
                    title={singlePost.title}
                    date={singlePost.publishDate}
                    image={singlePost.heroImage.url}
                    alt={singlePost.title}
                    author={singlePost.author.name}
                    tags={singlePost.tags}
                    body={singlePost.body.json}
                />
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const response = await fetchContent(`
        query myQuery {
            blogPostCollection {
                items {
                slug
                }
            }
        }
    `);

    const paths = response.blogPostCollection.items.map(( slug ) => {
        return {
            params: slug,
        }
    })
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const response = await fetchContent(`
        query myQueryPosts {
            blogPostCollection(where: {slug: "${params.slug}"}) {
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
        `,
    );
        return {
            props: {
                posts: response.blogPostCollection.items,
        }
    }
}
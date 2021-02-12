import { getAllPosts } from '../lib/api'
import Link from 'next/link'
import Layout from '../components/Layout.js'

export default function IndexPage({ allPosts }) {
  return (
    <>
      <Layout />
      <main className="max-w-4xl md:flex md:flex-col md:items-center">
        <section className="flex-1 p-8 text-2xl leading-normal">
          <h1 className="mb-4 text-4xl lg:text-5xl">RTFM</h1>
          {allPosts.map((post) => (
            <article key={post.slug}>
              <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                <a className="flex flex-col justify-between p-2 -mx-2 rounded-md md:flex-row focus:ring focus:ring-gray-300 focus:outline-none">
                  <h2 className="text-lg hover:underline md:text-xl">
                  {post.title}
                  </h2>
                  <time dateTime={post.date} className="text-base leading-8 text-left text-gray-600 cursor-default md:text-right md:mb-0 md:ml-16">{post.date}</time>
                </a>
              </Link>
            </article>
          ))}
        </section>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'slug',
    'date'
  ])

  return {
    props: { allPosts },
  }
}
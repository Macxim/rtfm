import { getAllPosts } from '../lib/api'
import Link from 'next/link'
import Layout from '../components/Layout.js'

export default function IndexPage({ allPosts }) {
  return (
    <>
      <Layout />
      <main className="flex flex-col items-center max-w-4xl">
        <section className="flex-1 p-8 text-2xl leading-normal">
        <h1 className="mb-4 text-4xl lg:text-5xl">RTFM</h1>

        <ul className="space-y-3">
          {allPosts.map((post) => (
            <li key={post.slug}>
              <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                <a className="p-2 -mx-2 flex flex-col md:flex-row justify-between focus:ring focus:ring-gray-300 focus:outline-none rounded-md">
                  <h4 className="hover:underline text-lg md:text-xl">
                  {post.title}
                  </h4>
                  <p className="cursor-default leading-8 text-base text-gray-600 text-left md:text-right md:mb-0 md:ml-16">{post.date}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>

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
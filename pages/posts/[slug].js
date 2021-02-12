import { getPostBySlug, getAllPosts } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import Layout from '../../components/Layout.js'

export default function Post({ post }) {
  const meta = {
    title: `RTFM - ${post.title}`,
    description: post.description,
  }

  return (
    <>
      <Layout meta={meta} />
      <main className="flex flex-col items-center max-w-4xl">
        <article className="flex-1 p-8 text-2xl leading-normal">
          <header>
            <h1 className="mb-4 text-4xl lg:text-5xl">{post.title}</h1>
            <p className={post.date}></p>
          </header>
          <div className="prose-xl" dangerouslySetInnerHTML={{ __html: post.content }}/>
        </article>
      </main>
    </>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'description'
  ])
  const content = await markdownToHtml(post.content || '')
  

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

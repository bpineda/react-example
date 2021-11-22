import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export async function getStaticProps() {

  const res = await fetch('https://api.github.com/users/bpineda/repos')
  const github_repos = await res.json()

  if (!github_repos) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      github_repos
    }, // will be passed to the page component as props
  }
}

export default function Home({ github_repos }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Github Repos</h2>
        <ul className={utilStyles.list}>
          {github_repos.map(({ id, name, description, html_url }) => (
            <li className={utilStyles.listItem} key={id}>
              <h4>{name}</h4>

              <a href={html_url} target="_blank">{html_url}</a>
            </li>
          ))}
        </ul>
      </section>

    </Layout>
  )
}

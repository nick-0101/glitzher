import Head from 'next/head';

import imageUrlBuilder from '@sanity/image-url';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home({ posts }) {
  const router = useRouter();
  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: 'oanpf4cr',
        dataset: 'production',
      });

      setMappedPosts(
        posts.map((p) => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          };
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);

  return (
    <div>
      <Head>
        <title>Blog - Glitzher</title>
        <meta charSet='utf-8' />
        <link rel='icon' type='image/png' href='/blog/../images/logo.webp' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='keywords'
          content='makeup, cosmetics, canada, blog, beauty'
        />
        <meta name='theme-color' content='#EE4444' />
        <meta
          name='description'
          content='Discover the Glitzher blog. Here we write about cosmetic reviews, beauty tips and tricks and the best product deals.'
        />
        <link rel='apple-touch-icon' href='/blog/../images/logo.webp' />
      </Head>

      <div>
        <h1>Welcome to Glitzher blog</h1>

        <h3>Recent posts: </h3>

        <div>
          {mappedPosts.length ? (
            mappedPosts.map((p, index) => (
              <div
                onClick={() => router.push(`/post/${p.slug.current}`)}
                key={index}
              >
                <h3>{p.title}</h3>
                <img src={p.mainImage} />
              </div>
            ))
          ) : (
            <>No Posts Yet</>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (pageContext) => {
  // Sanity query string to return the post that equals the pageSlug
  const query = encodeURIComponent('*[ _type == "post"]');

  // Fetch blog from url & parse it
  const url = `https://oanpf4cr.api.sanity.io/v2021-03-25/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  // Return data
  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      },
    };
  } else {
    return {
      props: {
        posts: result.result,
      },
    };
  }
};

// Nextjs & React
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Dependencies
import imageUrlBuilder from '@sanity/image-url';
import Truncate from 'react-truncate';

// Components
import FrontpageSkeleton from '../components/FrontpageSkeleton';

import favico from '../public/favicon.ico';

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
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='shortcut icon' href={favico} />
        <meta
          name='keywords'
          content='makeup, cosmetics, canada, blog, beauty'
        />
        <meta name='theme-color' content='#EE4444' />
        <meta
          name='description'
          content='Discover the Glitzher blog. Here we write about cosmetic reviews, beauty tips and tricks and the best product deals.'
        />
      </Head>

      {posts ? (
        <>
          <div>
            <div className='font-gilroy text-5xl text-gray-800 my-12 text-center md:text-left'>
              Glitzher Blog
            </div>

            <div
              className='grid gap-8 grid-cols-1 lg:grid-cols-3 md:grid-cols-3
          sm:grid-cols-2'
            >
              {mappedPosts.length ? (
                mappedPosts.map((p, index) => (
                  <article
                    className='flex flex-col justify-center md:block sm:block cursor-pointer group'
                    onClick={() => router.push(`/post/${p.slug.current}`)}
                    key={index}
                  >
                    {/* Image */}
                    <div className='bg-white'>
                      <img
                        className='z-0 group-hover:opacity-75 transform group-hover:scale-105 transition duration-300 ease-in-out'
                        alt={p.title + 'article image'}
                        src={'' + p.mainImage + ''}
                      />
                    </div>

                    {/* Date Published */}
                    <div className='my-2 text-gray-500 uppercase'>
                      {new Date(p.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>

                    {/* Title of Article */}
                    <div className='font-medium text-xl text-gray-900 group-hover:text-red-500'>
                      {p.title}
                    </div>

                    {/* Text Summary */}
                    <div className='mt-2 text-gray-700'>
                      <Truncate lines={2} ellipsis={<span>...</span>}>
                        {p.body[0].children[0].text}
                      </Truncate>
                    </div>
                  </article>
                ))
              ) : (
                <>No Posts Yet</>
              )}
            </div>
          </div>
        </>
      ) : (
        <FrontpageSkeleton />
      )}
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

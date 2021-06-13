// Nextjs & Reactjs
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Dependencies
import Truncate from 'react-truncate';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

// Components & styles
import PostSkeleton from '../../components/PostSkeleton';
import block from '../../styles/Post.module.css';

export const Post = ({ post, filterArticles }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState('');
  const [relatedArticleUrl, setRelatedArticleUrl] = useState('');

  const relatedArticleImage = filterArticles || undefined;

  useEffect(() => {
    // Create imgbuilder object with provided info
    const imgBuilder = imageUrlBuilder({
      projectId: 'oanpf4cr',
      dataset: 'production',
    });

    // Set image to state
    setImageUrl(imgBuilder.image(post.mainImage));

    // Set related article image to state
    if (relatedArticleImage == undefined) {
      setRelatedArticleUrl('');
    } else {
      setRelatedArticleUrl(imgBuilder.image(relatedArticleImage.mainImage));
    }
  }, [post.mainImage, relatedArticleImage]);

  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#EE4444' />
      </Head>

      {post && filterArticles ? (
        <>
          <div className='max-w-5xl mx-auto my-12 sm:px-6'>
            {/* Breadcrumbs */}
            <ol className='list-reset flex text-gray-700 my-8 text-sm'>
              <li>
                <Link href='https://glitzher.com'>
                  <a className='font-semibold uppercase'>Home</a>
                </Link>
              </li>
              <li>
                <span className='mx-2 font-semibold uppercase'>/</span>
              </li>
              <li>
                <Link href='https://glitzher.com/blog'>
                  <a className='font-semibold uppercase'>Blog</a>
                </Link>
              </li>
              <li>
                <span className='mx-2 font-semibold uppercase'>/</span>
              </li>
              <li className='uppercase'>post</li>
              <li>
                <span className='mx-2 font-semibold uppercase'>/</span>
              </li>
              <li className='uppercase truncate overflow-ellipsis overflow-hidden'>
                {post.slug.current.replace(/-/g, ' ')}
              </li>
            </ol>

            {/* Date Published */}
            <div className='font-semibold text-gray-500 uppercase'>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>

            {/* Title */}
            <div className='font-medium text-4xl font-bold text-gray-900'>
              {post.title}
            </div>

            {/* Author */}
            <div className='flex mt-2 font-medium mb-4 text-lg text-gray-900'>
              By <div className='ml-1 text-red-500'>Glitzher</div>
            </div>

            {/* Image */}
            {imageUrl && (
              <img
                className='z-0 transform group-hover:scale-110 transition duration-300 ease-in-out'
                src={imageUrl}
                alt={post.title + 'article image'}
              />
            )}

            {/* Article */}
            <article className={block.body}>
              <BlockContent blocks={post.body} />
            </article>

            {/* Related Article */}
            <div>
              {filterArticles ? (
                <>
                  {/* Other Articles */}
                  <div className='font-medium text-4xl mt-20 mb-6 font-bold text-gray-900'>
                    Related Articles
                  </div>

                  <div
                    className='flex flex-col justify-center md:block sm:block cursor-pointer group'
                    onClick={() =>
                      router.push(`/post/${filterArticles.slug.current}`)
                    }
                  >
                    {/* Image */}
                    {imageUrl && (
                      <img
                        className='z-0'
                        alt={filterArticles.title + 'article image'}
                        src={'' + relatedArticleUrl + ''}
                      />
                    )}

                    {/* Title of Article */}
                    <div className='font-medium text-xl my-1 text-gray-900 group-hover:text-red-500'>
                      {filterArticles.title}
                    </div>

                    {/* Text Summary */}
                    <div className='mt-1 text-gray-700'>
                      <Truncate lines={2} ellipsis={<span>...</span>}>
                        {filterArticles.body[0].children[0].text}...
                      </Truncate>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <PostSkeleton />
      )}
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  // Get the page slug from the url
  const pageSlug = pageContext.query.slug;

  // If not page slug, display 404
  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  // Sanity query string to return the post that equals the pageSlug
  const query = encodeURIComponent(
    `*[ _type == "post" && slug.current == "${pageSlug}"]`
  );

  // Fetch blog from url & parse it
  const url = `https://oanpf4cr.api.sanity.io/v2021-03-25/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  // Get the category reference
  const category = post.categories[0]._ref;

  // Fetch Related Articles
  const relatedArticlesQuery = await encodeURIComponent(
    `*[_type == "post" && categories[0]._ref == "${category}"]`
  );

  // Fetch blog from url & parse it
  const relatedArticlesUrl = `https://oanpf4cr.api.sanity.io/v2021-03-25/data/query/production?query=${relatedArticlesQuery}`;
  const articlesResult = await fetch(relatedArticlesUrl).then((res) =>
    res.json()
  );
  const articles = articlesResult.result;

  // Filter out current post
  const filterArticles =
    articles.filter((item) => {
      if (item.slug.current !== pageSlug) return item;
    })[0] || null;

  if (!post) {
    // Return data
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        post,
        filterArticles,
      },
    };
  }
};

export default Post;

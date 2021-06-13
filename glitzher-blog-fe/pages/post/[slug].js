import { useState, useEffect } from 'react';
import Link from 'next/link';
import block from '../../styles/Post.module.css';

// Sanity
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

export const Post = ({ post }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Create imgbuilder object with provided info
    const imgBuilder = imageUrlBuilder({
      projectId: 'oanpf4cr',
      dataset: 'production',
    });

    // Set image to state
    setImageUrl(imgBuilder.image(post.mainImage));
  }, [post.mainImage]);
  return (
    <div>
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
          <li className='uppercase'>
            {post.slug.current.replaceAll('-', ' ')}
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
        {/* {imageUrl && <img className={styles.mainImage} src={imageUrl} />} */}

        {/* Article */}
        <article className={block.body}>
          <BlockContent blocks={post.body} />
        </article>
      </div>
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
    `*[ _type == "post" && slug.current == "${pageSlug}" ]`
  );

  // Fetch blog from url & parse it
  const url = `https://oanpf4cr.api.sanity.io/v2021-03-25/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  // Return data
  if (!post) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        post: post,
      },
    };
  }
};

export default Post;

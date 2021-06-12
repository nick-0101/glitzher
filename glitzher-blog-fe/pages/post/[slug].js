import { useState, useEffect } from 'react';
import styles from '../../styles/Post.module.css';

// Sanity
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

export const Post = ({ title, body, image }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Create imgbuilder object with provided info
    const imgBuilder = imageUrlBuilder({
      projectId: 'oanpf4cr',
      dataset: 'production',
    });

    // Set image to state
    setImageUrl(imgBuilder.image(image));
  }, [image]);
  return (
    <div>
      <div className={styles.main}>
        <h1>{title}</h1>
        {imageUrl && <img className={styles.mainImage} src={imageUrl} />}

        <div className={styles.body}>
          <BlockContent blocks={body} />
        </div>
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
        body: post.body,
        title: post.title,
        image: post.mainImage,
      },
    };
  }
};

export default Post;

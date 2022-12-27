import PostContent from '../../components/posts/post-detail/post-content';
import {getPostData, getPostFiles} from '../../lib/posts-util';
import Head from 'next/head';

const PostDetailPage = (props) => {
  const post = props.postData;
  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{post.slug}</title>
        <meta name='description' content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
};
export default PostDetailPage;

export const getStaticProps = async (context) => {
  const {slug} = context.params;

  const postData = getPostData(slug);

  return {
    props: {postData},
    revalidate: 600,
  };
  // let data = null;
  // try {
  //   data = getPostData(slug);
  // } catch (err) {}
  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }
  // return {
  //   props: {
  //     postData: data,
  //   },
  // };
};

export const getStaticPaths = async () => {
  const postFilesnames = getPostFiles();
  const slugs = postFilesnames.map((posts) => posts.replace(/\.md$/, ''));
  const pathWithParams = slugs.map((slug) => ({params: {slug: slug}}));
  return {
    paths: pathWithParams,
    fallback: false,
  };
};

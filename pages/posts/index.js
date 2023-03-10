import AllPosts from '../../components/posts/all-posts';
import {getAllPosts} from '../../lib/posts-util';
import Head from 'next/head';

const AllPostPage = (props) => {
  const {allPosts} = props;
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts!'
        />
      </Head>
      <AllPosts posts={allPosts} />
    </>
  );
};
export default AllPostPage;

export const getStaticProps = async () => {
  const allPosts = getAllPosts();
  return {
    props: {allPosts},
  };
};

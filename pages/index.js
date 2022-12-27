import Head from 'next/head';
import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import {getFeaturedPosts} from '../lib/posts-util';

const HomePage = (props) => {
  const {featuredPosts} = props;
  return (
    <>
      <Head>
        <title>Tunde's Blog</title>
        <meta
          name='description'
          content='I post about programming and web development'
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </>
  );
};
export default HomePage;

export const getStaticProps = async () => {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {featuredPosts},
  };
};

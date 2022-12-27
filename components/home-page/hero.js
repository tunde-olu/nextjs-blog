import Image from 'next/image';
import classes from './hero.module.css';
// import tundeImage from "../../public/images/site/tunde.jpg";
import tundeImage from '../../images/tunde.jpg';

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.container}>
        <div className={classes.image}>
          <Image
            // src='/images/site/tunde.jpg'
            src={tundeImage}
            alt='Tunde'
            width={300}
            height={300}
          />
        </div>
        <h1>Hi, I'm Tunde</h1>
        <p>
          I blog about web development - especially frontend
          frameworks/libraries like React or NextJS
        </p>
      </div>
    </section>
  );
};
export default Hero;

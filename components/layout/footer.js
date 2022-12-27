import classes from './footer.module.css';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.container}>
        <p>&copy;{new Date().getFullYear()}</p>
        <span>Tunde's Next Blog</span>
        <p>All rights reserved</p>
      </div>
    </div>
  );
};
export default Footer;

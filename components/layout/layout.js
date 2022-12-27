import Footer from './footer';
import MainNavigation from './main-navigation';

const Layout = ({children}) => {
  return (
    <>
      <MainNavigation />
      <main style={{minHeight: '100vh'}}>{children}</main>
      <Footer />
    </>
  );
};
export default Layout;

import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className='page-container w-full'>
      <div className='content-wrap'>
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

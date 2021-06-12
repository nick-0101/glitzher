import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className='page-container w-full'>
      <div className='content-wrap'>
        <Navbar />
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

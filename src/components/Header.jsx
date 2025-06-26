import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-white shadow-md">
    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-gray-500 hover:text-green-500">
          Women
        </Link>
        <Link to="/" className="text-gray-500 hover:text-green-500">
          Men
        </Link>
        <Link to="/" className="text-gray-500 hover:text-green-500">
          Kids
        </Link>
      </div>
      <div className="text-2xl font-bold">
        <Link to="/">MyApp</Link>
      </div>
      <div className="flex items-center space-x-4">
        {/* Currency Switcher and Cart Icon will go here */}
        <Link to="/cart" className="text-gray-500 hover:text-green-500">
          Cart
        </Link>
      </div>
    </nav>
  </header>
);

export default Header; 
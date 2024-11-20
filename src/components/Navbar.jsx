import { Link } from 'react-router-dom';
import iconImage from '../../public/img/iconicHutao.png'; // Pastikan untuk mengganti dengan path gambar yang benar

const Navbar = () => {
  return (
    <nav className="bg-[#422006] p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Gambar icon di sebelah kiri sebagai pengganti Home */}
        <Link to="/">
          <img src={iconImage} alt="Home Icon" className="h-8 w-8" /> {/* Atur ukuran gambar sesuai kebutuhan */}
        </Link>

        {/* Link Login di sebelah kanan */}
        <Link to="/login" className="text-white ml-auto">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;

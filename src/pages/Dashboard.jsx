import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Dashboard = () => {
  const [galleries, setGalleries] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null); 
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const itemsPerPage = 5; // Batas data yang ditampilkan per halaman

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fileInputRef = useRef(null);


  const fetchGalleries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/galleries/my-galleries",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGalleries(response.data);
    } catch (error) {
      setError("Gagal memuat galeri.");
    }
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    if (!title || !description || !imageFile) {
      setError("Semua bidang harus diisi, termasuk file gambar!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", imageFile);

      const response = await axios.post(
        "http://localhost:5000/api/galleries",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setGalleries([...galleries, response.data.gallery]);
      resetForm();
    } catch (error) {
      setError("Gagal menambahkan galeri.");
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); 
  };

  const handleEditGallery = (gallery) => {
    setEditId(gallery.id);
    setTitle(gallery.title);
    setDescription(gallery.description);
  };

  const handleUpdateGallery = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Judul dan deskripsi harus diisi!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (imageFile) {
        formData.append("image", imageFile); // Hanya kirim file baru jika ada
      }

      const response = await axios.put(
        `http://localhost:5000/api/galleries/${editId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setGalleries(galleries.map(gallery => 
        gallery.id === editId ? response.data.gallery : gallery
      ));
      resetForm();
    } catch (error) {
      setError("Gagal memperbarui galeri.");
    }
  };

  const handleDeleteGallery = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus galeri ini?");
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/galleries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setGalleries(galleries.filter((gallery) => gallery.id !== id));
    } catch (error) {
      setError("Gagal menghapus galeri.");
    }
  };
  
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageFile(null);
    setEditId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  // Hitung jumlah halaman
  const totalPages = Math.ceil(galleries.length / itemsPerPage);

  // Data yang ditampilkan berdasarkan halaman saat ini
  const displayedGalleries = galleries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fungsi untuk navigasi halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Galeri Saya</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form
        onSubmit={editId ? handleUpdateGallery : handleAddGallery}
        className="mb-6 bg-white p-6 rounded-lg shadow-md"
      >
        {/* Form input galeri */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="title">
            Judul
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full py-2 px-3 bg-gray-50"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="description">
            Deskripsi
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full py-2 px-3 bg-gray-50"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="image">
            Unggah Gambar
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="border rounded w-full py-2 px-3 bg-gray-50"
            ref={fileInputRef} 
          />
        </div>
        <button
          type="submit"
          className="bg-[#c2410c] text-white py-2 rounded w-full hover:bg-orange-600"
        >
          {editId ? "Perbarui Galeri" : "Tambahkan Galeri"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Galeri Anda</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border px-4 py-2 text-left">Judul</th>
              <th className="border px-4 py-2 text-left">Deskripsi</th>
              <th className="border px-4 py-2 text-left">Gambar</th>
              <th className="border px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayedGalleries.map((gallery) => (
              <tr key={gallery.id}>
                <td className="border px-4 py-2">{gallery.title}</td>
                <td className="border px-4 py-2">{gallery.description}</td>
                <td className="border px-4 py-2">
                  <img
                    src={`http://localhost:5000/${gallery.image_url}`} 
                    alt={gallery.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditGallery(gallery)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteGallery(gallery.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-[#c2410c] text-white" : "bg-white text-[#c2410c]"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";

const GalleryPage = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/galleries", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setGalleries(response.data);
    } catch (error) {
      console.error("Failed to fetch galleries:", error);
    }
  };

  const handleDelete = async (galleryId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/admin/galleries/${galleryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Gallery deleted successfully:", response.data);
      alert("Gallery deleted successfully!");
      setGalleries(galleries.filter((gallery) => gallery.id !== galleryId));
    } catch (error) {
      console.error("Failed to delete gallery:", error.response?.data || error.message);
      alert(`Failed to delete gallery: ${error.response?.data?.message || error.message}`);
    }
  };
  

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gallery</h2>
      <div className="grid grid-cols-3 gap-4">
        {galleries.map((gallery) => (
          <div key={gallery.id} className="border p-4 rounded shadow">
            <img
              src={`http://localhost:5000/${gallery.image_url}`}
              alt={gallery.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <div className="flex flex-col items-center">
              <h3 className="font-bold">{gallery.title}</h3>
              <button
                onClick={() => handleDelete(gallery.id)}
                className="bg-red-500 text-white font-semibold px-4 py-1 mt-2 rounded hover:bg-blue-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;

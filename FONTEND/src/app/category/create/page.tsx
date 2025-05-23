"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../category.css";
import axios from "axios";

export default function CreateCategory() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    image: null as File | null,
  });
  const [previewImage, setPreviewImage] = useState<string>("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }
      
      await axios.post("http://localhost:5001/api/categories/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Tạo danh mục thành công!");
      router.push("/category");
      router.refresh();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi tạo danh mục";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ marginTop: '60px' }}
      />
    <div className="category-form-container">
      <div className="page-header">
        <Link href="/category" className="btn btn-secondary">
          <FaArrowLeft /> Quay lại
        </Link>
        <h1>Thêm Danh Mục Mới</h1>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="form">
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="name">Tên Danh Mục</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Nhập tên danh mục"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Hình Ảnh</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="form-control"
                accept="image/*"
                required
              />
              {previewImage && (
                <div className="mt-2">
                  <img src={previewImage} alt="Preview" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Tạo Danh Mục
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
} 
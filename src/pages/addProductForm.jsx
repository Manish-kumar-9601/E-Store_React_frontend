import React, { useContext, useState } from 'react';
import './addProductForm.css';
import { SellerContext } from '../context/sellerContext';

export const AddProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        material: '',
    });
    const [files, setFiles] = useState({
        thumbnail: null,
        images: []
    });
    const { state, dispatch } = useContext(SellerContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files: uploadedFiles } = e.target;
        if (!uploadedFiles || uploadedFiles.length === 0) return;

        if (name === 'thumbnail') {
            setFiles(prev => ({
                ...prev,
                thumbnail: uploadedFiles[0]
            }));
        } else if (name === 'images') {
            const fileArray = Array.from(uploadedFiles);
            
            if (fileArray.some(file => file.size > 5000000)) {
                alert('One or more image files are too large (max 5MB)');
                return;
            }

            setFiles(prev => ({
                ...prev,
                images: fileArray
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formDataToSend = new FormData();
            
            // Append text fields
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            // Append files
            if (files.thumbnail) {
                formDataToSend.append('thumbnail', files.thumbnail);
            }

            if (files.images.length > 0) {
                files.images.forEach(image => {
                    formDataToSend.append('images', image);
                });
            }

            const response = await fetch(import.meta.env.VITE_Add_PRODUCT_URL, {
                method: "POST",
                body: formDataToSend // Remove Content-Type header to let browser set it
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            if (result.message === 'Product added successfully') {
                alert('Product added successfully');
                // Reset form
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    material: '',
                });
                setFiles({
                    thumbnail: null,
                    images: []
                });
            } else {
                throw new Error(result.message || 'Failed to add product');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert(error.message || 'Failed to submit form');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>Product Form</h2>
            <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Price:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Category:</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Material:</label>
                <input type="text" name="material" value={formData.material} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Thumbnail:</label>
                <input 
                    type="file" 
                    name="thumbnail" 
                    onChange={handleFileChange} 
                    accept="image/*"
                    required 
                />
                {files.thumbnail && <p>Selected thumbnail: {files.thumbnail.name}</p>}
            </div>
            <div className="form-group">
                <label>Images:</label>
                <input 
                    type="file" 
                    name="images" 
                    onChange={handleFileChange} 
                    accept="image/*"
                    required 
                    multiple 
                />
                {files.images.length > 0 && (
                    <p>Selected {files.images.length} images</p>
                )}
            </div>

            <button 
                type="submit" 
                className="submit-button" 
                disabled={isLoading}
            >
                {isLoading ? 'Uploading...' : 'Submit'}
            </button>
        </form>
    );
}
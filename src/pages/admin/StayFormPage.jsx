import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StayForm from '../../admin/StayForm';
import toast from 'react-hot-toast';
import { URL } from '../../Common/api';

const defaultForm = {
    propertyName: '', propertyPhone: '', propertyEmail: '',
    maxGuests: 0, purchasePrice: 0, sellingPrice: 0,
    state: '', district: '', location: '', propertyDescription: '',
    amenities: [], googleMapsLink: '',
    mainImage: null,
    galleryImages: []
};

const StayFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState(defaultForm);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(isEditing);

    useEffect(() => {
        if (isEditing) {
            fetchStayDetails();
        }
    }, [id]);

    const fetchStayDetails = async () => {
        try {
            const res = await axios.get(`${URL}/admin/stays/${id}`, { withCredentials: true });
            if (res.data?.stay) {
                setFormData({
                    ...defaultForm,
                    ...res.data.stay
                });
            } else if (res.data) {
                setFormData({
                    ...defaultForm,
                    ...res.data
                });
            }
        } catch (err) {
            console.error("API Error fetching stay:", err);
            // Optional: Handle error or fallback
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => {
            const updated = { ...prev, [name]: type === 'number' ? Number(value) : value };
            if (name === 'state') updated.district = '';
            return updated;
        });
    };

    const handleAmenityToggle = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleMainImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, mainImage: e.target.files[0] }));
        }
    };

    const handleGalleryImagesChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setFormData(prev => ({ ...prev, galleryImages: [...prev.galleryImages, ...filesArray] }));
        }
    };

    const removeGalleryImage = (index) => {
        setFormData(prev => ({
            ...prev,
            galleryImages: prev.galleryImages.filter((_, i) => i !== index)
        }));
    };

    const handleFormSubmit = async (e) => {
        console.log("Consoled the handle form submit")
        e.preventDefault();

        const payload = new FormData();

        Object.keys(formData).forEach(key => {
            if (key === 'amenities') {
                payload.append('amenities', JSON.stringify(formData.amenities));
            } else if (key === 'mainImage') {
                if (formData.mainImage) payload.append('mainImage', formData.mainImage);
            } else if (key === 'galleryImages') {
                formData.galleryImages.forEach(file => payload.append('galleryImages', file));
            } else if (key !== 'images') {
                payload.append(key, formData[key] !== null ? formData[key] : '');
            }
        });

        const configMultiPart = {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        };

        try {
            setIsButtonLoading(true);
            if (isEditing) {
                await axios.put(`${URL}/admin/stays/${id}`, payload, configMultiPart);
                toast.success('Stay updated successfully!');
            } else {
                await axios.post(`${URL}/admin/stays`, payload, configMultiPart);
                toast.success('Stay added successfully!');
                navigate('/dashboard/stays');
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to sync with server!');
        } finally {
            setIsButtonLoading(false);
        }
    };

    // This handles the Cancel button click in StayForm
    const handleSetViewData = (view) => {
        if (view === 'list') {
            navigate('/dashboard/stays');
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 z-10 w-full">
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                    {isEditing ? `Edit Stay` : `Add New Stay`}
                </h1>
            </header>

            <div className="flex-1 overflow-y-auto p-8 relative w-full">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">Loading...</div>
                ) : (
                    <StayForm
                        isButtonLoading={isButtonLoading}
                        setButtonLoading={setIsButtonLoading}
                        formData={formData}
                        setViewData={handleSetViewData}
                        handleFormSubmit={handleFormSubmit}
                        handleFormChange={handleFormChange}
                        handleAmenityToggle={handleAmenityToggle}
                        handleMainImageChange={handleMainImageChange}
                        handleGalleryImagesChange={handleGalleryImagesChange}
                        removeGalleryImage={removeGalleryImage}
                        isEditing={isEditing}
                    />
                )}
            </div>
        </div>
    );
};

export default StayFormPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

import StaysList from '../../admin/StaysList';
import DeleteModal from '../../admin/DeleteModal';
import { URL } from '../../Common/api';

const StaysManagement = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Data States
    const [stays, setStays] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filters & Pagination derived from URL
    const filters = {
        search: searchParams.get('search') || '',
        state: searchParams.get('state') || '',
        district: searchParams.get('district') || '',
        propertyType: searchParams.get('propertyType') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || ''
    };
    const currentPage = parseInt(searchParams.get('page'), 10) || 1;

    const [totalPages, setTotalPages] = useState(1);
    const [totalStays, setTotalStays] = useState(0);
    const itemsPerPage = 15;

    const handleFilterChange = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        // Changing filters resets page to 1
        newParams.delete('page');
        setSearchParams(newParams, { replace: true });
    };

    const setCurrentPage = (updater) => {
        const newPage = typeof updater === 'function' ? updater(currentPage) : updater;
        const newParams = new URLSearchParams(searchParams);
        if (newPage > 1) {
            newParams.set('page', newPage);
        } else {
            newParams.delete('page');
        }
        setSearchParams(newParams, { replace: true });
    };

    // Delete Modal State
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });

    // Debounced Fetch depending on searchParams
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchStays();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchParams]);

    const fetchStays = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage,
                limit: itemsPerPage,
                ...(filters.search && { search: filters.search }),
                ...(filters.state && { state: filters.state }),
                ...(filters.district && { district: filters.district }),
                ...(filters.propertyType && { propertyType: filters.propertyType }),
                ...(filters.minPrice && { minPrice: filters.minPrice }),
                ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
            });
            const res = await axios.get(`${URL}/admin/stays?${params.toString()}`, { withCredentials: true });
            
            if (res.data?.stays) {
                setStays(res.data.stays);
                setTotalPages(res.data.totalPages || res.data.pagination?.totalPages || res.data.pages || 1);
                setTotalStays(res.data.totalStays || res.data.total || res.data.pagination?.totalItems || res.data.stays.length);
            } else if (Array.isArray(res.data)) {
                setStays(res.data);
                // If it's a raw array, backend isn't paginating it in an object wrapper. Check headers or just assume 1 page.
                const totalCountHeader = res.headers['x-total-count'];
                const total = totalCountHeader ? parseInt(totalCountHeader, 10) : res.data.length;
                setTotalStays(total);
                setTotalPages(Math.ceil(total / itemsPerPage) || 1);
            } else {
                setStays([]);
                setTotalStays(0);
            }
        } catch (err) {
            console.error("API Error - using dummy fallback:", err);
            setStays([
                {
                    _id: '1', propertyName: 'The Tall Trees', state: 'Kerala', district: 'Idukki', location: 'Munnar',
                    sellingPrice: 8699, maxGuests: 4, amenities: ['Free WiFi', 'Restaurant']
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddClick = () => {
        navigate('/dashboard/stays/add');
    };

    const handleEditClick = (stay) => {
        navigate(`/dashboard/stays/edit/${stay._id}`);
    };

    const handleDeleteClick = (stay) => {
        setDeleteModal({ isOpen: true, id: stay._id, name: stay.propertyName });
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${URL}/admin/stays/${deleteModal.id}`, { withCredentials: true });
            toast.success("Stay deleted successfully!");
            setStays(stays.filter(s => s._id !== deleteModal.id));
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to delete the stay.");
        } finally {
            setDeleteModal({ isOpen: false, id: null, name: '' });
        }
    };

    const handleViewClick = (stay) => {
        navigate(`/stays/${stay._id}`);
    };

    const handleCopyClick = (stay) => {
        navigator.clipboard.writeText(`https://tripscribe.in/stays/${stay._id}`);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between pl-16 pr-4 md:px-8 shrink-0 z-10 w-full">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 capitalize truncate max-w-[200px] md:max-w-none">
                    Manage Stays
                </h1>
                <button onClick={handleAddClick} className="flex items-center gap-2 bg-primary hover:bg-white border-[1.5px] border-primary text-white hover:text-black transition duration-200 px-6 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase shadow-sm">
                    <Plus size={18} strokeWidth={2.5} /> Add Stay
                </button>
            </header>

            <div className="flex-1 overflow-y-auto p-8 relative w-full">
                <StaysList
                    isLoading={isLoading}
                    filters={filters} handleFilterChange={handleFilterChange}
                    stays={stays} totalPages={totalPages}
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    totalStays={totalStays} itemsPerPage={itemsPerPage}
                    handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}
                    handleViewClick={handleViewClick} handleCopyClick={handleCopyClick}
                />
            </div>

            <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} confirmDelete={confirmDelete} />
        </div>
    );
};

export default StaysManagement;

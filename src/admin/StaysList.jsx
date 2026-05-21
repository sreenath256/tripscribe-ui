import React, { useState, useEffect } from 'react';
import { Search, MapPin, Users, Edit2, Trash2, ChevronLeft, ChevronRight, Eye, Copy, X, Filter } from 'lucide-react';
import { locationsData } from '../constants/locationData';
import toast from 'react-hot-toast';


const StaysList = ({
    isLoading, filters, handleFilterChange, stays, totalPages,
    currentPage, setCurrentPage, totalStays, itemsPerPage,
    handleEditClick, handleDeleteClick, handleViewClick, handleCopyClick
}) => {
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedStays, setSelectedStays] = useState([]);

    const handleCopyMultiple = () => {
        if (selectedStays.length === 0) {
            toast.error("Please select at least one stay to copy");
            return;
        }
        const links = selectedStays.map(id => `${window.location.origin}/stays/${id}`).join('\n');
        navigator.clipboard.writeText(links);
        toast.success(`Copied ${selectedStays.length} links!`);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isSelectionMode) {
                setIsSelectionMode(false);
                setSelectedStays([]);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSelectionMode]);

    return (
        <div className="flex flex-col">
            {/* Controls */}
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="relative w-full md:flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search property..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        />
                    </div>

                    <select
                        value={filters.propertyType}
                        onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                        className="w-full md:w-1/3 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm capitalize"
                    >
                        <option value="">All Property Types</option>
                        <option value="resort">Resort</option>
                        <option value="hotel">Hotel</option>
                        <option value="villa">Villa</option>
                        <option value="homestay">Homestay</option>
                        <option value="guest house">Guest House</option>
                    </select>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <input
                            type="number"
                            placeholder="Min ₹"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            className="w-full md:w-28 px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            type="number"
                            placeholder="Max ₹"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            className="w-full md:w-28 px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <select
                        value={filters.state}
                        onChange={(e) => {
                            handleFilterChange('state', e.target.value);
                            handleFilterChange('district', ''); // Reset district when state changes
                        }}
                        className="w-full md:w-1/4 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm capitalize"
                    >
                        <option value="">All States</option>
                        {Object.keys(locationsData).map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>

                    <select
                        value={filters.district}
                        onChange={(e) => handleFilterChange('district', e.target.value)}
                        disabled={!filters.state}
                        className="w-full md:w-1/4 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm capitalize disabled:bg-gray-50 disabled:text-gray-400"
                    >
                        <option value="">All Districts</option>
                        {filters.state && locationsData[filters.state]?.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* List Table/Cards */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                                <th 
                                    className="px-6 py-4 cursor-pointer select-none" 
                                    onDoubleClick={() => {
                                        setIsSelectionMode(!isSelectionMode);
                                        if (isSelectionMode) setSelectedStays([]);
                                    }}
                                    title="Double click to toggle selection mode"
                                >
                                    {isSelectionMode ? (
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={handleCopyMultiple}
                                                className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors bg-white border border-indigo-200 shadow-sm flex items-center justify-center"
                                                title="Copy Selected URLs"
                                            >
                                                <Copy size={16} />
                                            </button>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsSelectionMode(false);
                                                    setSelectedStays([]);
                                                }}
                                                className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors bg-white border border-gray-200 shadow-sm flex items-center justify-center"
                                                title="Done / Close"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        "No."
                                    )}
                                </th>
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Property</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Property Type</th>
                                <th className="px-6 py-4">Price (B2C)</th>
                                <th className="px-6 py-4">Guests</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                [...Array(15)].map((_, i) => (
                                    <tr key={`skeleton-${i}`} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-6"></div></td>
                                        <td className="px-6 py-4"><div className="h-14 w-20 bg-gray-200 rounded-lg"></div></td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                            <div className="h-3 bg-gray-200 rounded w-24"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                                            <div className="h-3 bg-gray-200 rounded w-32"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                                        </td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                        <td className="px-6 py-4 flex justify-end gap-2"><div className="h-8 bg-gray-200 rounded w-8"></div><div className="h-8 bg-gray-200 rounded w-8"></div></td>
                                    </tr>
                                ))
                            ) : stays.map((stay, index) => (
                                <tr 
                                    key={stay._id} 
                                    className="hover:bg-gray-50 transition-colors group cursor-default"
                                    onDoubleClick={() => {
                                        if (!isSelectionMode) {
                                            setIsSelectionMode(true);
                                            setSelectedStays([stay._id]);
                                        }
                                    }}
                                >
                                    <td className="px-6 py-4">
                                        {isSelectionMode ? (
                                            <input 
                                                type="checkbox" 
                                                checked={selectedStays.includes(stay._id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedStays(prev => [...prev, stay._id]);
                                                    } else {
                                                        setSelectedStays(prev => prev.filter(id => id !== stay._id));
                                                    }
                                                }}
                                                className="w-4 h-4 cursor-pointer text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                        ) : (
                                            ((currentPage - 1) * itemsPerPage) + index + 1
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {stay.mainImage ? <img src={typeof stay.mainImage === 'string' ? stay.mainImage : URL.createObjectURL(stay.mainImage)} className='w-20 h-14 rounded-lg object-cover' alt="" /> : <div className="w-20 h-14 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">No Img</div>}
                                    </td>

                                    <td className="px-6 py-4 capitalize">
                                        <div className="font-bold text-gray-900">{stay.propertyName}</div>
                                        <div className="text-sm text-gray-500">{stay.propertyPhone || 'No phone'}</div>
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 font-bold text-gray-900">
                                                <MapPin size={16} className="text-gray-400 shrink-0" />
                                                <span>{stay.state}</span>
                                            </div>
                                            <div className="text-sm text-gray-600 font-medium ml-5">
                                                {stay.district}, {stay.location}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 font-bold text-gray-900">
                                            {stay.propertyType}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">₹{stay.sellingPrice?.toLocaleString() || 0}</div>
                                        {stay.purchasePrice && <div className="text-xs text-gray-400">B2B: ₹{stay.purchasePrice.toLocaleString()}</div>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-gray-600">
                                            <Users size={16} className="text-gray-400" />
                                            Max {stay.maxGuests}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity">
                                            
                                            
                                            <button
                                                onClick={() => handleCopyClick(stay)}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                                                title="Copy"
                                            >
                                                <Copy size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleViewClick(stay)}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                                                title="View"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleEditClick(stay)}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                                                title="Edit"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(stay)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!isLoading && stays.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500 font-medium">
                                        No stays found. Try adjusting your filters or adding a new stay.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 px-2">
                <span className="text-sm text-gray-500 font-medium">
                    Showing {totalStays === 0 ? 0 : ((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalStays)} of {totalStays} entries
                </span>
                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="px-4 py-2 font-bold text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm">
                        {currentPage} {totalPages > 1 ? `/ ${totalPages}` : ''}
                    </div>
                    <button
                        disabled={currentPage >= totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaysList;

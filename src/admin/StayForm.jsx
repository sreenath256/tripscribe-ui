import React, { useRef } from 'react';
import { DollarSign, Users, Check, Map, Plus, X, Save, UploadCloud, Image as ImageIcon, Phone } from 'lucide-react';
import { locationsData } from '../constants/locationData';

const presetAmenities = [
    'free wifi', 'swimming pool', 'air conditioning', 'restaurant',
    'spa', 'gym', 'parking', 'room service', 'bar', 'pet friendly'
];


const StayForm = ({
    formData, setViewData, handleFormSubmit, handleFormChange,
    handleAmenityToggle, handleMainImageChange, handleGalleryImagesChange,
    removeGalleryImage, isEditing, isButtonLoading, setButtonLoading
}) => {
    const mainFileRef = useRef();
    const galleryFileRef = useRef();

    return (
        <div className=" pb-12">
            <form onSubmit={handleFormSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                    {/* Basic Info */}
                    <div className="md:col-span-2 pb-4 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Property Name *</label>
                        <input required type="text" name="propertyName" value={formData.propertyName || ''} onChange={handleFormChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold  text-gray-700 mb-1.5">State *</label>
                        <select required name="state" value={formData.state || ''} onChange={handleFormChange}
                            className="w-full px-4 py-3 border border-gray-200 capitalize rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white appearance-none cursor-pointer">
                            <option value="" disabled>Select a State</option>
                            {Object.keys(locationsData).map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">District *</label>
                            <select required name="district" value={formData.district || ''} onChange={handleFormChange} disabled={!formData.state}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl capitalize focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                <option value="" disabled>Select District</option>
                                {formData.state && locationsData[formData.state]?.map(district => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location/City *</label>
                            <input required type="text" name="location" value={formData.location || ''} onChange={handleFormChange} placeholder="e.g. Munnar Town"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Property Email</label>
                        <input type="email" name="propertyEmail" value={formData.propertyEmail || ''} onChange={handleFormChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Property Phone</label>
                            <input type="text" name="propertyPhone" value={formData.propertyPhone || ''} onChange={handleFormChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Alternative Phone</label>
                            <input type="text" name="alternativePhone" value={formData.alternativePhone || ''} onChange={handleFormChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Property Type</label>

                        <select name="propertyType" value={formData.propertyType || ''} onChange={handleFormChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white">
                            <option value="">Select Property Type</option>
                            <option value="resort">Resort</option>
                            <option value="hotel">Hotel</option>
                            <option value="villa">Villa</option>
                            <option value="homestay">Homestay</option>
                            <option value="guest house">Guest House</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Property Description *</label>
                        <textarea name="propertyDescription" value={formData.propertyDescription || ''} onChange={handleFormChange} rows="4"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white resize-none"></textarea>
                    </div>

                    {/* Pricing & Capacity */}
                    <div className="md:col-span-2 pt-6 pb-4 border-b border-gray-100 mt-2">
                        <h3 className="text-lg font-bold text-gray-900">Pricing & Capacity</h3>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Selling Price (B2C) ₹</label>
                        <div className="relative">
                            <input type="number" name="sellingPrice" value={formData.sellingPrice || ''} onChange={handleFormChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Purchase Price (B2B) ₹</label>
                            <div className="relative">
                                <input type="number" name="purchasePrice" value={formData.purchasePrice || ''} onChange={handleFormChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Max Guests</label>
                            <div className="relative">
                                <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="number" name="maxGuests" value={formData.maxGuests || ''} onChange={handleFormChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="md:col-span-2 pt-6 pb-4 border-b border-gray-100 mt-2">
                        <h3 className="text-lg font-bold text-gray-900">Amenities & Media</h3>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Amenities</label>
                        <div className="flex flex-wrap gap-3">
                            {presetAmenities.map(amenity => {
                                const isSelected = formData.amenities?.includes(amenity);
                                return (
                                    <button
                                        type="button"
                                        key={amenity}
                                        onClick={() => handleAmenityToggle(amenity)}
                                        className={`flex capitalize items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold transition-all ${isSelected
                                            ? 'bg-primary text-white border border-primary shadow-sm'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/50 hover:bg-primary/5'
                                            }`}
                                    >
                                        {isSelected && <Check size={14} strokeWidth={3} />}
                                        {amenity}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Google Maps URL</label>
                        <div className="relative">
                            <Map className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="text" name="googleMapsLink" value={formData.googleMapsLink || ''} onChange={handleFormChange} placeholder="https://maps.google.com/..."
                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
                        </div>
                    </div>

                    {/* Image Uploads */}
                    <div className="md:col-span-2 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Main Display Image */}
                            <div>
                                <label className="block  text-sm font-semibold text-gray-700 mb-2">Main Display Image *</label>
                                <div
                                    onClick={() => mainFileRef.current.click()}
                                    className={`border-2 border-dashed w-50 h-50  border-gray-300 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 hover:border-primary transition-colors h-40 relative overflow-hidden ${!formData.mainImage ? 'p-6' : 'p-1'}`}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={mainFileRef}
                                        className="hidden"
                                        onChange={handleMainImageChange}
                                        // required={!isEditing && !formData.mainImage}
                                    />
                                    {formData.mainImage ? (
                                        <div className="w-full h-full relative group rounded-xl overflow-hidden">
                                            <img 
                                                src={typeof formData.mainImage === 'string' ? formData.mainImage : URL.createObjectURL(formData.mainImage)} 
                                                className="w-full h-full object-cover bg-gray-100" 
                                                alt="Main display preview" 
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-sm">
                                                Click to Change Image
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-gray-500 flex flex-col items-center gap-2">
                                            <UploadCloud size={28} className="text-gray-400" />
                                            <span className="text-sm font-medium">Click to upload main image</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Gallery Images */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Gallery Photos (Multiple)</label>
                                <div
                                    onClick={() => galleryFileRef.current.click()}
                                    className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 hover:border-primary transition-colors h-40"
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        ref={galleryFileRef}
                                        className="hidden"
                                        onChange={handleGalleryImagesChange}
                                    />
                                    <div className="text-gray-500 flex flex-col items-center gap-2">
                                        <UploadCloud size={28} className="text-gray-400" />
                                        <span className="text-sm font-medium">Add gallery images</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gallery Previews */}
                        {formData.galleryImages?.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-4">
                                {formData.galleryImages.map((file, idx) => {
                                    const src = typeof file === 'string' ? file : URL.createObjectURL(file);
                                    return (
                                        <div key={idx} className="relative group w-24 h-24 sm:w-28 sm:h-28">
                                            <img src={src} className="w-full h-full object-cover rounded-xl border border-gray-200 shadow-sm bg-gray-50" alt={`Gallery ${idx + 1}`} />
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); removeGalleryImage(idx); }}
                                                className="absolute -top-2 -right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors opacity-0 group-hover:opacity-100 z-10"
                                                title="Remove image"
                                            >
                                                <X size={14} strokeWidth={3} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="md:col-span-2 flex items-center justify-end gap-4 pt-8 mt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => setViewData('list')}
                            className="px-8 py-3.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors uppercase tracking-wider"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isButtonLoading}
                            className="px-8 py-3.5 bg-primary hover:bg-white border-[1px] border-primary hover:border-primary text-white hover:text-black transition duration-200 rounded-full text-sm font-bold tracking-widest uppercase shadow-md flex items-center gap-2"
                        >
                            <Save size={18} />
                            {isButtonLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Stay'}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default StayForm;

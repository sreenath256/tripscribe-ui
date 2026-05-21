import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Users, Check, Share2, Heart, ArrowLeft, Star, Phone, Mail, Map, BadgeAlert, BadgeCheck, X, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { URL } from '../Common/api';

const StayDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stay, setStay] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [previewIdx, setPreviewIdx] = useState(null);

    const [bookingData, setBookingData] = useState({
        checkIn: null,
        checkOut: null,
        guests: 1
    });

    useEffect(() => {
        const fetchStay = async () => {
            try {
                const res = await axios.get(`${URL}/public/stays/${id}`);
                if (res.data?.stay) {
                    setStay(res.data.stay);
                } else {
                    setStay(res.data);
                }
            } catch (err) {
                console.error("Error fetching stay details:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStay();
    }, [id]);

    const handleWhatsAppRedirect = () => {
        if (!bookingData.checkIn || !bookingData.checkOut) {
            toast.error("Please select Check-in and Check-out dates");
            return;
        }

        if (bookingData.guests > (stay?.maxGuests || 99)) {
            toast.error(`Maximum allowed guests is ${stay.maxGuests}`);
            return;
        }

        // 3. Format the dates beautifully for the WhatsApp message
        const formattedCheckIn = format(bookingData.checkIn, 'dd MMM yyyy');
        const formattedCheckOut = format(bookingData.checkOut, 'dd MMM yyyy');

        const text = `Hello! I would like to inquire about booking *${stay.propertyName}*.\n\n` +
            `*Location:* ${stay.location}, ${stay.district}, ${stay.state}\n` +
            `*Check-in:* ${formattedCheckIn}\n` +
            `*Check-out:* ${formattedCheckOut}\n` +
            `*Number of Guests:* ${bookingData.guests}\n\n` +
            `Please let me know the availability!`;

        const phoneNumber = '8137099941';
        const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
        window.open(waLink, '_blank');
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
                await navigator.share({
                    title: stay.propertyName,
                    text: `Check out this amazing stay: ${stay.propertyName} in ${stay.location}`,
                    url: window.location.href,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            // Fallback: Copy to clipboard if Web Share API isn't supported
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    // Keyboard navigation for image preview
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (previewIdx === null) return;
            const images = [stay?.mainImage, ...(stay?.galleryImages || [])].filter(Boolean);
            if (e.key === 'ArrowRight') setPreviewIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            if (e.key === 'ArrowLeft') setPreviewIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            if (e.key === 'Escape') setPreviewIdx(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [previewIdx, stay]);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pt-32 min-h-screen">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
                    <div className="h-[400px] md:h-[500px] bg-gray-200 rounded-2xl mb-8"></div>
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-2/3">
                            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                        <div className="lg:w-1/3">
                            <div className="h-64 bg-gray-200 rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!stay) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Not Found</h2>
                    <p className="text-gray-500 mb-6">The property you are looking for does not exist or has been removed.</p>
                    <button
                        onClick={() => navigate('/shop')}
                        className="px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-black transition-colors"
                    >
                        Explore Stays
                    </button>
                </div>
            </div>
        );
    }

    const allImages = [stay.mainImage, ...(stay.galleryImages || [])].filter(Boolean);
    const mainImage = allImages[0] || 'https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=2000&auto=format&fit=crop';
    const gridImages = allImages.slice(1, 5);
    const remainingImagesCount = allImages.length - 5;

    return (
        <div className="bg-white min-h-screen pt-32 pb-20 relative">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="mb-6 animate-fade-in-up">

                    <div className="flex  md:flex-row md:items-start justify-between gap-4">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight capitalize w-full md:w-auto">
                                    {stay.propertyName}
                                </h1>
                                {stay.isActive ? (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center shrink-0 gap-1"><BadgeCheck size={14} /> Active</span>
                                ) : (
                                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center shrink-0 gap-1"><BadgeAlert size={14} /> Inactive</span>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600">

                                <div className="flex items-center gap-1.5 capitalize underline cursor-pointer">
                                    <MapPin size={16} className="text-gray-400" />
                                    {stay.location}, {stay.district}, {stay.state}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleShare}
                                className="flex items-center hover:cursor-pointer gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold text-gray-700"
                            >
                                <Share2 size={18} />
                                <span className="hidden sm:inline">Share</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Images Grid */}
                <div className="mb-10 w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>

                    {allImages.length > 1 ? (
                        <div className="flex w-full h-full gap-2">
                            <div className="w-full md:w-2/3 h-full relative cursor-pointer group" onClick={() => setPreviewIdx(0)}>
                                <img src={mainImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main property view" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                {/* Mobile View All Badge */}
                                <div className="md:hidden absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm font-semibold backdrop-blur-md shadow-md flex items-center gap-2 transition-transform hover:scale-105">
                                    <MapPin className="w-4 h-4" /> 1 / {allImages.length}
                                </div>
                            </div>
                            <div className="hidden md:grid w-1/3 grid-cols-2 grid-rows-2 gap-2 h-full">
                                {gridImages.map((img, idx) => {
                                    const isLastGridItem = idx === 3;
                                    const showOverlay = isLastGridItem && remainingImagesCount > 0;
                                    return (
                                        <div
                                            key={idx}
                                            className="w-full h-full relative cursor-pointer group overflow-hidden"
                                            onClick={() => setPreviewIdx(idx + 1)}
                                        >
                                            <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={`Gallery view ${idx}`} />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                            {showOverlay && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-colors hover:bg-black/40">
                                                    <span className="text-white text-3xl font-bold">+{remainingImagesCount}</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : allImages.length === 0 ? (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 font-semibold">No images available</span>
                        </div>
                    ) : (
                        <div className="w-full h-full relative group cursor-pointer" onClick={() => setPreviewIdx(0)}>
                            <img src={mainImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Property main view" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                        </div>
                    )}
                </div>

                {/* Content Split Layout */}
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content (Left) */}
                    <div className="lg:w-[65%] w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>

                        <div className="pb-8 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                                Entire {stay.propertyType} hosted by Tripscribe
                            </h2>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600">
                                <span>Max {stay.maxGuests} guests</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="capitalize">{stay.propertyType}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="capitalize">{stay.location}, {stay.district}</span>
                            </div>
                        </div>

                        {/* Description */}
                        {stay.propertyDescription && (
                            <div className="py-8 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">About this space</h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {stay.propertyDescription}
                                </p>
                            </div>
                        )}

                        {/* Amenities */}
                        {stay.amenities && stay.amenities.length > 0 && (
                            <div className="py-8 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">What this place offers</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                    {stay.amenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center gap-4 text-gray-700">
                                            <Check size={24} className="text-primary" />
                                            <span className="capitalize font-medium">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact & Map Info */}
                        {
                            stay.propertyDescription && (
                                <div className="py-8 border-b border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Property Details</h3>
                                    <div className="flex flex-col gap-4">
                                        {stay.propertyPhone && (
                                            <div className="flex items-center gap-3">
                                                <Phone className="text-primary" size={20} />
                                                <span className="font-medium text-gray-700">Call: {stay.propertyPhone}</span>
                                            </div>
                                        )}
                                        {stay.propertyEmail && (
                                            <div className="flex items-center gap-3">
                                                <Mail className="text-primary" size={20} />
                                                <span className="font-medium text-gray-700">Email: {stay.propertyEmail}</span>
                                            </div>
                                        )}
                                        {stay.googleMapsLink && (
                                            <div className="flex items-center gap-3">
                                                <Map className="text-primary" size={20} />
                                                <a href={stay.googleMapsLink} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:underline">
                                                    View on Google Maps
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }


                        {/* Pricing Details (B2B/B2C Display) */}
                        {/* <div className="py-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Pricing Breakdown</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {stay.sellingPrice && (
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        <div className="text-sm text-gray-500 font-semibold mb-1">Standard Price (B2C)</div>
                                        <div className="text-2xl font-black text-gray-900">₹{stay.sellingPrice.toLocaleString()}</div>
                                    </div>
                                )}
                                {stay.purchasePrice && (
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        <div className="text-sm text-gray-500 font-semibold mb-1">Agent Price (B2B/Purchase)</div>
                                        <div className="text-2xl font-black text-emerald-600">₹{stay.purchasePrice.toLocaleString()}</div>
                                    </div>
                                )}
                            </div>
                        </div> */}

                    </div>

                    {/* Booking Card (Right) */}
                    <div className="lg:w-[35%] w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl shadow-xl p-6 lg:p-7">

                            <div className="flex items-end gap-1 mb-6">
                                <span className="text-3xl font-black text-gray-900">Enquire Now</span>
                            </div>

                            {/* Booking Inputs */}
                            <div className="border border-gray-300 rounded-xl overflow-visible mb-4 flex flex-col z-50">
                                <div className="flex border-b border-gray-300">
                                    <div className="w-1/2 p-3 border-r border-gray-300 relative group" style={{ zIndex: 60 }}>
                                        <label htmlFor="checkIn" className="text-[10px] font-bold uppercase text-gray-900 mb-1 tracking-wider block cursor-pointer">Check-In</label>
                                        <DatePicker
                                            id="checkIn"
                                            selected={bookingData.checkIn}
                                            onChange={(date) => setBookingData(prev => ({ ...prev, checkIn: date }))}
                                            selectsStart
                                            startDate={bookingData.checkIn}
                                            endDate={bookingData.checkOut}
                                            minDate={new Date()}
                                            placeholderText="Add date"
                                            className="w-full text-sm text-gray-700 outline-none bg-transparent cursor-pointer m-0 p-0"
                                            dateFormat="dd MMM yyyy"
                                        />
                                    </div>
                                    <div className="w-1/2 p-3 relative group" style={{ zIndex: 60 }}>
                                        <label htmlFor="checkOut" className="text-[10px] font-bold uppercase text-gray-900 mb-1 tracking-wider block cursor-pointer">Check-Out</label>
                                        <DatePicker
                                            id="checkOut"
                                            selected={bookingData.checkOut}
                                            onChange={(date) => setBookingData(prev => ({ ...prev, checkOut: date }))}
                                            selectsEnd
                                            startDate={bookingData.checkIn}
                                            endDate={bookingData.checkOut}
                                            minDate={bookingData.checkIn || new Date()}
                                            placeholderText="Add date"
                                            className="w-full text-sm text-gray-700 outline-none bg-transparent cursor-pointer m-0 p-0"
                                            dateFormat="dd MMM yyyy"
                                        />
                                    </div>
                                </div>
                                <div className="w-full p-3 relative group">
                                    <label htmlFor="guests" className="text-[10px] font-bold uppercase text-gray-900 mb-1 tracking-wider block cursor-pointer">Guests</label>
                                    <div className="flex items-center justify-between">
                                        <input
                                            type="number"
                                            id="guests"
                                            value={bookingData.guests}
                                            onChange={(e) => setBookingData(prev => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
                                            min={1}
                                            max={stay.maxGuests}
                                            className="w-full text-sm text-gray-700 outline-none bg-transparent"
                                        />
                                        <Users size={16} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleWhatsAppRedirect}
                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
                            >
                                Send WhatsApp Enquiry
                            </button>

                            <div className="text-center mt-4">
                                <span className="text-sm text-gray-500">You won't be charged yet</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Custom Lightbox Image Preview Modal */}
            {previewIdx !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setPreviewIdx(null)}
                >
                    <button
                        className="absolute top-6 right-6 lg:right-10 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/40 hover:bg-black/80 rounded-full"
                        onClick={(e) => { e.stopPropagation(); setPreviewIdx(null); }}
                    >
                        <X size={28} />
                    </button>

                    <div className="relative w-full max-w-6xl flex items-center justify-center gap-4">
                        <button
                            className="absolute left-0 lg:-left-12 z-50 p-3 text-white/70 bg-black/40 hover:bg-black/80 hover:text-white rounded-full transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setPreviewIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
                            }}
                        >
                            <ChevronLeft size={32} />
                        </button>

                        <img
                            src={allImages[previewIdx]}
                            className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl"
                            alt={`Preview ${previewIdx}`}
                            onClick={e => e.stopPropagation()}
                        />

                        <button
                            className="absolute right-0 lg:-right-12 z-50 p-3 text-white/70 bg-black/40 hover:bg-black/80 hover:text-white rounded-full transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setPreviewIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
                            }}
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>

                    <div className="absolute bottom-6 bg-black/50 px-4 py-2 rounded-full text-white text-sm font-semibold tracking-wider">
                        {previewIdx + 1} / {allImages.length}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StayDetails;

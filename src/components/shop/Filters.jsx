import { IoMdClose } from "react-icons/io"

const Filters = () => {
    return (
        <div className="w-[300px] md:w-[350px] shrink-0 h-screen  border-gray-100 pr-8 overflow-y-auto pb-20">
            <div className="p-2">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-black">Filters</h2>
                    <button className="text-sm font-medium bg-primary text-white rounded-full p-2 transition-colors hover:cursor-pointer">
                        <IoMdClose size={18} />
                    </button>
                </div>

                {/* Price Range */}
                <div className="mb-10">
                    <h3 className="text-lg font-bold text-black mb-4">Price Range</h3>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col w-full">
                            <label className="text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Min Price</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                                <input type="number" placeholder="0" className="w-full border-[1.5px] border-gray-200 rounded-lg pl-8 pr-2 py-2.5 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-gray-50" />
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Max Price</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                                <input type="number" placeholder="50000" className="w-full border-[1.5px] border-gray-200 rounded-lg pl-8 pr-2 py-2.5 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-gray-50" />
                            </div>
                        </div>
                    </div>
                    <input type="range" className="w-full mt-6 accent-primary h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>

                {/* Property Type */}
                <div className="mb-10">
                    <h3 className="text-lg font-bold text-black mb-4">Property Type</h3>
                    <div className="space-y-3.5">
                        {['Resorts', 'Hotels', 'Villas', 'Homestays', 'Guest Houses'].map((type) => (
                            <label key={type} className="flex items-center gap-3.5 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer transition-all" />
                                <span className="text-gray-700 group-hover:text-primary font-medium transition-colors text-base">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button className="w-full hover:bg-primary border-[1px] border-primary text-primary hover:text-white transition duration-200 px-6 py-4 rounded-full text-xs font-bold tracking-widest uppercase mt-4 shadow-sm hover:shadow-md">
                    Apply Filters
                </button>
            </div>
        </div>
    )
}

export default Filters
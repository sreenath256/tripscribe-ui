import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchBar = ({ onSearch, initialQuery = '' }) => {
    const [query, setQuery] = useState(initialQuery);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center w-full max-w-[800px] bg-[#fdfdfd] border-[1.5px] border-gray-200 rounded-full p-1.5 shadow-sm"
        >
            {/* Search Icon */}
            <div className="pl-4 pr-3 text-primary ">
                <Search size={24} strokeWidth={1.5} />
            </div>

            {/* Input Field */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations..."
                className="flex-1 bg-transparent text-black text-lg outline-none placeholder:text-gray-400 min-w-0"
            />

            {/* Search Button */}
            <Link to={'/contact'} className="bg-primary hover:bg-white border-[1px] border-primary hover:border-[1px] border-primary text-white hover:text-black transition duration-200 text-black px-10 py-4 rounded-full text-xs font-medium tracking-widest  uppercase">
                Contact Us
            </Link>
        </form>
    );
};

export default SearchBar;

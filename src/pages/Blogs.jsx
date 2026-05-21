import { useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPublicBlogs } from "../redux/actions/public/blogActions";

const Blogs = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { blogs, loading, error, pagination } = useSelector((state) => state.publicBlogs);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(getPublicBlogs({ page: currentPage, limit: 16 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Set your maximum character limit here
  const DESCRIPTION_LIMIT = 60;


  const getVisiblePages = (current, total) => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, 4, '...', total];
    if (current >= total - 2) return [1, '...', total - 3, total - 2, total - 1, total];
    return [1, '...', current - 1, current, current + 1, '...', total];
  };


  return (
    <>
      <article>
        <title>Best Travel Agency in Kerala | Tours and Travels in Kerala | TripScribe</title>
        <meta name="description" content="Looking for the Best Travel Agency in Kerala? Experience professional Tours and Travels in Kerala with TripScribe, where every journey is carefully planned for comfort, value, and unforgettable memories." />
        <link rel="canonical" href="https://www.tripscribe.in/blogs" />
      </article>

      <section className="w-full bg-white">
        <div className="relative w-full h-[40vh] xl:h-[65vh] overflow-hidden">
          {/* --- Background Image --- */}
          <div className="absolute inset-0">
            <img
              src="https://pub-62402169c2254f3abe230b603d266ac9.r2.dev/woman-walking-railay-beach-krabi-thailand.webp"
              alt="Traveler looking at ancient temples"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* --- Content Container --- */}
          <div className="relative z-10 w-11/12 mx-auto h-full  flex flex-col justify-center">
            {/* Breadcrumb / Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-fit pt-20 xl:pt-40"
            >
              <div className="inline-flex uppercase items-center gap-3 px-5 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] md:text-xs tracking-wider transition-colors hover:bg-white/30 cursor-pointer">
                <span>Home</span>
                <div className="w-[1px] h-3 bg-gray-300"></div>
                <span>Blogs</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 text-3xl md:text-6xl font-messiri font-medium text-white leading-[1.1] max-w-4xl"
            >
              Explore the World <br /> With Us
            </motion.h1>
          </div>
        </div>

        {/* --- Top Text Section --- */}
        <div className="container mx-auto px-3 py-10 xl:py-16">
          <div className="w-full">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6"
            >
              {loading ? (
                Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-full flex flex-col rounded-[32px] overflow-hidden shadow-sm bg-white border border-gray-100 animate-pulse"
                  >
                    {/* Skeleton Image Area */}
                    <div className="w-full h-[250px] md:h-[200px] xl:h-[280px] bg-gray-200"></div>
                    
                    {/* Skeleton Text Area */}
                    <div className="w-full p-6 flex flex-col gap-4 mt-2">
                      <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded-md w-1/3 mt-2"></div>
                    </div>
                  </div>
                ))
              ) : error ? (
                <div className="col-span-full text-center text-red-500 py-10">
                  Error loading blogs. Please try again later.
                </div>
              ) : blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div
                    key={blog._id}
                    // 1. Changed main container to flex-col and removed fixed height
                    className="group relative w-full flex flex-col rounded-[32px] overflow-hidden cursor-pointer shadow-sm bg-white border border-gray-100"
                  >
                    {/* 2. Put the image in its own wrapper with a fixed height */}
                    <div className="w-full h-[250px] md:h-[200px] xl:h-[280px] overflow-hidden">
                      <img
                        src={blog.primaryImage}
                        alt={blog.imageAltText || blog.title}
                        // Added group-hover:scale-110 back so it zooms on hover
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* 3. Text Container - Removed absolute positioning, updated text colors */}
                    <div className="w-full p-6 flex flex-col gap-2">
                      <h3 className="text-2xl font-bold tracking-wide font-messiri text-gray-900">
                        {blog.title}
                      </h3>

                      <div className="flex items-center text-gray-600 text-md">
                        <span>
                          {blog.description?.length > DESCRIPTION_LIMIT
                            ? `${blog.description.substring(0, DESCRIPTION_LIMIT)}...`
                            : blog.description}
                        </span>
                      </div>
                      <Link to={`/blogs/${blog.slug}`} className="w-fit text-primary font-medium transition-all transform ">
                        Read More <span className="text-base">{`>>`}</span>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10">
                  No blogs found.
                </div>
              )}
            </motion.div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16 pb-10">
                {/* Minimal Previous Arrow */}
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers with Ellipsis (...) */}
                <div className="flex gap-2 items-center text-sm">
                  {getVisiblePages(pagination.currentPage, pagination.totalPages).map((page, idx) => (
                    page === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-1 text-gray-400 font-medium tracking-widest">
                        ...
                      </span>
                    ) : (
                      <button
                        key={idx}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${pagination.currentPage === page
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                          }`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>

                {/* Minimal Next Arrow */}
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label="Next page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
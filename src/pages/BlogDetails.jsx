import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom"; // Added Link
import { URL } from "../Common/api";
import axios from "axios";
import ContactForm from "../components/ContactForm";
import { Mail } from "lucide-react";


const BlogDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);

  // ✅ Added state for recent blogs
  const [recentBlogs, setRecentBlogs] = useState([]);
  const abortControllerRef = useRef(null);



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const fetchData = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);

      // ✅ 1. Fetch the specific blog details
      const blogReq = axios.get(`${URL}/public/blogs/${id}`, {
        signal: abortControllerRef.current.signal,
        timeout: 10000
      });

      // ✅ 2. Fetch 3 recent blogs for the sidebar
      const recentReq = axios.get(`${URL}/public/blogs?limit=2`, {
        signal: abortControllerRef.current.signal,
      });

      // Run both requests in parallel for better performance
      const [blogRes, recentRes] = await Promise.all([blogReq, recentReq]);

      setBlog(blogRes.data.blog);

      // Filter out the current blog so it doesn't show in the "Recent" list
      const filteredRecent = (recentRes.data.blogs || []).filter(b => b._id !== id).slice(0, 3);
      setRecentBlogs(filteredRecent);

    } catch (err) {
      if (err.name !== 'CanceledError') {
        console.error("Error fetching data:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
      // ✅ Scroll to top when the ID changes (if they click a recent blog)
      window.scrollTo(0, 0);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [id]);

  if (!blog && loading) {
    return <div className="h-screen flex items-center justify-center">Loading blog details...</div>;
  }

  if (!blog) return null;



  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submission (WhatsApp Integration)
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // --- 1. Name Validation ---
    // Checks if empty, and ensures it only contains letters and spaces (2-50 chars)
    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!nameRegex.test(formData.name.trim())) {
      newErrors.name = "Please enter a valid name (letters only).";
    }

    // --- 2. Email Validation ---
    // Standard email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // --- 3. Message Validation ---
    // Ensures the message is not empty
    if (!formData.message || !formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    // --- Error Handling ---
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus('idle'); // Optional: reset status if it was previously set
      return;
    }

    // Clear any previous errors to ensure a clean state
    setErrors({});
    setStatus('loading');

    // Note: Consider moving these to an .env file for better security
    // e.g., process.env.REACT_APP_EMAILJS_SERVICE_ID
    const serviceId = 'service_aec3s9j';
    const templateId = 'template_32zmbk4';
    const publicKey = 'ZB7e5qHReRX3RfG-z';

    emailjs.send(serviceId, templateId, formData, publicKey)
      .then((response) => {
        setStatus('success');
        // Reset form with the new fields
        setFormData({ name: '', email: '', message: '' });

        // Reset success message after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setStatus('error');
      });
  };



  return (
    <>
      <article>
        <title>{blog?.metaTitle || blog?.title || 'TripScribe Blog'}</title>
        <meta name="description" content={blog?.metaDescription || ''} />
        <link rel="canonical" href={`https://www.tripscribe.in/blogs/${id}`} />
      </article>

      <section className="w-full bg-white">
        {/* --- 1. HERO BANNER SECTION --- */}
        <div className="relative w-full h-[40vh] xl:h-[65vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={blog.primaryImage || "https://images.unsplash.com/photo-1504730655501-24c39ac53f0e?q=50&w=2070&auto=format&fit=crop"}
              alt={blog.imageAltText || blog.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 w-11/12 mx-auto h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-fit pt-20 xl:pt-40"
            >
              <div className="inline-flex uppercase items-center gap-3 px-5 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] md:text-xs tracking-wider transition-colors hover:bg-white/30 cursor-pointer">
                <span>Home</span>
                <div className="w-[1px] h-3 bg-gray-300"></div>
                <span>Blog</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 text-3xl md:text-6xl font-messiri font-medium text-white leading-[1.1] max-w-4xl"
            >
              {blog.title}
            </motion.h1>
          </div>
        </div>

        {/* --- 2. MAIN CONTENT & SIDEBAR SECTION --- */}
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left Side: Blog Content */}
          <div className="w-full lg:w-[65%]">
            <div
              className="rich-text-content max-w-none text-left prose prose-lg prose-headings:font-messiri prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/&nbsp;/g, ' ') }}
            />
          </div>

          {/* Right Side: Sidebar */}
          <aside className="w-full lg:w-[35%] relative">
            {/* The sticky wrapper keeps the sidebar on screen as you scroll */}
            <div className="sticky top-24 flex flex-col gap-10">


              {/* Contact Form Widget */}
              <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-3xl font-bold font-messiri text-black mb-4 text-left pb-3">
                    Plan Your Trip
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-widest text-black/60 uppercase font-sans">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="w-full bg-white/5 border border-black/10 rounded-xl p-3 md:p-4 text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-widest text-black/60 uppercase font-sans">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email Address"
                            className="w-full bg-white/5 border border-black/10 rounded-xl p-3 md:p-4 pr-12 text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-teal-500/20 p-1 rounded">
                            <Mail size={16} className="text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs tracking-widest text-black/60 uppercase font-sans mb-4">
                        Comments / Questions
                      </label>
                      <textarea
                        rows="2"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message Here"
                        className="w-full bg-white/5 border border-black/10 rounded-xl p-3 md:p-4 text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-white text-white hover:text-black transition duration-200 border border-white/10  cursor-pointer font-semibold text-sm tracking-wider uppercase py-4 rounded-xl  active:scale-[0.99] md:mt-4"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>


              {/* Recent Blogs Widget */}
              {recentBlogs.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-xl font-bold font-messiri text-gray-900 mb-6 border-b border-gray-200 pb-3">
                    Recent Posts
                  </h3>
                  <div className="flex flex-col gap-5">
                    {recentBlogs.map((recent) => (
                      <Link
                        to={`/blogs/${recent._id}`}
                        key={recent._id}
                        className="flex gap-4 group items-center"
                      >
                        <img
                          src={recent.primaryImage}
                          alt={recent.title}
                          className="w-20 h-20 object-cover rounded-xl shadow-sm transition-transform group-hover:scale-105"
                        />
                        <div className="flex flex-col gap-1">
                          <h4 className="text-sm font-bold text-gray-800 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {recent.title}
                          </h4>
                          <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold mt-1">
                            Read Article
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}



            </div>
          </aside>

        </div>
      </section>
    </>
  );
};

export default BlogDetails;
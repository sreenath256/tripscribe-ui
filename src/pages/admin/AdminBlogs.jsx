import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs, deleteBlog } from '../../redux/actions/admin/blogActions';
import toast from 'react-hot-toast';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { Plus } from 'lucide-react';

const AdminBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(130);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  // Fetch blogs on component mount
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  // Handle errors from Redux
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);



  const openDeleteConfirm = (blogId) => {
    setSelectedBlogId(blogId);
    setConfirmOpen(true);
  };



  // Filter blogs based on search term, category, and status
  const filteredBlogs = useMemo(() => {
    if (!blogs || !Array.isArray(blogs)) return [];

    return blogs.filter(blog => {
      const name = (blog.name || blog.title || '').toLowerCase();
      const location = (blog.location || '').toLowerCase();
      const area = (blog.area || '').toLowerCase();

      // ✅ use categories array instead of category
      const categoryList = Array.isArray(blog.categories)
        ? blog.categories
        : blog.category
          ? [blog.category]
          : [];

      const categoryNames = categoryList
        .map(cat => getCategoryName(cat).toLowerCase())
        .join(' ');

      const matchesSearch =
        name.includes(searchTerm.toLowerCase()) ||
        location.includes(searchTerm.toLowerCase()) ||
        area.includes(searchTerm.toLowerCase()) ||
        categoryNames.includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' ||
        categoryList.some(
          (cat) =>
            (typeof cat === 'string' && cat.toLowerCase() === selectedCategory.toLowerCase()) ||
            (typeof cat === 'object' &&
              (cat.id === selectedCategory ||
                cat.name?.toLowerCase() === selectedCategory.toLowerCase()))
        );

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && (blog.status || blog.isActive || true)) ||
        (statusFilter === 'inactive' && !(blog.status || blog.isActive || false));

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, searchTerm, selectedCategory, statusFilter]);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, statusFilter]);

  const handleDeleteBlog = async () => {
    if (!selectedBlogId) return;

    try {
      const result = await dispatch(deleteBlog(selectedBlogId));
      // Check if the action was fulfilled
      if (deleteBlog.fulfilled.match(result)) {
        toast.success("Blog deleted successfully");
      } else {
        // Handle rejection
        toast.error(result.payload || "Failed to delete blog");
      }

    } catch (error) {
      toast.error("An error occurred while deleting the blog");
    } finally {
      setConfirmOpen(false);
      setSelectedBlogId(null);
    }
  };




  return (
    <div className="space-y-6">
      {/* Header */}

      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between pl-16 pr-4 md:px-8 shrink-0 z-10 w-full">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 capitalize truncate max-w-[200px] md:max-w-none">
          Manage Blogs
        </h1>
        <Link to="/dashboard/blogs/add" className="flex items-center gap-2 bg-primary hover:bg-white border-[1.5px] border-primary text-white hover:text-black transition duration-200 px-6 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase shadow-sm">
          <Plus size={18} strokeWidth={2.5} /> Add Blog
        </Link>
      </header>

      <div className='px-5 flex flex-col gap-5'>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border bg-white border-gray-300 rounded-lg"
            />
          </div>





          {/* Results Count */}
          <div className="flex items-center text-sm text-gray-600">
            Showing {paginatedBlogs.length} of {filteredBlogs.length} blogs
          </div>
        </div>


        {/* blogs Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Image</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Blogs Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedBlogs.map((blog) => {
                    const blogName = blog.name || blog.title || 'Untitled Blog';
                    const blogStatus = blog.status || blog.isActive !== false;

                    return (
                      <tr key={blog._id || blog.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 w-2/5">
                          <img src={blog.primaryImage} alt="" className='h-16' />
                        </td>
                        <td className="px-6 py-4 w-2/5">
                          <div className="text-sm font-medium text-gray-900 truncate">{blogName}</div>
                        </td>


                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${blogStatus
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                              }`}
                          >
                            {blogStatus ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            {/* <Link to={`/dashboard/blog/${blog.slug || blog.slug}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <FiEye className="h-4 w-4" />
                            </Link> */}
                            <Link to={`/dashboard/blogs/edit/${blog._id || blog.id}`}>
                              <FiEdit className="h-4 w-4" />
                            </Link>
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            </button>
                            <button
                              onClick={() => openDeleteConfirm(blog._id || blog.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!loading && paginatedBlogs.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your filters.'
                  : 'Get started by adding your first blogs.'}
              </p>
              <Link
                to="/dashboard/blogs/add"
                className="flex items-center w-fit mx-auto gap-2 bg-primary hover:bg-white border-[1.5px] border-primary text-white hover:text-black transition duration-200 px-6 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase shadow-sm"
              >
                Add New Blog
              </Link>
            </div>
          )}
        </div>


        <ConfirmDialog
          isOpen={confirmOpen}
          title="Delete Blog"
          message="Are you sure you want to delete this blog? This action cannot be undone."
          onConfirm={handleDeleteBlog}
          onCancel={() => setConfirmOpen(false)}
        />

      </div>
    </div>
  );
};

export default AdminBlogs;

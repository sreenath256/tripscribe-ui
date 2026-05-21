import React, { useEffect, useRef, useState, useMemo } from 'react';
import { FiSave, FiArrowLeft, FiUpload, FiX, FiMinimize, FiMaximize } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createBlog } from '../../redux/actions/admin/blogActions';

// Register webp format and allow webp/blob in Quill's image blot sanitizer
const Quill = ReactQuill.Quill;
if (Quill) {
  const ImageBlot = Quill.import('formats/image');
  if (ImageBlot) {
    const originalSanitize = ImageBlot.sanitize;
    ImageBlot.sanitize = function (url) {
      if (typeof url === 'string' && (url.startsWith('data:image/webp') || url.startsWith('blob:'))) {
        return url;
      }
      return originalSanitize(url);
    };
    Quill.register(ImageBlot, true);
  }
}

const initialState = {
  title: '',
  titleForInnerPage: '',
  primaryImage: null,
  description: '',
  content: ''
};

const AddBlog = () => {
  const [formData, setFormData] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditorFullscreen, setIsEditorFullscreen] = useState(false);
  const primaryImageRef = useRef(null);
  const editorContainerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [blogLoading, setBlogLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { error } = useSelector((state) => state.blogs);

  // React Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Expanded to H1-H6 + Normal text
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['blockquote', 'code-block'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['table'], // Added table button to the toolbar
        ['clean']
      ],
      handlers: {
        image: function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();
          input.onchange = () => {
            const file = input.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const quill = this.quill;
                const range = quill.getSelection(true);
                quill.insertEmbed(range.index, 'image', reader.result);
                quill.setSelection(range.index + 1);
              };
              reader.readAsDataURL(file);
            }
          };
        },
        // Custom handler to insert a basic 2x2 table
        table: function () {
          const quill = this.quill;
          const tableModule = quill.getModule('table');
          if (tableModule) {
            tableModule.insertTable(2, 2);
          }
        }
      }
    },
    table: true // Explicitly enable the table module
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image',
    'blockquote', 'code-block',
    'color', 'background',
    'align',
    'table' // Added table to allowed formats
  ];

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "slug") {
      value = value
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, "") // Remove symbols except hyphens
        .replace(/-+/g, "-"); // Reduce multiple hyphens to one
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: '' }));
    }
  };

  const handlePrimaryImage = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, primaryImage: file }));
    if (file && errors.primaryImage) {
      setErrors((prev) => ({ ...prev, primaryImage: '' }));
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return url;
      });
    } else {
      setImagePreview((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return null;
      });
    }
  };



  const removePrimaryImage = () => {
    setFormData((prev) => ({ ...prev, primaryImage: null }));
    setImagePreview((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return null;
    });
    if (primaryImageRef.current) {
      primaryImageRef.current.value = '';
    }
  };

  const toggleEditorFullscreen = () => {
    setIsEditorFullscreen(!isEditorFullscreen);
  };

  // Close fullscreen when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isEditorFullscreen &&
        editorContainerRef.current &&
        !editorContainerRef.current.contains(event.target)) {
        setIsEditorFullscreen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditorFullscreen]);

  // Prevent body scroll when in fullscreen
  useEffect(() => {
    if (isEditorFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isEditorFullscreen]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  // Handle Redux errors only if needed - but we'll handle it in handleSubmit now
  // for a better UX (success and error in one place)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.title?.trim()) newErrors.title = 'Blog title is required';
    if (!formData.description?.trim()) newErrors.description = 'Short description is required';
    if (!formData.metaTitle?.trim()) newErrors.metaTitle = 'Meta title is required';
    if (!formData.metaDescription?.trim()) newErrors.metaDescription = 'Meta description is required';
    if (!formData.slug?.trim()) newErrors.slug = 'Slug is required';
    if (!formData.primaryImage) newErrors.primaryImage = 'Primary image is required';
    if (!formData.imageAltText?.trim()) newErrors.imageAltText = 'Image alt text is required';
    if (!formData.content?.trim() || formData.content === '<p><br></p>') newErrors.content = 'Blog content is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    // Create FormData for multipart/form-data submission
    const submitData = new FormData();

    // Add text fields
    submitData.append('title', formData.title || '');
    submitData.append('description', formData.description || '');
    submitData.append('metaTitle', formData.metaTitle || '');
    submitData.append('metaDescription', formData.metaDescription || '');
    submitData.append('slug', (formData.slug || '').replace(/^-+|-+$/g, ''));
    submitData.append('imageAltText', formData.imageAltText || '');
    submitData.append('content', formData.content || '');

    // Add primary image
    if (formData.primaryImage) {
      submitData.append('primaryImage', formData.primaryImage);
    }

    console.log('Submitting Blog Form Data:', {
      ...formData,
      primaryImage: formData.primaryImage?.name
    });

    try {
      setBlogLoading(true);
      const result = await dispatch(createBlog(submitData)).unwrap();

      console.log('Blog created successfully:', result);
      toast.success('Blog published successfully!');
      navigate('/dashboard/blog');
    } catch (error) {
      console.error('Blog creation error:', error);
      // The error is already toasted by handleError in configurations.jsx
      // but if for some reason it's not (e.g. unexpected error), we toast it here.
      if (typeof error === 'string') {
        toast.error(error);
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred while publishing the blog');
      }
    } finally {
      setBlogLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between pl-16 pr-4 md:px-8 shrink-0 z-10 w-full">
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard/blogs"
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            title="Back to Blogs"
          >
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 capitalize truncate max-w-[200px] md:max-w-none">
            Add New Blog
          </h1>
        </div>

        <button
          type="submit"
          form="add-blog-form"
          className="flex items-center gap-2 bg-primary hover:bg-white border-[1.5px] border-primary text-white hover:text-black transition duration-200 px-6 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase shadow-sm disabled:opacity-60"
          disabled={blogLoading}
        >
          <FiSave className="h-4 w-4" />
          {blogLoading ? 'Publishing...' : 'Publish Blog'}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 relative w-full bg-gray-50/50">
        <form
          id="add-blog-form"
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-lg  mx-auto border border-gray-200 p-6 space-y-6"
        >
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white`}
                placeholder="Enter blog title"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 border ${errors.description ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white`}
                placeholder="Enter a brief description that will appear in blog listings..."
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title <span className="text-red-500">*</span>
              </label>
              <input
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                type="text"
                className={`w-full px-4 py-3 border ${errors.metaTitle ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white`}
                placeholder="Enter meta title"
              />
              {errors.metaTitle && <p className="text-red-500 text-xs mt-1">{errors.metaTitle}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 border ${errors.metaDescription ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white`}
                placeholder="Enter meta description"
              />
              {errors.metaDescription && <p className="text-red-500 text-xs mt-1">{errors.metaDescription}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                type="text"
                className={`w-full px-4 py-3 border ${errors.slug ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white`}
                placeholder="Enter slug"
              />
              {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
            </div>

          </div>

        </div>

        {/* Primary Image Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Primary Image <span className="text-red-500">*</span>
          </h3>

          <div>
            <label className={`flex items-center justify-between px-4 py-6 border-2 border-dashed ${errors.primaryImage ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} rounded-lg cursor-pointer text-sm text-gray-700 hover:border-gray-400 transition-colors`}>
              <div className="flex flex-col items-center text-center w-full">
                <FiUpload className={`h-8 w-8 mb-2 ${errors.primaryImage ? 'text-red-400' : 'text-gray-400'}`} />
                <span className="font-medium text-gray-900">
                  {formData.primaryImage ? formData.primaryImage.name : 'Choose primary image'}
                </span>
                <span className="text-gray-500 mt-1">
                  Recommended: 1200x630px, JPG or PNG
                </span>
              </div>
              <input
                ref={primaryImageRef}
                onChange={handlePrimaryImage}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
            {errors.primaryImage && <p className="text-red-500 text-xs mt-1">{errors.primaryImage}</p>}

            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Blog preview"
                    className="h-48 w-auto object-cover rounded-lg border shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={removePrimaryImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                    title="Remove image"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 pt-10 mb-1">
                Image Alt Text <span className="text-red-500">*</span>
              </label>
              <input
                name="imageAltText"
                value={formData.imageAltText}
                onChange={handleChange}
                type="text"
                className={`w-full px-4 py-3 border ${errors.imageAltText ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white`}
                placeholder="Enter image alt text"
              />
              {errors.imageAltText && <p className="text-red-500 text-xs mt-1">{errors.imageAltText}</p>}
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Blog Content <span className="text-red-500">*</span>
            </h3>
            <button
              type="button"
              onClick={toggleEditorFullscreen}
              className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title={isEditorFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isEditorFullscreen ? (
                <FiMinimize className="h-4 w-4 mr-1" />
              ) : (
                <FiMaximize className="h-4 w-4 mr-1" />
              )}
              {isEditorFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
          </div>

          {/* Editor Container with Fullscreen Support */}
          <div
            ref={editorContainerRef}
            className={`
              border ${errors.content ? 'border-red-500' : 'border-gray-300'} rounded-xl overflow-hidden transition-all duration-300
              ${isEditorFullscreen
                ? 'fixed inset-4 z-50 bg-white shadow-2xl rounded-xl'
                : 'relative'
              }
            `}
          >
            <ReactQuill
              value={formData.content}
              onChange={handleContentChange}
              modules={modules}
              formats={formats}
              placeholder="Write your blog content here..."
              theme="snow"
              style={{
                height: isEditorFullscreen ? 'calc(100vh - 8rem)' : '600px',
                border: 'none',
                fontSize: isEditorFullscreen ? '16px' : '14px'
              }}
            />

            {/* Close button for fullscreen mode */}
            {isEditorFullscreen && (
              <div className="absolute top-4 right-4 z-10">
                <button
                  type="button"
                  onClick={toggleEditorFullscreen}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  title="Exit fullscreen"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <p>
              Rich text editor supports formatting, lists, links, images, and more.
              {isEditorFullscreen && ' Press ESC or click the X button to exit fullscreen.'}
            </p>

          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-mainhvr inline-flex items-center disabled:opacity-60 transition-colors"
            disabled={blogLoading}
          >
            <FiSave className="h-4 w-4 mr-2" />
            {blogLoading ? 'Publishing...' : 'Publish Blog'}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AddBlog;
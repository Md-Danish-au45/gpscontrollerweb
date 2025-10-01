import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
  Link2 as LinkIcon,
  ChevronRight,
  X,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetBlogBySlugQuery, useGetRelatedBlogsQuery } from "@/app/api/blogApiSlice";
import Header from "./homeComponents/Header";
import TopBar from "./homeComponents/TopBar";
import Footer from "./homeComponents/Footer";

// Content sanitizer and formatter
const formatBlogContent = (content) => {
  if (!content) return '';
  
  let formattedContent = content;

  // Fix common HTML issues from rich text editors
  formattedContent = formattedContent
    // Remove empty paragraphs and unnecessary breaks
    .replace(/<p><br><\/p>/g, '')
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/<p><\/p>/g, '')
    // Fix spacing between elements
    .replace(/(<[^>]+>)\s+(<[^>]+>)/g, '$1$2')
    // Remove multiple line breaks
    .replace(/\n\s*\n/g, '\n')
    // Ensure proper heading structure
    .replace(/<h1>/g, '<h1 class="blog-heading blog-h1">')
    .replace(/<h2>/g, '<h2 class="blog-heading blog-h2">')
    .replace(/<h3>/g, '<h3 class="blog-heading blog-h3">')
    .replace(/<h4>/g, '<h4 class="blog-heading blog-h4">')
    // Fix paragraph styling
    .replace(/<p>/g, '<p class="blog-paragraph">')
    // Fix list styling
    .replace(/<ul>/g, '<ul class="blog-list blog-ul">')
    .replace(/<ol>/g, '<ol class="blog-list blog-ol">')
    .replace(/<li>/g, '<li class="blog-list-item">')
    // Fix blockquotes
    .replace(/<blockquote>/g, '<blockquote class="blog-blockquote">')
    // Fix links
    .replace(/<a(?![^>]*class=)/g, '<a class="blog-link"')
    // Fix images
    .replace(/<img/g, '<img class="blog-image" loading="lazy"')
    // Fix tables
    .replace(/<table>/g, '<table class="blog-table">')
    .replace(/<th>/g, '<th class="blog-th">')
    .replace(/<td>/g, '<td class="blog-td">')
    // Fix code blocks
    .replace(/<code>/g, '<code class="blog-code">')
    .replace(/<pre>/g, '<pre class="blog-pre">');

  return formattedContent;
};

// Reading time calculator
const calculateReadingTime = (content) => {
  if (!content) return 5;
  
  // Remove HTML tags and count words
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
  
  return Math.max(readingTime, 1); // Minimum 1 minute
};

// Scroll tracking hook
const useScrollTracking = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollPosition(currentScroll / totalHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};

// Reading progress hook
const useReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.pageYOffset / totalHeight) * 100;
      setProgress(Math.min(scrolled, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

// Newsletter Popup Component
const NewsletterPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setIsSubmitting(false);
    
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          {submitted ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">You've successfully subscribed to our newsletter.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Join Our Newsletter</h3>
                  <p className="text-sm text-gray-500 mt-1">10,000+ readers trust us</p>
                </div>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <p className="text-gray-600 text-sm">
                  Stay updated with our latest articles and exclusive resources. Join our community!
                </p>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1987BF] focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1987BF] focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    What interests you most? (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1987BF] focus:border-transparent transition-colors resize-none"
                    placeholder="AI, Technology, Business insights..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#1987BF] hover:bg-[#1474a4] py-3 text-base font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Subscribe Now
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center space-x-4 pt-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <Eye className="w-3 h-3 mr-1" />
                    No spam, ever
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <X className="w-3 h-3 mr-1" />
                    Unsubscribe anytime
                  </div>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [formattedContent, setFormattedContent] = useState('');
  
  const scrollPosition = useScrollTracking();
  const readingProgress = useReadingProgress();

  // Fetch blog data by slug
  const { data: blogResponse, isLoading, error } = useGetBlogBySlugQuery(slug);

  // Fetch related blogs
  const { data: relatedResponse } = useGetRelatedBlogsQuery(slug, {
    skip: !blogResponse?.data,
  });

  const blog = blogResponse?.data;
  const relatedBlogs = relatedResponse?.data || [];
  const contentLength = blog?.content?.length || 0;
  const readingTime = blog?.readingTime || calculateReadingTime(blog?.content);

  // Format content when blog data is loaded
  useEffect(() => {
    if (blog?.content) {
      const formatted = formatBlogContent(blog.content);
      setFormattedContent(formatted);
    }
  }, [blog]);

  // Smart popup trigger
  useEffect(() => {
    if (!popupShown && blog && scrollPosition > 0.5) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        setPopupShown(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [blog, popupShown, scrollPosition]);

  // Enhanced SEO and meta tags
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (blog) {
      // Set document title with brand
      document.title = `${blog.metaTitle || blog.title} | VerifyEKYC Blog`;

      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = blog.metaDescription || blog.excerpt;

      // Enhanced Open Graph tags
      const updateMetaTag = (property, content) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.content = content;
      };

      updateMetaTag('og:title', blog.title);
      updateMetaTag('og:description', blog.metaDescription || blog.excerpt);
      updateMetaTag('og:type', 'article');
      updateMetaTag('og:url', window.location.href);
      if (blog.featuredImage?.url) {
        updateMetaTag('og:image', blog.featuredImage.url);
      }

      // Twitter Cards
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:title', blog.title);
      updateMetaTag('twitter:description', blog.metaDescription || blog.excerpt);

      // Enhanced JSON-LD structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.metaDescription || blog.excerpt,
        "image": blog.featuredImage?.url ? [blog.featuredImage.url] : [],
        "datePublished": blog.publishedAt,
        "dateModified": blog.updatedAt || blog.publishedAt,
        "author": {
          "@type": "Person",
          "name": blog.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "VerifyEKYC",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.verifyekyc.com/logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        },
        "wordCount": blog.content?.replace(/<[^>]*>/g, '').split(' ').length || 0,
        "keywords": blog.tags?.join(', ') || '',
        "articleSection": blog.category,
        "inLanguage": "en-US"
      });
      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [blog]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title;
    const text = blog?.excerpt || blog?.metaDescription || '';

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&hashtags=eKYC,IdentityVerification`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        // Show success feedback
        const button = event.target.closest('button');
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        setTimeout(() => {
          button.innerHTML = '<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8zM3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11.586l-3-3a1 1 0 00-1.414 1.414L11.586 11H4a1 1 0 100 2h7.586l-1 1a1 1 0 101.414 1.414l3-3z"></path></svg>Copy Link';
        }, 2000);
      });
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400,noopener,noreferrer');
    }
    setShowShareMenu(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1987BF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Header />
        <div className="text-center flex-grow flex flex-col justify-center px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been moved.</p>
          <Button className="mt-4" onClick={() => navigate('/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2"/>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Global Blog Content Styles */}
      <style jsx global>{`
        /* Premium Blog Content Styling - SEO Optimized */
        .blog-content {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.75;
          color: #374151;
          font-size: 1.125rem;
          max-width: 100%;
        }

        /* Headings with perfect hierarchy and spacing */
        .blog-heading {
          font-weight: 700;
          color: #1f2937;
          scroll-margin-top: 6rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }

        .blog-h1 {
          font-size: 2.5rem;
          line-height: 1.2;
          border-bottom: 3px solid #e5e7eb;
          padding-bottom: 1rem;
          margin-top: 3rem;
          margin-bottom: 2rem;
        }

        .blog-h2 {
          font-size: 2rem;
          line-height: 1.3;
          color: #1987BF;
          border-bottom: 2px solid #f3f4f6;
          padding-bottom: 0.75rem;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .blog-h3 {
          font-size: 1.5rem;
          line-height: 1.4;
          color: #374151;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .blog-h4 {
          font-size: 1.25rem;
          line-height: 1.4;
          color: #4b5563;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        /* Paragraphs with optimal readability */
        .blog-paragraph {
          margin: 1.5rem 0;
          line-height: 1.8;
          color: #374151;
          text-align: justify;
          font-size: 1.125rem;
        }

        /* Links with proper contrast and interaction */
        .blog-link {
          color: #1987BF;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .blog-link:hover {
          color: #1474a4;
          border-bottom-color: #1987BF;
        }

        /* Lists with clean styling */
        .blog-list {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .blog-ul {
          list-style-type: disc;
        }

        .blog-ol {
          list-style-type: decimal;
        }

        .blog-list-item {
          margin: 0.75rem 0;
          line-height: 1.7;
          color: #374151;
        }

        .blog-list-item::marker {
          color: #1987BF;
        }

        /* Blockquotes with premium styling */
        .blog-blockquote {
          border-left: 4px solid #1987BF;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 2rem;
          margin: 2rem 0;
          font-style: italic;
          color: #475569;
          border-radius: 0 12px 12px 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .blog-blockquote .blog-paragraph {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.6;
          color: #475569;
        }

        /* Images with responsive behavior */
        .blog-image {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 2rem auto;
          display: block;
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .blog-image:hover {
          transform: scale(1.02);
        }

        /* Code blocks with syntax highlighting */
        .blog-code {
          background: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace;
          font-size: 0.875em;
          color: #dc2626;
          border: 1px solid #e5e7eb;
        }

        .blog-pre {
          background: #1f2937;
          color: #f9fafb;
          padding: 1.5rem;
          border-radius: 12px;
          overflow-x: auto;
          margin: 2rem 0;
          font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace;
          font-size: 0.875rem;
          line-height: 1.5;
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.2);
        }

        .blog-pre .blog-code {
          background: none;
          padding: 0;
          color: inherit;
          font-size: inherit;
          border: none;
        }

        /* Tables with professional styling */
        .blog-table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 0.875rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          overflow: hidden;
        }

        .blog-th {
          background: linear-gradient(135deg, #1987BF 0%, #1474a4 100%);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .blog-td {
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
          background: white;
          color: #374151;
        }

        .blog-table tr:nth-child(even) .blog-td {
          background: #f8fafc;
        }

        .blog-table tr:hover .blog-td {
          background: #f1f5f9;
        }

        /* Strong and emphasis */
        .blog-content strong {
          font-weight: 700;
          color: #1f2937;
        }

        .blog-content em {
          font-style: italic;
          color: #4b5563;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .blog-content {
            font-size: 1rem;
            line-height: 1.7;
          }

          .blog-h1 {
            font-size: 2rem;
            margin-top: 2rem;
            margin-bottom: 1.5rem;
          }

          .blog-h2 {
            font-size: 1.75rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }

          .blog-h3 {
            font-size: 1.375rem;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }

          .blog-paragraph {
            font-size: 1rem;
            margin: 1.25rem 0;
          }

          .blog-blockquote {
            padding: 1.5rem;
            margin: 1.5rem 0;
          }

          .blog-blockquote .blog-paragraph {
            font-size: 1.125rem;
          }
        }

        /* Print styles for better printing experience */
        @media print {
          .blog-content {
            font-size: 12pt;
            line-height: 1.6;
            color: #000;
          }

          .blog-heading {
            color: #000;
            page-break-after: avoid;
          }

          .blog-paragraph {
            orphans: 3;
            widows: 3;
          }

          .blog-image {
            max-width: 100% !important;
            page-break-inside: avoid;
          }
        }

        /* Focus styles for accessibility */
        .blog-heading:focus,
        .blog-link:focus {
          outline: 2px solid #1987BF;
          outline-offset: 2px;
        }

        /* Selection styles */
        .blog-content ::selection {
          background: #1987BF;
          color: white;
        }
      `}</style>

      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#1987BF] to-blue-400 z-50 transition-all duration-300"
        style={{ width: `${readingProgress}%` }}
      />
      
      <TopBar/>
      <Header />

      <main className="flex-1">
        {/* Enhanced Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-gray-50 py-4 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-[#1987BF] transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <Link to="/blog" className="hover:text-[#1987BF] transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <span className="text-[#1987BF] font-medium">{blog.category}</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <span className="text-gray-900 truncate" aria-current="page">{blog.title}</span>
            </div>
          </div>
        </nav>

        {/* Enhanced Hero Section */}
        <section aria-labelledby="blog-title" className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Badge className="bg-gradient-to-r from-[#1987BF] to-blue-500 text-white mb-6 text-sm font-medium px-4 py-2 shadow-lg">
                {blog.category}
              </Badge>

              <h1 id="blog-title" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent max-w-4xl mx-auto">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <User className="w-5 h-5 text-[#1987BF]" aria-hidden="true" />
                  <span className="font-medium">{blog.author}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Calendar className="w-5 h-5 text-[#1987BF]" aria-hidden="true" />
                  <span>
                    <time dateTime={blog.publishedAt}>
                      {new Date(blog.publishedAt).toLocaleDateString("en-US", { 
                        year: "numeric", 
                        month: "long", 
                        day: "numeric" 
                      })}
                    </time>
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Clock className="w-5 h-5 text-[#1987BF]" aria-hidden="true" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8 justify-center" role="list" aria-label="Tags">
                  {blog.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-gray-600 border-gray-300 bg-white/80 backdrop-blur-sm text-sm hover:bg-white transition-colors"
                      role="listitem"
                    >
                      <Tag className="w-3 h-3 mr-1" aria-hidden="true" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button 
                  onClick={() => navigate(-1)} 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-white hover:shadow-md transition-all"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Back
                </Button>

                <div className="relative">
                  <Button 
                    onClick={() => setShowShareMenu(!showShareMenu)} 
                    variant="outline" 
                    className="border-gray-300 text-gray-700 hover:bg-white hover:shadow-md transition-all"
                    aria-expanded={showShareMenu}
                    aria-haspopup="true"
                  >
                    <Share2 className="w-4 h-4 mr-2" aria-hidden="true" /> Share
                  </Button>

                  {showShareMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border p-2 z-10 w-48"
                      role="menu"
                    >
                      <Button 
                        onClick={() => handleShare('facebook')} 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start text-gray-700 hover:bg-blue-50 rounded-lg"
                        role="menuitem"
                      >
                        <Facebook className="w-4 h-4 mr-3 text-blue-600" aria-hidden="true" />Facebook
                      </Button>
                      <Button 
                        onClick={() => handleShare('twitter')} 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start text-gray-700 hover:bg-blue-50 rounded-lg"
                        role="menuitem"
                      >
                        <Twitter className="w-4 h-4 mr-3 text-blue-400" aria-hidden="true" />Twitter
                      </Button>
                      <Button 
                        onClick={() => handleShare('linkedin')} 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start text-gray-700 hover:bg-blue-50 rounded-lg"
                        role="menuitem"
                      >
                        <Linkedin className="w-4 h-4 mr-3 text-blue-700" aria-hidden="true" />LinkedIn
                      </Button>
                      <Button 
                        onClick={() => handleShare('copy')} 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start text-gray-700 hover:bg-gray-50 rounded-lg"
                        role="menuitem"
                      >
                        <LinkIcon className="w-4 h-4 mr-3 text-gray-600" aria-hidden="true" />Copy Link
                      </Button>
                    </motion.div>
                  )}
                </div>

                <Button 
                  onClick={() => setIsBookmarked(!isBookmarked)} 
                  variant="outline" 
                  className={`border-gray-300 transition-all ${
                    isBookmarked 
                      ? 'bg-[#1987BF] text-white border-[#1987BF] shadow-md' 
                      : 'text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} aria-hidden="true" /> 
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Featured Image */}
        {blog.featuredImage?.url && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
            <motion.figure
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={blog.featuredImage.url} 
                  alt={blog.featuredImage.alt || blog.title} 
                  className="w-full h-auto max-h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {blog.featuredImage.caption && (
                <figcaption className="text-center text-sm text-gray-600 mt-4 italic">
                  {blog.featuredImage.caption}
                </figcaption>
              )}
            </motion.figure>
          </div>
        )}

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Enhanced Main Content */}
            <article className="w-full lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: formattedContent }}
                  />
                </div>

                {/* Article Footer with Social Sharing */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Found this article helpful?</h3>
                    <div className="flex justify-center space-x-4 mb-6">
                      <Button 
                        onClick={() => handleShare('twitter')}
                        className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-full transition-colors"
                      >
                        <Twitter className="w-4 h-4 mr-2" />
                        Tweet this
                      </Button>
                      <Button 
                        onClick={() => handleShare('linkedin')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        Share on LinkedIn
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">
                      Help others discover this content by sharing it with your network.
                    </p>
                  </div>
                </div>
              </motion.div>
            </article>

            {/* Enhanced Sidebar */}
            <aside className="w-full lg:w-1/3" aria-label="Sidebar">
              <div className="sticky top-24 space-y-8">
                {/* Enhanced Related Posts */}
                {relatedBlogs.length > 0 && (
                  <Card className="border-gray-200 shadow-lg rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                        Related Articles
                      </h3>
                      <div className="space-y-6" role="list">
                        {relatedBlogs.slice(0, 4).map((relatedBlog) => (
                          <Link 
                            key={relatedBlog._id} 
                            to={`/blog/${relatedBlog.slug}`}
                            className="block group"
                            role="listitem"
                          >
                            <article className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden shadow-md">
                                <img 
                                  src={relatedBlog.featuredImage?.url || 'https://placehold.co/200x200/e2e8f0/64748b?text=No+Image'} 
                                  alt={relatedBlog.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  loading="lazy"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#1987BF] transition-colors line-clamp-2 leading-snug mb-2">
                                  {relatedBlog.title}
                                </h4>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <time dateTime={relatedBlog.publishedAt}>
                                    {new Date(relatedBlog.publishedAt).toLocaleDateString("en-US", { 
                                      month: "short", 
                                      day: "numeric" 
                                    })}
                                  </time>
                                  <Badge variant="outline" className="text-xs">
                                    {relatedBlog.category}
                                  </Badge>
                                </div>
                              </div>
                            </article>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Enhanced Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <Card className="border-gray-200 shadow-lg rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                        Trending Topics
                      </h3>
                      <div className="flex flex-wrap gap-3" role="list" aria-label="Tags">
                        {blog.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-gray-700 border-gray-300 bg-white hover:bg-[#1987BF] hover:text-white hover:border-[#1987BF] transition-colors cursor-pointer text-sm px-3 py-1"
                            role="listitem"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Enhanced Newsletter Signup */}
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-[#1987BF] to-blue-600">
                  <CardContent className="p-8 text-white">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">
                        Never Miss an Update
                      </h3>
                      <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                        Join 10,000+ professionals getting exclusive insights on AI, eKYC, and digital identity verification.
                      </p>
                      <div className="space-y-4">
                        <input 
                          type="email" 
                          placeholder="Enter your email address" 
                          className="w-full px-4 py-3 text-gray-900 bg-white border-0 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
                          aria-label="Email address for newsletter subscription"
                        />
                        <Button 
                          className="w-full bg-white text-[#1987BF] hover:bg-gray-100 py-3 font-semibold transition-colors"
                          onClick={() => setShowPopup(true)}
                        >
                          Subscribe Now
                        </Button>
                      </div>
                      <p className="text-xs text-blue-200 mt-4">
                        ✨ Free • ✉️ Weekly • 🔒 No spam ever
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Table of Contents (if content has headings) */}
                <Card className="border-gray-200 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                      Table of Contents
                    </h3>
                    <nav className="space-y-2">
                      <a href="#" className="block text-sm text-gray-600 hover:text-[#1987BF] transition-colors py-1">
                        Introduction
                      </a>
                      <a href="#" className="block text-sm text-gray-600 hover:text-[#1987BF] transition-colors py-1 pl-4">
                        Key Benefits
                      </a>
                      <a href="#" className="block text-sm text-gray-600 hover:text-[#1987BF] transition-colors py-1 pl-4">
                        Implementation Guide
                      </a>
                      <a href="#" className="block text-sm text-gray-600 hover:text-[#1987BF] transition-colors py-1">
                        Best Practices
                      </a>
                      <a href="#" className="block text-sm text-gray-600 hover:text-[#1987BF] transition-colors py-1">
                        Conclusion
                      </a>
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Enhanced Newsletter Popup */}
      <NewsletterPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
      
      <Footer/>
    </div>
  );
}


// dasda
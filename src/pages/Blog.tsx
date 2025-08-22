import { useState, useRef, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogGrid from "@/components/sections/BlogGrid";
import BlogSidebar from "@/components/sections/BlogSidebar";
import BlogFAQ from "@/components/sections/BlogFAQ";
import HeroSection from "@/components/sections/Intro";
import { SquarePen, Users, BookOpenText } from "lucide-react";
import { useBlogs } from "@/hooks/useBlogs";
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const Blog = () => {
  useDocumentTitle('Blog | GIC');
  
  const faqRef = useRef<HTMLDivElement | null>(null);
  const { blogs, loading, error } = useBlogs();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const blogsPerPage = 6;

  const scrollToFAQ = () => {
    faqRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter blogs by active tag
  const filteredBlogs = useMemo(() => {
    if (!activeTag) return blogs;
    return blogs.filter(blog => 
      blog.tags && blog.tags.includes(activeTag)
    );
  }, [blogs, activeTag]);

  // Calculate pagination for filtered blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Get random blogs for sidebar (excluding filtered ones)
  const sidebarBlogs = useMemo(() => {
    const shuffled = [...blogs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [blogs]);

  // Extract all unique tags from blogs
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogs.forEach(blog => {
      if (blog.tags) {
        blog.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [blogs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag(null); // Unmark active tag
    } else {
      setActiveTag(tag);
    }
    setCurrentPage(1); // Reset to first page when filtering
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-club-dark to-club-darker">
      <Navbar />
      
      <HeroSection
      backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
      icon={<BookOpenText className="w-14 h-14 text-white" />}
      title="Our Blogs"
      description="Discover insights, tutorials, and stories from our ICT Club community. Stay updated with the latest in technology and programming."
      primaryButton={{
        text: 'Write a Blog',
        icon: <SquarePen className="mr-2 h-5 w-5" />,
        onClick: scrollToFAQ,
      }}
      secondaryButton={{
        text: 'Join Community',
        icon: <Users className="mr-2 h-5 w-5" />,
        href: "/login",
      }}
      stats={[
        { number: '500+', label: 'Active Members' },
        { number: '15+', label: 'Blogs' },
        { number: '10+', label: 'Projects Completed' },
      ]}
      />

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Blog Grid */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Error loading blogs: {error}</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {activeTag ? `No blogs found with tag "${activeTag}"` : "No blogs available"}
                </p>
              </div>
            ) : (
              <BlogGrid 
                blogs={currentBlogs}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <BlogSidebar 
              blogs={sidebarBlogs} 
              allTags={allTags}
              activeTag={activeTag}
              onTagClick={handleTagClick}
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div ref={faqRef}>
      <BlogFAQ />
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
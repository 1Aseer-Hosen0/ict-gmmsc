import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogGrid from "@/components/sections/BlogGrid";
import BlogSidebar from "@/components/sections/BlogSidebar";
import BlogFAQ from "@/components/sections/BlogFAQ";
import HeroSection from "@/components/sections/Intro";
import { SquarePen, Users, BookOpenText } from "lucide-react";

// Dummy blog data
const allBlogs = [
  {
    id: 1,
    title: "Getting Started with React Development",
    snippet: "Learn the fundamentals of React and start building modern web applications with this comprehensive guide.",
    author: "John Doe",
    date: "2024-01-15",
    coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop",
    tags: ["React", "JavaScript", "Frontend"]
  },
  {
    id: 2,
    title: "Understanding Machine Learning Basics",
    snippet: "Dive into the world of AI and machine learning with practical examples and real-world applications.",
    author: "Jane Smith",
    date: "2024-01-12",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
    tags: ["AI", "Machine Learning", "Python"]
  },
  {
    id: 3,
    title: "Web Security Best Practices",
    snippet: "Essential security measures every web developer should implement to protect their applications.",
    author: "Mike Johnson",
    date: "2024-01-10",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    tags: ["Security", "Web Dev", "Backend"]
  },
  {
    id: 4,
    title: "Java Programming for Beginners",
    snippet: "Start your programming journey with Java - one of the most popular programming languages in the world.",
    author: "Sarah Wilson",
    date: "2024-01-08",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    tags: ["Java", "Programming", "Backend"]
  },
  {
    id: 5,
    title: "Modern CSS Techniques",
    snippet: "Explore advanced CSS features including Grid, Flexbox, and CSS Variables for modern web design.",
    author: "Alex Chen",
    date: "2024-01-05",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
    tags: ["CSS", "Frontend", "Design"]
  },
  {
    id: 6,
    title: "Database Design Fundamentals",
    snippet: "Learn how to design efficient and scalable databases for your web applications.",
    author: "David Brown",
    date: "2024-01-03",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop",
    tags: ["Database", "SQL", "Backend"]
  },
  {
    id: 7,
    title: "Mobile App Development with React Native",
    snippet: "Build cross-platform mobile applications using React Native and JavaScript.",
    author: "Emily Davis",
    date: "2024-01-01",
    coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop",
    tags: ["React Native", "Mobile", "JavaScript"]
  },
  {
    id: 8,
    title: "Cloud Computing Essentials",
    snippet: "Understanding cloud platforms and how to deploy your applications to the cloud.",
    author: "Robert Taylor",
    date: "2023-12-28",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=400&fit=crop",
    tags: ["Cloud", "DevOps", "AWS"]
  },
  {
    id: 9,
    title: "Git and Version Control",
    snippet: "Master Git commands and workflows for effective version control and collaboration.",
    author: "Lisa Anderson",
    date: "2023-12-25",
    coverImage: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=400&fit=crop",
    tags: ["Git", "Version Control", "DevOps"]
  },
  {
    id: 10,
    title: "API Development with Node.js",
    snippet: "Build robust REST APIs using Node.js, Express, and modern JavaScript practices.",
    author: "Tom Wilson",
    date: "2023-12-22",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop",
    tags: ["Node.js", "API", "Backend"]
  },
  // Add more blogs to reach 20+ for pagination testing
  {
    id: 11,
    title: "Frontend Performance Optimization",
    snippet: "Techniques and strategies to make your web applications faster and more responsive.",
    author: "Anna Garcia",
    date: "2023-12-20",
    coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop",
    tags: ["Performance", "Frontend", "Optimization"]
  },
  {
    id: 12,
    title: "Docker Containerization Guide",
    snippet: "Learn how to containerize your applications using Docker for better deployment and scalability.",
    author: "Chris Martinez",
    date: "2023-12-18",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
    tags: ["Docker", "DevOps", "Containerization"]
  },
  {
    id: 13,
    title: "TypeScript for JavaScript Developers",
    snippet: "Enhance your JavaScript projects with TypeScript's powerful type system and modern features.",
    author: "Sophie Lee",
    date: "2023-12-15",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    tags: ["TypeScript", "JavaScript", "Frontend"]
  },
  {
    id: 14,
    title: "Microservices Architecture",
    snippet: "Design and implement scalable microservices architecture for large-scale applications.",
    author: "Kevin Rodriguez",
    date: "2023-12-12",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    tags: ["Microservices", "Architecture", "Backend"]
  },
  {
    id: 15,
    title: "GraphQL vs REST APIs",
    snippet: "Compare GraphQL and REST APIs to choose the best approach for your next project.",
    author: "Maya Patel",
    date: "2023-12-10",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
    tags: ["GraphQL", "REST", "API"]
  },
  {
    id: 16,
    title: "Cybersecurity in Web Development",
    snippet: "Essential cybersecurity practices every web developer should implement to protect user data.",
    author: "Daniel Kim",
    date: "2023-12-08",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop",
    tags: ["Cybersecurity", "Web Security", "Privacy"]
  },
  {
    id: 17,
    title: "Agile Development Methodology",
    snippet: "Learn agile principles and practices to improve team collaboration and project delivery.",
    author: "Rachel Green",
    date: "2023-12-05",
    coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop",
    tags: ["Agile", "Project Management", "Methodology"]
  },
  {
    id: 18,
    title: "Progressive Web Apps (PWA)",
    snippet: "Build web applications that work like native mobile apps with PWA technologies.",
    author: "Mark Thompson",
    date: "2023-12-03",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=400&fit=crop",
    tags: ["PWA", "Mobile", "Web Apps"]
  }
];

const Blog = () => {

  const faqRef = useRef<HTMLDivElement | null>(null);

  const scrollToFAQ = () => {
    faqRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [randomBlogs, setRandomBlogs] = useState<typeof allBlogs>([]);
  const blogsPerPage = 15;

  // Calculate pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(allBlogs.length / blogsPerPage);

  // Generate random blogs for sidebar
  useEffect(() => {
    const shuffled = [...allBlogs].sort(() => 0.5 - Math.random());
    setRandomBlogs(shuffled.slice(0, 5));
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <BlogGrid 
              blogs={currentBlogs}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <BlogSidebar blogs={randomBlogs} />
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
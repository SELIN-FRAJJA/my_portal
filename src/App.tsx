import { useState, useEffect } from 'react';
import { Award, Menu, X, Github, Linkedin, Mail, Phone, MapPin, Calendar, Code, Palette, Database, ChevronDown, Zap, Heart, User, Brain, Network } from 'lucide-react';
import { Eye } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState('');


  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'certification', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);

      // Intersection Observer for animations
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;
          setIsVisible(prev => ({ ...prev, [section]: isInView }));
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const openModal = (image: string) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
  setSelectedImage(undefined);
  setShowModal(false);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(''); // Reset success message on new submission attempt

    try {
      console.log("Sending contact form:", formData);

      const res = await fetch('https://portfolio-backend-vg5u.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message.');
      }
    } catch (err) {
      alert('Error sending message.');
    }
  };

  const skills = [
    { name: 'Python', level: 95, icon: Code, color: 'from-yellow-400 to-orange-500' },
    { name: 'Artificial Intelligence', level: 95, icon: Brain, color: 'from-blue-400 to-cyan-500' },
    { name: 'C++', level: 80, icon: Code, color: 'from-green-400 to-blue-500' },
    { name: 'React', level: 80, icon: Palette, color: 'from-purple-400 to-pink-500' },
    { name: 'Data Structures and Algorithm', level: 75, icon: Network, color: 'from-pink-400 to-red-500' },
    { name: 'MongoDB', level: 70, icon: Database, color: 'from-emerald-400 to-teal-500' }
  ];

  const projects = [
    {
      title: "Internship Portal for NITT",
      description: "A web platform built for NIT Trichy to streamline student-internship matching, including resume uploads, offer tracking, and admin dashboards.",
      tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      image: "/nitt.png",
      gradient: "from-purple-500 via-pink-500 to-blue-500"
    },
    {
      title: "AI-Based Lip Sync",
      description: "An AI system that synchronizes lip movement with dubbed speech using deep learning and facial landmark tracking for realistic output.",
      tech: ["Python", "OpenCV", "Deep Learning"],
      image: "/lip.png",
      github: "https://github.com/SELIN-FRAJJA/LipSync",
      gradient: "from-green-400 via-teal-400 to-blue-400"
    },
    {
      title: "Interview Chatbot",
      description: "A virtual interview assistant that conducts real-time mock interviews, detects emotions, and gives feedback with analytics.",
      tech: ["Python", "HTML/CSS", "Emotion Detection", "Deep Learning"],
      image: "/interview.png",
      github: "https://github.com/SELIN-FRAJJA/Interview-Chatbot",
      gradient: "from-blue-500 via-purple-500 to-indigo-500"
    },
    {
      title: "Medical Chatbot",
      description: "AI-powered chatbot for initial medical diagnosis based on symptom analysis using NLP techniques and a curated symptom database(Team).",
      tech: ["Python", "Flask", "Streamlit", "NLTK"],
      image: "/medibot.jpg",
      github: "https://github.com/SELIN-FRAJJA/SFM-Project",
      gradient: "from-blue-500 via-blue-200 to-white"
    },
    {
      title: "Agriculture Bot",
      description: "A real-time weed detection and treatment bot built for small farmers using image processing, Raspberry Pi, and ROS integration.",
      tech: ["OpenCV", "Python", "Raspberry Pi", "YOLO"],
      image: "/agribot.jpg",
      github: "https://github.com/SELIN-FRAJJA/Real-time-weed-detection",
      gradient: "from-lime-400 via-green-500 to-emerald-500"
    },
    {
      title: "Face Recognition Attendance System",
      description: "A smart attendance system that records in-time, out-time, and calculates daily wages with a salary dashboard using facial recognition.",
      tech: ["Python", "OpenCV", "Excel"],
      image: "/facereco.jpg",
      github: "https://github.com/SELIN-FRAJJA/Face-Attendance-System",
      gradient: "from-pink-300 via-sky-300 to-fuchsia-400"
    },
    {
      title: "Lung Cancer Classification",
      description: "A machine learning model designed to classify different types of lung tumors from CT scan images, aiding in accurate diagnosis and treatment planning through automated image analysis.",
      tech: ["Python", "ML", "Image Processing"],
      image: "/lungs.jpg",
      gradient: "from-yellow-400 via-orange-500 to-red-500"
    }
  ];

  const groupedCertificates = [

  {
    title: "National Institute of Technology Trichy Internship",
    issuer: "Internship",
    date: "Nov, 2024 - Jan, 2025 & May, 2025 - June, 2025",
    images: ["/certificates/nit.png", "/certificates/nit2.png"],
  },  
  {
    title: "Google AI-ML Virtual Internship",
    issuer: "AICTE Eduskill",
    date: "2024, 2025",
    images: [
      "/certificates/aicte1.png",
      "/certificates/aicte2.png"
    ],
  },
  {
    title: "MongoDB Basics for Students",
    issuer: "MongoDB University",
    date: "2025",
    images: ["/certificates/mongo.png"],
  },
  {
    title: "Parallel Computer Architecture",
    issuer: "NPTEL",
    date: "2025",
    images: ["/certificates/nptel.png"],
  },
  {
    title: "Algorithm on graphs and strings",
    issuer: "Coursera",
    date: "2023",
    images: ["/certificates/coursera1.jpeg", "/certificates/coursera2.jpeg"],
  },
  {
    title: "CyberSecurity Courses",
    issuer: "Cisco",
    date: "2023",
    images: ["/certificates/cisco1.png", "/certificates/cisco2.png", "/certificates/cisco3.png"],
  },
  {
    title: "Skillathon",
    issuer: "UiPath Acedemic",
    date: "2023",
    images: ["/certificates/skillathon.png"],
  },
];
  
    return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-30 animate-pulse animation-delay-4000"></div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Mouse follower */}
      <div 
        className="fixed w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 opacity-30 transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${isMenuOpen ? 1.5 : 1})`
        }}
      ></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Portfolio
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Education', 'Certification', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 hover:scale-110 relative ${
                    activeSection === item.toLowerCase()
                      ? 'text-purple-600'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 animate-slideInLeft"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 animate-slideDown bg-white">
              {['Home', 'About', 'Skills', 'Projects', 'Education', 'Certification', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible.home ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-medium animate-fadeInUp">
                  <User size={16} className="mr-2" />
                  Pre-Final Year Student
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Hi, I'm <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">Selin Frajja </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 font-light animate-fadeInUp animation-delay-500">
                  Aspiring Software Developer & Tech Enthusiast
                </p>
                <p className="text-lg text-gray-700 leading-relaxed animate-fadeInUp animation-delay-1000">
                  Passionate about building meaningful projects in full-stack development and exploring AI solutions.
                   Currently studying Computer Science and building practical, real-world solutions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-1500">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
                >
                  <span className="flex items-center gap-2">
                    View My Work
                    <Zap size={20} className="group-hover:animate-bounce" />
                  </span>
                </button>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <button className="group px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 transform">
                    <Eye size={20} className="group-hover:animate-pulse" />
                    View Resume
                  </button>
                </a>
              </div>

              <div className="flex gap-6 animate-fadeInUp animation-delay-2000">
                <a
                  href="https://github.com/SELIN-FRAJJA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-gray-100 rounded-full text-gray-600 hover:text-purple-600 hover:bg-purple-100 transition-all duration-300 hover:scale-110 transform"
                >
                  <Github size={24} className="group-hover:animate-spin" />
                </a>
                <a
                  href="https://www.linkedin.com/in/selin-frajja-s-2985ba293/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-gray-100 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-100 transition-all duration-300 hover:scale-110 transform"
                >
                  <Linkedin size={24} className="group-hover:animate-bounce" />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=selinfrajjas.aiml2023@citchennai.net&su=Contact%20via%20Portfolio&body=Hi%20there%2C%20I%20saw%20your%20portfolio%20and..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-gray-100 rounded-full text-gray-600 hover:text-pink-600 hover:bg-pink-100 transition-all duration-300 hover:scale-110 transform"
                >
                  <Mail size={24} className="group-hover:animate-pulse" />
                </a>

              </div>
            </div>

            <div className={`relative ${isVisible.home ? 'animate-slideInRight' : 'opacity-0'}`}>
              <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 shadow-2xl shadow-purple-500/20 animate-float relative overflow-hidden">
                
                {/* Profile Image */}
                <img 
                  src="/profile.jpg" 
                  alt="Selin Profile" 
                  className="w-full h-full object-cover rounded-full" 
                />

                {/* Optional gradient overlay for aesthetic effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 opacity-20 mix-blend-multiply"></div>
              </div>

              {/* Decorative animated dots */}
              <div className="absolute top-10 right-10 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-20 left-10 w-6 h-6 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 right-0 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
            </div>

          </div>

          <div className="text-center mt-16 animate-fadeInUp animation-delay-2500">
            <ChevronDown 
              size={32} 
              className="mx-auto text-purple-600 animate-bounce cursor-pointer hover:text-pink-600 transition-colors duration-300 hover:scale-125 transform"
              onClick={() => scrollToSection('about')}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className={`text-center mb-16 ${isVisible.about ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto"></div>
          </div>

          {/* Main Grid for Text and Stats */}
          <div className="max-w-4xl mx-auto space-y-6">
            {/* About Text */}
            <div className={`space-y-6 ${isVisible.about ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a pre-final year Computer Science (AIML) student at Chennai Institute of Technology with a deep interest in technology and innovation. Ever since I began my journey in programming, I’ve been driven by a curiosity to explore, learn, and build solutions that make a difference.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My interests span across full-stack web development, artificial intelligence, and system design. I enjoy creating intuitive, scalable, and efficient applications using modern tools and frameworks, always keeping the end-user in focus. I have also worked as an intern at NIT Trichy, where I had the opportunity to work on some fascinating projects that strengthened my practical skills in AI and deep learning.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Outside of coding, I’m passionate about exploring emerging technologies, taking part in hackathons, and engaging in collaborative tech initiatives. I constantly seek opportunities to grow, solve real-world problems, and connect with like-minded individuals.
              </p>


              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-purple-100 hover:scale-105 transform transition-all duration-300 hover:shadow-purple-500/10">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">10+</div>
                  <div className="text-gray-600 mt-2">Projects Completed</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-blue-100 hover:scale-105 transform transition-all duration-300 hover:shadow-blue-500/10">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">8.6/10</div>
                  <div className="text-gray-600 mt-2">Current GPA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Info Cards Below Text */}
          <div className={`flex flex-col md:flex-row justify-center gap-6 mt-12 ${isVisible.about ? 'animate-slideInUp' : 'opacity-0'}`}>
            
            {/* Location */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 transform">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin size={20} className="text-purple-600" />
                </div>
                Location
              </h3>
              <p className="text-gray-700">Chennai Institute of Technology, Kundrathur, Chennai, Tamil Nadu, India</p>
              <br></br><p className="text-gray-700"><strong>Home: </strong>Gomathipuram, Madurai, Tamil Nadu, India</p>
            </div>

            {/* Internship Experience */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105 transform">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar size={20} className="text-blue-600" />
                </div>
                Internship Experience
              </h3>
              <p className="text-gray-700 mb-2">
                I had the opportunity to work as an intern at <strong>NIT Trichy</strong>, where I contributed to several impactful projects:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  ✨ Developed an <span className="hover:text-blue-600 transition-colors duration-200">Intern Portal</span> for NIT to streamline internship management.
                </li>
                <li>
                  🎥 Built an <span className="hover:text-red-600 transition-colors duration-200">AI-based Lip Syncing System</span> using deep learning and computer vision.
                </li>
                <li>
                  💬 Created an <span className="hover:text-green-600 transition-colors duration-200">Interview Chatbot</span> powered by machine learning for smart candidate interaction.
                </li>
              </ul>

            </div>


            {/* Interests */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-pink-500/10 transition-all duration-300 hover:scale-105 transform">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Heart size={20} className="text-pink-600" />
                </div>
                Interests
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>💡 Exploring innovative solutions in Artificial Intelligence and Machine Learning.</li>
                <li>🌐 Building user-friendly web applications and robust system designs.</li>
                <li>📱 Developing intuitive and engaging mobile apps.</li>
                <li>🌍 Contributing to open-source projects and collaborating with the global developer community.</li>
                <li>🚀 Staying updated with emerging technologies and participating in hackathons and tech meetups.</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${isVisible.skills ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-lg transition-all duration-500 hover:scale-105 transform group ${
                  isVisible.skills ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                    <skill.icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Proficiency</span>
                    <span className="text-sm font-medium text-gray-900">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-2000 ease-out`}
                      style={{ 
                        width: isVisible.skills ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 300}ms`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-16 text-center ${isVisible.skills ? 'animate-fadeInUp animation-delay-1000' : 'opacity-0'}`}>
            <h3 className="text-xl font-semibold text-gray-900 mb-8">Additional Technologies</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['Git & GitHub', 'Full Stack', 'AWS', 'Gen AI', 'HTML', 'CSS', 'Pytorch', 'Tensorflow', 'Node.js', 'Computer Vision', 'Streamlit'].map((tech, index) => (
                <span 
                  key={tech} 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full border border-gray-200 hover:bg-purple-100 hover:text-purple-700 hover:border-purple-300 hover:scale-110 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${isVisible.projects ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-600 to-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showAllProjects ? projects : projects.slice(0, 3)).map((project, index) => (
              <div 
                key={index} 
                className={`group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${
                  isVisible.projects ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}></div>
                  {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Star size={32} className="text-white animate-spin" />
                  </div> */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full border border-purple-200 hover:bg-purple-200 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.github && (
                    <a
                      href={project.github}
                      className="group/link flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-110 transform"
                    >
                      <Github size={18} className="group-hover/link:animate-spin" />
                      <span className="text-sm">Code</span>
                    </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-12 ${isVisible.projects ? 'animate-fadeInUp animation-delay-1000' : 'opacity-0'}`}>
            {!showAllProjects && (
              <button
                onClick={() => setShowAllProjects(true)}
                className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-105 transform"
              >
                View All Projects
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${isVisible.education ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className={`bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:scale-105 transform ${
              isVisible.education ? 'animate-slideInUp' : 'opacity-0'
            }`}>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Award size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    Bachelor of Engineering in Computer Science
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Specialized in Artificial Intelligence and Machine Learning
                  </p>

                  <p className="text-emerald-600 font-medium mb-2">Chennai Institute of Technology</p>
                  <p className="text-gray-600 mb-4">2023 - 2027 (Expected)</p>
                  <p className="text-gray-700 mb-4">
                    Currently in pre-final year with a GPA of 8.6/10. Relevant coursework includes 
                    Data Structures & Algorithms, Software Engineering, Database Systems, 
                    Web Development, and Computer Networks.
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Achievements:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li className="hover:text-purple-600 transition-colors duration-300">Awarded Special Prize in TNWISE’25 Hackathon</li>
                      <li className="hover:text-blue-600 transition-colors duration-300">Offered an Internship at Techdivathon’25 Hackathon (24 hours)</li>
                      <li className="hover:text-pink-600 transition-colors duration-300">Runner-up in Electrothon’24</li>
                      <li className="hover:text-emerald-600 transition-colors duration-300">Finalist in Smart Hack’24 Hackathon (48 hours)</li>
                      <li className="hover:text-yellow-600 transition-colors duration-300">Participant in Google Charcha’24</li>
                    </ul>
                    <br></br>

                  <div className="max-w-xl mx-auto bg-violet-100/60 rounded-2xl p-6 shadow-lg border border-violet-200 backdrop-blur-sm">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                        alt="LeetCode"
                        className="w-10 h-10 rounded-full bg-white border object-contain"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-purple-800">LeetCode Achievements</h3>
                        <a
                          href="https://leetcode.com/u/Selin_Frajja_S/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-600 hover:underline flex items-center gap-1"
                        >
                          View Profile
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7m0 0L10 21l-7-7 11-11z" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* Achievement Cards */}
                    <div className="space-y-4">
                      {/* Problems Solved */}
                      <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
                        <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Problems Solved</p>
                          <p className="text-lg font-bold text-gray-900">500+</p>
                        </div>
                      </div>

                      {/* Badges Earned */}
                      <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
                        <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Badges Earned</p>
                          <p className="text-lg font-bold text-gray-900">17</p>
                        </div>
                      </div>

                      {/* Streak */}
                      <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
                        <div className="bg-green-100 text-green-600 p-3 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M4 11h16M4 19h16M4 15h16" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Problem-Solving Streak</p>
                          <p className="text-lg font-bold text-gray-900">335+ days</p>
                        </div>
                      </div>

                      {/* Contest Rating */}
                      <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
                        <div className="bg-pink-100 text-pink-600 p-3 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Contest Rating</p>
                          <p className="text-lg font-bold text-gray-900">1650+</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications*/}
      <section id="certification" className="relative py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible.certification ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Certifications</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-emerald-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {groupedCertificates.map((cert, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform hover:scale-105 duration-300 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{cert.title}</h3>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
                {cert.date && <p className="text-xs text-gray-500 mt-1">{cert.date}</p>}
              </div>

              <div className="p-4">
                {cert.images.length === 1 && (
                  <img
                    src={cert.images[0]}
                    alt="Certificate"
                    className="w-full h-auto max-h-72 object-contain rounded-md border cursor-pointer"
                    onClick={() => openModal(cert.images[0])}
                  />
                )}

                {cert.images.length === 2 && (
                  <div className="grid grid-cols-2 gap-2">
                    {cert.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Certificate ${idx + 1}`}
                        className="w-full h-40 object-cover rounded-md border cursor-pointer"
                        onClick={() => openModal(img)}
                      />
                    ))}
                  </div>
                )}

                {cert.images.length === 3 && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <img
                        src={cert.images[0]}
                        alt="Certificate 1"
                        className="w-full h-40 object-cover rounded-md border cursor-pointer"
                        onClick={() => openModal(cert.images[0])}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {cert.images.slice(1).map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Certificate ${idx + 2}`}
                          className="w-full h-20 object-cover rounded-md border cursor-pointer"
                          onClick={() => openModal(img)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {cert.images.length > 3 && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <img
                        src={cert.images[0]}
                        alt="Certificate 1"
                        className="w-full h-40 object-cover rounded-md border cursor-pointer"
                        onClick={() => openModal(cert.images[0])}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {cert.images.slice(1, 3).map((img, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={img}
                            alt={`Certificate ${idx + 2}`}
                            className="w-full h-20 object-cover rounded-md border cursor-pointer"
                            onClick={() => openModal(img)}
                          />
                          {idx === 1 && cert.images.length > 3 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center text-white font-semibold text-lg">
                              +{cert.images.length - 3}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
        {showModal && selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-5xl w-[90%]">
              
              {/* ❌ Close Button */}
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedImage(undefined);
                }}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl font-bold z-50"
              >
                ✕
              </button>

              {/* 📄 Optimized Image */}
              <img
                src={selectedImage}
                alt="Full Certificate"
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-xl border-4 border-white shadow-2xl mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>


      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${isVisible.contact ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className={`space-y-8 ${isVisible.contact ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 transform group">
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                  <Mail size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-700">selinfrajjas.aiml2023@citchennai.net</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105 transform group">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
                  <Phone size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-700">+91 7010084624</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-pink-500/10 transition-all duration-300 hover:scale-105 transform group">
                <div className="p-3 bg-pink-100 rounded-xl group-hover:bg-pink-200 transition-colors duration-300">
                  <MapPin size={24} className="text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-700">Chennai, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="flex gap-6 justify-center md:justify-start">
                <a
                  href="https://github.com/SELIN-FRAJJA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-gray-100 rounded-full text-gray-600 hover:text-purple-600 hover:bg-purple-100 transition-all duration-300 hover:scale-110 transform"
                >
                  <Github size={24} className="group-hover:animate-spin" />
                </a>
                <a
                  href="https://www.linkedin.com/in/selin-frajja-s-2985ba293/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-gray-100 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-100 transition-all duration-300 hover:scale-110 transform"
                >
                  <Linkedin size={24} className="group-hover:animate-bounce" />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=selinfrajjas.aiml2023@citchennai.net&su=Contact%20via%20Portfolio&body=Hi%20there%2C%20I%20saw%20your%20portfolio%20and..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-gray-100 rounded-full text-gray-600 hover:text-pink-600 hover:bg-pink-100 transition-all duration-300 hover:scale-110 transform"
                >
                  <Mail size={24} className="group-hover:animate-pulse" />
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={`space-y-6 ${isVisible.contact ? 'animate-slideInRight' : 'opacity-0'}`}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 ..."
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 ..."
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 ..."
                  placeholder="Tell me about your project or opportunity..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="group w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
              >
                <span className="flex items-center justify-center gap-2">
                  Send Message
                  <Zap size={20} className="group-hover:animate-bounce" />
                </span>
              </button>

              {success && (
                <div className="flex items-center justify-between p-4 mt-4 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg animate-fadeIn transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">{success}</span>
                  </div>
                  <button
                    className="text-white hover:text-gray-200 text-xl font-bold"
                    onClick={() => setSuccess('')}
                  >
                    ×
                  </button>
                </div>
              )}

            </form>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Selin Frajja. Built with React and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
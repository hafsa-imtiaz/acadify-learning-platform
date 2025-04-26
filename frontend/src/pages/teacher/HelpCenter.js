import React, { useState } from 'react';
import { Search, Phone, Mail, ChevronDown, ChevronUp, BookOpen, Play, HelpCircle, Users, Calendar, FileText, Book, Award, Zap, Bell, Download, BarChart, Globe, MessageCircle } from 'lucide-react';
import '../../css/teacher/help-center.css';
import TeacherLayout from '../../components/teacher/sidebar';

export default function InstructorHelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeResourceCategory, setActiveResourceCategory] = useState('all');
  
  const faqs = [
    {
      id: 1,
      question: "How do I create a new course?",
      answer: "To create a new course, navigate to the 'Courses' tab in your instructor dashboard and click on the '+ New Course' button. Follow the step-by-step wizard to set up your course details, syllabus, and content structure."
    },
    {
      id: 2,
      question: "How can I upload video lectures?",
      answer: "You can upload video lectures by going to the content section of your course, selecting the appropriate module, and clicking 'Add Content' > 'Video Lecture'. Our system supports MP4, MOV, and AVI formats, with a maximum file size of 2GB per video."
    },
    {
      id: 3,
      question: "How do I grade assignments?",
      answer: "Access student submissions from the 'Assignments' tab in your course dashboard. You can view, download, and provide feedback on each submission. Use our rubric feature for consistent grading across all students."
    },
    {
      id: 4,
      question: "How can I interact with my students?",
      answer: "You can interact with students through course announcements, discussion forums, and direct messages. To foster community engagement, we recommend posting weekly announcements and actively participating in forum discussions."
    },
    {
      id: 5,
      question: "How do I set up quizzes and assessments?",
      answer: "To create assessments, go to your course content and select 'Add Content' > 'Quiz/Assessment'. You can create multiple-choice, true/false, short answer, and essay questions. Set time limits, attempt restrictions, and automated feedback options."
    }
  ];

  const resourceCategories = [
    { id: 'all', name: 'All Resources' },
    { id: 'guides', name: 'Guides & Documentation' },
    { id: 'tutorials', name: 'Video Tutorials' },
    { id: 'tools', name: 'Instructor Tools' },
    { id: 'community', name: 'Community & Support' }
  ];
  
  const resources = [
    {
      title: "Instructor Guide",
      icon: <BookOpen className="resource-icon" />,
      description: "Complete documentation on creating effective courses",
      category: "guides"
    },
    {
      title: "Video Tutorials",
      icon: <Play className="resource-icon" />,
      description: "Step-by-step video guides for all platform features",
      category: "tutorials"
    },
    {
      title: "Teaching Best Practices",
      icon: <Users className="resource-icon" />,
      description: "Tips and strategies for online teaching success",
      category: "guides"
    },
    {
      title: "Course Design Templates",
      icon: <Book className="resource-icon" />,
      description: "Ready-to-use templates for different course types",
      category: "tools"
    },
    {
      title: "Assessment Builder",
      icon: <Award className="resource-icon" />,
      description: "Tools for creating effective quizzes and assignments",
      category: "tools"
    },
    {
      title: "Content Creation Guide",
      icon: <Zap className="resource-icon" />,
      description: "Best practices for engaging educational content",
      category: "guides"
    },
    {
      title: "Announcement Templates",
      icon: <Bell className="resource-icon" />,
      description: "Templates for course announcements and communications",
      category: "tools"
    },
    {
      title: "Downloadable Assets",
      icon: <Download className="resource-icon" />,
      description: "Graphics, icons, and resources for your courses",
      category: "tools"
    },
    {
      title: "Analytics Explained",
      icon: <BarChart className="resource-icon" />,
      description: "Making the most of course analytics and student data",
      category: "guides"
    },
    {
      title: "Global Teaching Standards",
      icon: <Globe className="resource-icon" />,
      description: "International best practices for online education",
      category: "guides"
    },
    {
      title: "Student Engagement Videos",
      icon: <Play className="resource-icon" />,
      description: "Video tutorials on increasing student participation",
      category: "tutorials"
    },
    {
      title: "Instructor Community",
      icon: <MessageCircle className="resource-icon" />,
      description: "Connect with fellow instructors for support and ideas",
      category: "community"
    }
  ];

  const toggleFaq = (id) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResources = resources.filter(resource => 
    activeResourceCategory === 'all' || resource.category === activeResourceCategory
  );

  return (
    <TeacherLayout>
    <div className="help-center">
      <div className="container">
        <div className="header">
          <div>
          <h1>Instructor Help Center</h1>
          </div>
          <p>Find answers, resources, and support to help you create exceptional learning experiences</p>
          
        </div>

        <div className="support-options">
          <div className="support-card phone">
            <Phone className="card-icon" size={24} />
            <h3>Phone Support</h3>
            <p className="card-desc">Speak with our instructor support team</p>
            <p className="card-primary">+92 336-xxxxxxx</p>
            <p className="card-secondary">Mon-Fri, 9AM-5PM GST</p>
          </div>
          
          <div className="support-card email">
            <Mail className="card-icon" size={24} />
            <h3>Email Support</h3>
            <p className="card-desc">Get help via email within 24 hours</p>
            <p className="card-primary">support@acadify.com</p>
            <p className="card-secondary">Available 24/7</p>
          </div>
          
          <div className="support-card chat">
            <HelpCircle className="card-icon" size={24} />
            <h3>Live Chat</h3>
            <p className="card-desc">Immediate assistance for urgent issues</p>
            <button className="btn-primary">Start Chat</button>
            <p className="card-secondary">Available 9AM-8PM GST</p>
          </div>
        </div>
        
        <div className="search-container">
            <div className="search-box">
              <Search className="search-icon" size={20} /> 
              <input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        <div className="panel faq-panel">
          <h2>Frequently Asked Questions</h2>
          
          {filteredFaqs.length > 0 ? (
            <div className="faq-list">
              {filteredFaqs.map(faq => (
                <div key={faq.id} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(faq.id)}>
                    <span>{faq.question}</span>
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p className="no-results-primary">No results found for "{searchQuery}"</p>
              <p className="no-results-secondary">Try using different keywords or browse the categories below</p>
            </div>
          )}
        </div>
        
        <div className="panel resources-panel">
          <h2>Instructor Resources</h2>
          
          <div className="category-filters">
            {resourceCategories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeResourceCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveResourceCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="resources-grid">
            {filteredResources.map((resource, index) => (
              <div key={index} className="resource-card">
                <div className="resource-header">
                  {resource.icon}
                  <h3>{resource.title}</h3>
                </div>
                <p>{resource.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="help-request">
          <div className="help-request-content">
            <FileText className="help-icon" size={24} />
            <div>
              <h3>Can't find what you're looking for?</h3>
              <p>
                Submit a detailed help request and our instructor support team will get back to you within 24 hours.
              </p>
              <button className="btn-secondary">Submit Support Request</button>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Instructor Dashboard</a></li>
              <li><a href="#">Course Manager</a></li>
              <li><a href="#">Analytics Center</a></li>
              <li><a href="#">Community Forum</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Training Calendar</h3>
            <p className="footer-desc">Join our upcoming instructor webinars</p>
            <div className="calendar-events">
              <p>• May 3: Creating Engaging Video Content</p>
              <p>• May 10: Advanced Quiz Strategies</p>
              <p>• May 17: Student Retention Techniques</p>
            </div>
            <a href="#" className="calendar-link">View Full Calendar →</a>
          </div>
          <div className="footer-section">
            <h3>Need More Help?</h3>
            <p className="footer-desc">Schedule a 1:1 consultation with our instructional design team</p>
            <button className="btn-outline">Book Consultation</button>
          </div>
        </div>
      </div>
    </div>
    </TeacherLayout>
  );
}
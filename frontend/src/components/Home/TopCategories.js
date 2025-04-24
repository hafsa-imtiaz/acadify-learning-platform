import React from 'react';
import '../../css/Home/topcategories.css';
import { Code, PenTool, Briefcase, Database, Cpu, TrendingUp, Music, BookOpen } from 'lucide-react';

const CategoryCard = ({ icon, title, courseCount, color }) => {
  const barClass = `color-bar ${color}`;
  const iconBgClass = `icon-background ${color}-light`;
  const iconTextClass = `icon-color ${color}-text`;

  return (
    <div className="category-card">
      <div className={barClass}></div>
      <div className="category-content">
        <div className={iconBgClass}>
          <div className={iconTextClass}>{icon}</div>
        </div>
        <h3 className="category-title">{title}</h3>
        <p className="category-subtitle">{courseCount} courses</p>
      </div>
    </div>
  );
};

const TopCategories = () => {
  const categories = [
    { id: 1, icon: <Code className="icon" />, title: "Programming & Development", courseCount: 425, color: "blue" },
    { id: 2, icon: <PenTool className="icon" />, title: "Design & Creativity", courseCount: 310, color: "purple" },
    { id: 3, icon: <Briefcase className="icon" />, title: "Business & Management", courseCount: 280, color: "yellow" },
    { id: 4, icon: <Database className="icon" />, title: "Data Science & Analytics", courseCount: 250, color: "green" },
    { id: 5, icon: <Cpu className="icon" />, title: "Artificial Intelligence", courseCount: 180, color: "red" },
    { id: 6, icon: <TrendingUp className="icon" />, title: "Marketing & Digital Media", courseCount: 210, color: "orange" },
    { id: 7, icon: <Music className="icon" />, title: "Music & Audio Production", courseCount: 150, color: "pink" },
    { id: 8, icon: <BookOpen className="icon" />, title: "Language & Humanities", courseCount: 195, color: "teal" }
  ];

  return (
    <section className="top-categories-section">
      <div className="top-categories-container">
        <div className="top-categories-header">
          <h2 className="section-title">Top Categories</h2>
          <p className="section-subtitle">
            Explore our most popular categories and find the perfect course for you
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>

        <div className="view-all">
          <a href="#" className="view-all-link">
            View All Categories
            <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TopCategories;

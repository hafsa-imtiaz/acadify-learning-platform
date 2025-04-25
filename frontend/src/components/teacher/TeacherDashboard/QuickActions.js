import React from 'react';
import { 
  BookOpen, 
  FilePlus, 
  MessageSquare, 
  Video, 
  FileText, 
  Users, 
  BarChart2, 
  Settings 
} from 'lucide-react';
import '../../../css/teacher/Dashboard/QuickActions.css';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      icon: <BookOpen size={24} />,
      title: 'Create Course',
      description: 'Start a new course from scratch',
      color: 'blue'
    },
    {
      id: 2,
      icon: <FilePlus size={24} />,
      title: 'Add Content',
      description: 'Upload lectures or resources',
      color: 'green'
    },
    {
      id: 3,
      icon: <MessageSquare size={24} />,
      title: 'Discussions',
      description: 'Monitor student conversations',
      color: 'purple'
    },
    {
      id: 4,
      icon: <Video size={24} />,
      title: 'Schedule Live',
      description: 'Plan a new live session',
      color: 'red'
    },
    {
      id: 5,
      icon: <FileText size={24} />,
      title: 'Assignments',
      description: 'Create or review assignments',
      color: 'orange'
    },
    {
      id: 6,
      icon: <Users size={24} />,
      title: 'Students',
      description: 'Manage course enrollments',
      color: 'teal'
    },
    {
      id: 7,
      icon: <BarChart2 size={24} />,
      title: 'Reports',
      description: 'View detailed analytics',
      color: 'indigo'
    },
    {
      id: 8,
      icon: <Settings size={24} />,
      title: 'Settings',
      description: 'Manage your account',
      color: 'gray'
    }
  ];

  return (
    <div className="quick-actions-container">
      <div className="actions-grid">
        {actions.map((action) => (
          <div key={action.id} className={`action-card action-${action.color}`}>
            <div className="action-icon">
              {action.icon}
            </div>
            <div className="action-content">
              <h3 className="action-title">{action.title}</h3>
              <p className="action-description">{action.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
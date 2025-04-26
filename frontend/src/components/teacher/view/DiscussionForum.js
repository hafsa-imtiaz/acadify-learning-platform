import React, { useState, useEffect } from 'react';
import '../../../css/teacher/view/discussion.css';

const CourseDiscussionForum = () => {
  // Initial mock data for discussions
  const initialDiscussions = [
    {
      id: 1,
      title: "How do I submit the final project?",
      author: "Emma Johnson",
      authorInitials: "EJ",
      date: "April 25, 2025",
      content: "I'm confused about the submission process for the final project. Do we need to submit both the code and presentation slides? Also, is the deadline still May 5th?",
      comments: [
        {
          id: 101,
          author: "Professor Davis",
          authorInitials: "PD",
          date: "April 25, 2025",
          content: "Yes, you need to submit both the code and the presentation slides. The deadline is indeed May 5th, 11:59 PM.",
          likes: 3,
          isLiked: false
        },
        {
          id: 102,
          author: "Alex Wong",
          authorInitials: "AW",
          date: "April 25, 2025",
          content: "Thanks for asking this! I was wondering the same thing.",
          likes: 1,
          isLiked: false
        }
      ],
      likes: 7,
      isLiked: false,
      showComments: false
    },
    {
      id: 2,
      title: "Resources for data visualization section",
      author: "Michael Chen",
      authorInitials: "MC",
      date: "April 24, 2025",
      content: "I found these amazing resources for the data visualization section of Module 3. They have interactive examples and detailed explanations that really helped me understand the concepts better. Has anyone else found useful resources?",
      comments: [
        {
          id: 201,
          author: "Jamie Wilson",
          authorInitials: "JW",
          date: "April 24, 2025",
          content: "Could you share the links to these resources? That would be super helpful!",
          likes: 4,
          isLiked: false
        }
      ],
      likes: 12,
      isLiked: false,
      showComments: false
    },
    {
      id: 3,
      title: "Study group for mid-term exam",
      author: "Sarah Williams",
      authorInitials: "SW",
      date: "April 22, 2025",
      content: "Would anyone be interested in forming a virtual study group for the upcoming mid-term exam? We could meet twice a week to review concepts and practice problems. Leave a comment if you'd like to join!",
      comments: [
        {
          id: 301,
          author: "David Lee",
          authorInitials: "DL",
          date: "April 22, 2025",
          content: "I'd love to join! How about meeting on Tuesdays and Thursdays?",
          likes: 1,
          isLiked: false
        },
        {
          id: 302,
          author: "Priya Patel",
          authorInitials: "PP",
          date: "April 22, 2025",
          content: "Count me in! Those days work for me too.",
          likes: 0,
          isLiked: false
        }
      ],
      likes: 15,
      isLiked: false,
      showComments: false
    }
  ];

  // State management
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newComments, setNewComments] = useState({});

  // Handle discussion likes
  const handleLike = (discussionId) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          isLiked: !discussion.isLiked,
          likes: discussion.likes + (discussion.isLiked ? -1 : 1)
        };
      }
      return discussion;
    }));
  };

  // Toggle comments visibility
  const toggleComments = (discussionId) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          showComments: !discussion.showComments
        };
      }
      return discussion;
    }));
  };

  // Show comment form and focus
  const showCommentForm = (discussionId) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          showComments: true
        };
      }
      return discussion;
    }));
  };

  // Handle comment likes
  const handleCommentLike = (discussionId, commentId) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        const updatedComments = discussion.comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.likes + (comment.isLiked ? -1 : 1)
            };
          }
          return comment;
        });
        
        return {
          ...discussion,
          comments: updatedComments
        };
      }
      return discussion;
    }));
  };

  // Handle new comment input change
  const handleCommentChange = (discussionId, value) => {
    setNewComments({
      ...newComments,
      [discussionId]: value
    });
  };

  // Add a new comment
  const addComment = (discussionId) => {
    const commentText = newComments[discussionId]?.trim();
    
    if (!commentText) return;
    
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        // Generate new comment ID
        const maxCommentId = Math.max(...discussion.comments.map(c => c.id), 0);
        
        const today = new Date();
        const date = today.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        });
        
        const newComment = {
          id: maxCommentId + 1,
          author: "You",
          authorInitials: "YO",
          date: date,
          content: commentText,
          likes: 0,
          isLiked: false
        };
        
        return {
          ...discussion,
          comments: [...discussion.comments, newComment]
        };
      }
      return discussion;
    }));
    
    // Clear the input
    setNewComments({
      ...newComments,
      [discussionId]: ''
    });
  };

  // Add a new discussion
  const addNewDiscussion = (e) => {
    e.preventDefault();
    
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    
    const today = new Date();
    const date = today.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    // Generate new discussion ID
    const maxDiscussionId = Math.max(...discussions.map(d => d.id), 0);
    
    const newDiscussion = {
      id: maxDiscussionId + 1,
      title: newPostTitle,
      author: "You",
      authorInitials: "YO",
      date: date,
      content: newPostContent,
      comments: [],
      likes: 0,
      isLiked: false,
      showComments: false
    };
    
    // Add to beginning of array
    setDiscussions([newDiscussion, ...discussions]);
    
    // Clear inputs
    setNewPostTitle('');
    setNewPostContent('');
  };

  return (
    <div className="discussion-container">
      <header>
        <h1>Course Discussion Forum</h1>
      </header>
      
      <div className="new-discussion-card">
        <form onSubmit={addNewDiscussion}>
          <div className="input-group">
            <label htmlFor="post-title">Title</label>
            <input 
              type="text" 
              id="post-title" 
              placeholder="What's your discussion about?" 
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="post-content">Content</label>
            <textarea 
              id="post-content" 
              placeholder="Share your thoughts, questions or insights..." 
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="post-btn">Post Discussion</button>
        </form>
      </div>
      
      <div className="discussions-list">
        {discussions.length === 0 ? (
          <div className="empty-state">
            <p>No discussions yet. Be the first to start a conversation!</p>
          </div>
        ) : (
          discussions.map(discussion => (
            <div key={discussion.id} className="discussion-card">
              <div className="discussion-header">
                <h3 className="discussion-title">{discussion.title}</h3>
              </div>
              <div className="discussion-meta">
                <span className="author-avatar">{discussion.authorInitials}</span>
                {discussion.author} · {discussion.date}
              </div>
              <div className="discussion-content">
                {discussion.content}
              </div>
              <div className="discussion-actions">
                <button 
                  className={`action-btn like-btn ${discussion.isLiked ? 'liked' : ''}`}
                  onClick={() => handleLike(discussion.id)}
                >
                  <i>{discussion.isLiked ? '❤️' : '🤍'}</i>
                  <span>{discussion.likes}</span> likes
                </button>
                <button 
                  className={`action-btn comment-toggle-btn ${discussion.showComments ? 'active-comments-btn' : ''}`}
                  onClick={() => toggleComments(discussion.id)}
                >
                  <i>💬</i>
                  <span>{discussion.comments.length}</span> comments
                </button>
                <button 
                  className="action-btn add-comment-btn"
                  onClick={() => showCommentForm(discussion.id)}
                >
                  <i>✏️</i>
                  Add comment
                </button>
              </div>
              
              {discussion.showComments && (
                <div className="comments-section">
                  <div className="comments-list">
                    {discussion.comments.map(comment => (
                      <div key={comment.id} className="comment">
                        <div className="comment-header">
                          <div>
                            <span className="author-avatar">{comment.authorInitials}</span>
                            <span className="comment-author">{comment.author}</span>
                          </div>
                          <span className="comment-date">{comment.date}</span>
                        </div>
                        <div className="comment-content">
                          {comment.content}
                        </div>
                        <div className="comment-actions">
                          <button 
                            className={`action-btn comment-like-btn ${comment.isLiked ? 'liked' : ''}`}
                            onClick={() => handleCommentLike(discussion.id, comment.id)}
                          >
                            <i>{comment.isLiked ? '❤️' : '🤍'}</i>
                            <span>{comment.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="new-comment-form">
                    <textarea 
                      placeholder="Write your comment..." 
                      value={newComments[discussion.id] || ''}
                      onChange={(e) => handleCommentChange(discussion.id, e.target.value)}
                    />
                    <button 
                      className="comment-btn"
                      onClick={() => addComment(discussion.id)}
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseDiscussionForum;
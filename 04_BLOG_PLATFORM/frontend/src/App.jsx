import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, MessageSquare, Edit3, Trash2, X, User, LogOut, Calendar, Tag } from 'lucide-react';

const API_BASE = 'http://localhost:5004/api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('bp_token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('bp_user') || 'null'));

  // Posts state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active post reader modal
  const [activePost, setActivePost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  // Post form modal (create/edit)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [postFormData, setPostFormData] = useState({ title: '', category: 'Tech & Development', content: '' });

  // Auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [authFormData, setAuthFormData] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/posts`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const openPostDetails = async (post) => {
    try {
      const res = await fetch(`${API_BASE}/posts/${post._id}`);
      const data = await res.json();
      if (data.success) {
        setActivePost(data.post);
        setComments(data.comments || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentInput.trim() || !activePost) return;

    try {
      const author = user ? user.name : (commentAuthor.trim() || 'Anonymous Reader');
      const res = await fetch(`${API_BASE}/posts/${activePost._id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorName: author, content: commentInput })
      });
      const data = await res.json();
      if (data.success) {
        setComments([data.comment, ...comments]);
        setCommentInput('');
        // Update comment count on post in feed
        setPosts(posts.map((p) => p._id === activePost._id ? { ...p, commentCount: (p.commentCount || 0) + 1 } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    if (!postFormData.title.trim() || !postFormData.content.trim()) return;

    try {
      if (editingPostId) {
        // Update post
        const res = await fetch(`${API_BASE}/posts/${editingPostId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(postFormData)
        });
        const data = await res.json();
        if (data.success) {
          setPosts(posts.map((p) => (p._id === editingPostId ? { ...p, ...data.post } : p)));
          if (activePost && activePost._id === editingPostId) {
            setActivePost(data.post);
          }
          setIsPostModalOpen(false);
          setEditingPostId(null);
        } else {
          alert(data.message);
        }
      } else {
        // Create post
        const res = await fetch(`${API_BASE}/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(postFormData)
        });
        const data = await res.json();
        if (data.success) {
          setPosts([{ ...data.post, commentCount: 0 }, ...posts]);
          setIsPostModalOpen(false);
          setPostFormData({ title: '', category: 'Tech & Development', content: '' });
        } else {
          alert(data.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`${API_BASE}/posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter((p) => p._id !== id));
        if (activePost && activePost._id === id) {
          setActivePost(null);
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const endpoint = isRegister ? '/auth/register' : '/auth/login';

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authFormData)
      });
      const data = await res.json();
      if (!data.success) {
        setAuthError(data.message || 'Authentication failed');
        return;
      }

      localStorage.setItem('bp_token', data.token);
      localStorage.setItem('bp_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setIsAuthModalOpen(false);
      setAuthFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setAuthError('Error connecting to backend server');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bp_token');
    localStorage.removeItem('bp_user');
    setToken('');
    setUser(null);
  };

  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-inner">
          <div className="brand">
            <BookOpen size={24} />
            <span>DevJournal</span>
          </div>

          <div className="nav-actions">
            {token ? (
              <>
                <button
                  onClick={() => {
                    setEditingPostId(null);
                    setPostFormData({ title: '', category: 'Tech & Development', content: '' });
                    setIsPostModalOpen(true);
                  }}
                  className="btn btn-primary"
                >
                  <Plus size={16} /> New Post
                </button>
                <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                  Hi, <strong>{user?.name}</strong>
                </span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <button onClick={() => setIsAuthModalOpen(true)} className="btn btn-primary">
                <User size={16} /> Sign In / Register
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Feed */}
      <main className="container">
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Articles & Insights</h1>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            A lightweight blogging space built for the Thiranex Full Stack Internship.
          </p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Loading blog posts from MongoDB Atlas...
          </p>
        ) : posts.length === 0 ? (
          <div style={{ background: '#fff', padding: '40px', textAlign: 'center', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <p style={{ color: '#64748b', marginBottom: '12px' }}>No blog posts yet.</p>
            {token && (
              <button onClick={() => setIsPostModalOpen(true)} className="btn btn-primary">
                Write the First Post
              </button>
            )}
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-meta">
                <span className="badge">{post.category || 'General'}</span>
                <span>By {post.authorName}</span>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <h2 className="post-title" onClick={() => openPostDetails(post)}>
                {post.title}
              </h2>
              <p className="post-excerpt">
                {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
              </p>
              <div className="post-footer">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageSquare size={15} />
                  <span>{post.commentCount || 0} Comments</span>
                </div>
                <button onClick={() => openPostDetails(post)} className="btn btn-outline btn-sm">
                  Read Article & Comments →
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Post Reader Modal */}
      {activePost && (
        <div className="modal-overlay" onClick={() => setActivePost(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="badge">{activePost.category}</span>
              <button onClick={() => setActivePost(null)} className="close-btn">
                <X size={20} />
              </button>
            </div>

            <h1 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>{activePost.title}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
              <span>Published by <strong>{activePost.authorName}</strong> on {new Date(activePost.createdAt).toLocaleDateString()}</span>
              {user && (user.id === activePost.author || user._id === activePost.author) && (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => {
                      setEditingPostId(activePost._id);
                      setPostFormData({
                        title: activePost.title,
                        category: activePost.category || 'Tech & Development',
                        content: activePost.content
                      });
                      setIsPostModalOpen(true);
                      setActivePost(null);
                    }}
                    className="btn btn-outline btn-sm"
                  >
                    <Edit3 size={12} /> Edit
                  </button>
                  <button onClick={() => handleDeletePost(activePost._id)} className="btn btn-danger btn-sm">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              )}
            </div>

            <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7, whiteSpace: 'pre-line', marginBottom: '24px' }}>
              {activePost.content}
            </div>

            {/* Comments Section */}
            <div className="comments-section">
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>
                Comments ({comments.length})
              </h3>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} style={{ marginBottom: '16px' }}>
                {!user && (
                  <input
                    type="text"
                    placeholder="Your Name (optional)"
                    className="form-input"
                    style={{ marginBottom: '8px' }}
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                  />
                )}
                <textarea
                  rows={2}
                  required
                  placeholder="Write a comment..."
                  className="form-textarea"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: '8px' }}>
                  Post Comment
                </button>
              </form>

              {/* Comment list */}
              {comments.length === 0 ? (
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>No comments yet. Be the first to join the conversation!</p>
              ) : (
                comments.map((c) => (
                  <div key={c._id} className="comment-item">
                    <div className="comment-header">
                      <span className="comment-author">{c.authorName}</span>
                      <span className="comment-date">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="comment-body">{c.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Post Modal */}
      {isPostModalOpen && (
        <div className="modal-overlay" onClick={() => setIsPostModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editingPostId ? 'Edit Blog Post' : 'Create New Post'}</h2>
              <button onClick={() => setIsPostModalOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePost}>
              <div className="form-group">
                <label>Post Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Modern Full Stack Best Practices"
                  value={postFormData.title}
                  onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Web Development, Artificial Intelligence, Tutorials"
                  value={postFormData.category}
                  onChange={(e) => setPostFormData({ ...postFormData, category: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Article Content *</label>
                <textarea
                  rows={6}
                  required
                  className="form-textarea"
                  placeholder="Share your thoughts, tutorials, or engineering experience..."
                  value={postFormData.content}
                  onChange={(e) => setPostFormData({ ...postFormData, content: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px' }}>
                {editingPostId ? 'Update Post' : 'Publish Post'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
              <button onClick={() => setIsAuthModalOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>

            {authError && (
              <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '12px' }}>
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit}>
              {isRegister && (
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="Mithradevi Rajalingam"
                    value={authFormData.name}
                    onChange={(e) => setAuthFormData({ ...authFormData, name: e.target.value })}
                  />
                </div>
              )}
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="name@example.com"
                  value={authFormData.email}
                  onChange={(e) => setAuthFormData({ ...authFormData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="••••••••"
                  value={authFormData.password}
                  onChange={(e) => setAuthFormData({ ...authFormData, password: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px' }}>
                {isRegister ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '14px', fontSize: '13px', color: '#64748b' }}>
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <span
                style={{ color: '#7c3aed', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => {
                  setIsRegister(!isRegister);
                  setAuthError('');
                }}
              >
                {isRegister ? 'Sign In' : 'Register'}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

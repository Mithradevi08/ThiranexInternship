import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Trash2, Edit3, Plus, LogOut, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const API_BASE = 'http://localhost:5002/api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('tm_token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('tm_user') || 'null'));
  const [isRegister, setIsRegister] = useState(false);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  // Tasks state
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  // Task form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    priority: 'Medium',
    dueDate: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Check auth & fetch tasks
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setTasks(data.tasks);
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
        body: JSON.stringify(authForm)
      });
      const data = await res.json();
      if (!data.success) {
        setAuthError(data.message || 'Authentication failed');
        return;
      }

      localStorage.setItem('tm_token', data.token);
      localStorage.setItem('tm_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setAuthForm({ name: '', email: '', password: '' });
    } catch (err) {
      setAuthError('Unable to connect to server. Ensure backend is running.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tm_token');
    localStorage.removeItem('tm_user');
    setToken('');
    setUser(null);
    setTasks([]);
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      if (editingId) {
        // Update task
        const res = await fetch(`${API_BASE}/tasks/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success) {
          setTasks(tasks.map((t) => (t._id === editingId ? data.task : t)));
          setEditingId(null);
          setFormData({ title: '', description: '', category: 'General', priority: 'Medium', dueDate: '' });
        }
      } else {
        // Create task
        const res = await fetch(`${API_BASE}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success) {
          setTasks([data.task, ...tasks]);
          setFormData({ title: '', description: '', category: 'General', priority: 'Medium', dueDate: '' });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setTasks(tasks.map((t) => (t._id === id ? data.task : t)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setTasks(tasks.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartEdit = (task) => {
    setEditingId(task._id);
    setFormData({
      title: task.title,
      description: task.description || '',
      category: task.category || 'General',
      priority: task.priority || 'Medium',
      dueDate: task.dueDate || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', category: 'General', priority: 'Medium', dueDate: '' });
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'Pending') return t.status === 'Pending';
    if (filter === 'Completed') return t.status === 'Completed';
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;

  if (!token) {
    return (
      <div className="auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">TaskFlow</h1>
          <p className="auth-subtitle">Thiranex Internship - Task Management</p>

          {authError && <div className="alert-error">{authError}</div>}

          <form onSubmit={handleAuthSubmit}>
            {isRegister && (
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Mithradevi Rajalingam"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                />
              </div>
            )}
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="name@example.com"
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                className="form-input"
                placeholder="••••••••"
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
              {isRegister ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="auth-toggle">
            {isRegister ? (
              <p>
                Already have an account?{' '}
                <span onClick={() => { setIsRegister(false); setAuthError(''); }}>Sign In</span>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <span onClick={() => { setIsRegister(true); setAuthError(''); }}>Register</span>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-brand">
          <CheckSquare size={24} />
          <span>TaskFlow</span>
        </div>
        <div className="nav-user">
          <span className="user-badge">Signed in as <strong>{user?.name}</strong></span>
          <button onClick={handleLogout} className="btn btn-outline btn-sm">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <main className="container">
        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div className="card" style={{ marginBottom: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '8px', color: '#2563eb' }}>
              <CheckSquare size={20} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>TOTAL TASKS</div>
              <div style={{ fontSize: '20px', fontWeight: 700 }}>{totalTasks}</div>
            </div>
          </div>
          <div className="card" style={{ marginBottom: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#fef3c7', padding: '10px', borderRadius: '8px', color: '#d97706' }}>
              <Clock size={20} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>PENDING</div>
              <div style={{ fontSize: '20px', fontWeight: 700 }}>{pendingTasks}</div>
            </div>
          </div>
          <div className="card" style={{ marginBottom: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#dcfce7', padding: '10px', borderRadius: '8px', color: '#16a34a' }}>
              <CheckCircle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>COMPLETED</div>
              <div style={{ fontSize: '20px', fontWeight: 700 }}>{completedTasks}</div>
            </div>
          </div>
        </div>

        {/* Task Form */}
        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
            {editingId ? 'Edit Task' : 'Add New Task'}
          </h2>
          <form onSubmit={handleSaveTask}>
            <div className="form-group">
              <label>Task Title *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Complete Thiranex Full Stack Submission"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows={2}
                className="form-textarea"
                placeholder="Provide task details or notes..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. College, Work, Personal"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  className="form-select"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn btn-primary">
                {editingId ? <CheckSquare size={16} /> : <Plus size={16} />}
                {editingId ? 'Update Task' : 'Add Task'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancelEdit} className="btn btn-outline">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Task Filters */}
        <div className="filters">
          {['All', 'Pending', 'Completed'].map((tab) => (
            <button
              key={tab}
              className={`filter-btn ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab} ({tab === 'All' ? totalTasks : tab === 'Pending' ? pendingTasks : completedTasks})
            </button>
          ))}
        </div>

        {/* Tasks List */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '24px' }}>Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>
            <p>No {filter !== 'All' ? filter.toLowerCase() : ''} tasks found. Add a task above to get started!</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task._id} className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`}>
              <div className="task-left">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.status === 'Completed'}
                  onChange={() => handleToggle(task._id)}
                  title="Toggle completion status"
                />
                <div className="task-content">
                  <h3 className={`task-title ${task.status === 'Completed' ? 'completed' : ''}`}>
                    {task.title}
                  </h3>
                  {task.description && <p className="task-desc">{task.description}</p>}
                  <div className="task-meta">
                    <span className={`badge badge-priority-${task.priority}`}>{task.priority}</span>
                    <span className="badge" style={{ background: '#f1f5f9', color: '#475569' }}>{task.category}</span>
                    {task.dueDate && <span>Due: {task.dueDate}</span>}
                    <span className={`badge badge-status-${task.status.toLowerCase()}`}>{task.status}</span>
                  </div>
                </div>
              </div>
              <div className="task-actions">
                <button
                  onClick={() => handleStartEdit(task)}
                  className="btn btn-outline btn-sm"
                  title="Edit task"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-danger btn-sm"
                  title="Delete task"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

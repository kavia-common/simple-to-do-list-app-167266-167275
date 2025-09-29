import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

/**
 * Candy Pop To-Do App
 * - Single-page layout with header, task input, and task list
 * - No backend: state only
 * - Playful vibrant styling using the provided color palette
 */

/**
 * Types
 * A Task stores id, text, completed, and createdAt
 * We keep it simple and local to this file.
 */

/**
 * Utils
 */
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

/**
 * Theme toggling is retained but styled to match Candy Pop.
 */

// PUBLIC_INTERFACE
function App() {
  /** Theme */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  /** Tasks state */
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // all | active | done

  /** Derived */
  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed);
    if (filter === 'done') return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  /** CRUD handlers */
  const handleAdd = (text) => {
    if (!text.trim()) return;
    const newTask = { id: uid(), text: text.trim(), completed: false, createdAt: Date.now() };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleToggle = (id) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleUpdate = (id, newText) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, text: newText } : t)));
  };

  const handleClearCompleted = () => {
    setTasks(prev => prev.filter(t => !t.completed));
  };

  const activeCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="cp-app">
      <CandyBackground />
      <header className="cp-header">
        <div className="cp-header-content">
          <div className="cp-logo">
            <span className="logo-emoji" aria-hidden>🍬</span>
            <span className="logo-text">Candy Pop Todos</span>
          </div>

          <div className="cp-actions">
            <FilterPills filter={filter} setFilter={setFilter} />
            <button
              className="cp-btn ghost"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>

      <main className="cp-main">
        <section className="cp-card">
          <TaskInput onAdd={handleAdd} />
          <div className="cp-divider" />
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
          <footer className="cp-footer">
            <span className="cp-counter">
              {activeCount === 0 ? 'All done! 🎉' : `${activeCount} ${activeCount === 1 ? 'task' : 'tasks'} left`}
            </span>
            <div className="cp-footer-actions">
              <button className="cp-btn danger outline" onClick={handleClearCompleted}>
                Clear Completed
              </button>
            </div>
          </footer>
        </section>
      </main>

      <AppMeta />
    </div>
  );
}

/**
 * Decorative gradient background
 */
function CandyBackground() {
  return (
    <div className="cp-bg" aria-hidden>
      <div className="blob blob-pink" />
      <div className="blob blob-purple" />
      <div className="blob blob-blue" />
    </div>
  );
}

/**
 * Header filter pills
 */
function FilterPills({ filter, setFilter }) {
  return (
    <div className="cp-pills" role="tablist" aria-label="Filter tasks">
      {[
        { key: 'all', label: 'All' },
        { key: 'active', label: 'Active' },
        { key: 'done', label: 'Done' },
      ].map(p => (
        <button
          key={p.key}
          role="tab"
          aria-selected={filter === p.key}
          className={`cp-pill ${filter === p.key ? 'active' : ''}`}
          onClick={() => setFilter(p.key)}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Task input component with playful accents
 */
function TaskInput({ onAdd }) {
  const [text, setText] = useState('');
  const [hint, setHint] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setHint('Type something sweet… 🍭');
      return;
    }
    onAdd(text);
    setText('');
    setHint('');
  };

  return (
    <form className="task-input" onSubmit={handleSubmit} aria-label="Add a task">
      <div className="input-wrap">
        <input
          className="cp-input"
          type="text"
          placeholder="Add a new task… e.g., Buy rainbow sprinkles"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Task text"
        />
        <button className="cp-btn primary" type="submit" aria-label="Add task">
          Add
        </button>
      </div>
      {hint && <div className="cp-hint">{hint}</div>}
    </form>
  );
}

/**
 * Task list with items that can be toggled, edited, and deleted
 */
function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
  if (tasks.length === 0) {
    return (
      <div className="cp-empty">
        <div className="empty-bubble">
          <span className="emoji" aria-hidden>🍡</span>
          <div>No tasks here yet. Add something sweet!</div>
        </div>
      </div>
    );
  }

  return (
    <ul className="task-list" aria-live="polite">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
          onUpdate={(txt) => onUpdate(task.id, txt)}
        />
      ))}
    </ul>
  );
}

/**
 * Single task item
 */
function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleSave = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onUpdate(trimmed);
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setText(task.text);
      setEditing(false);
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'done' : ''}`}>
      <label className="cp-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          aria-label={`Mark "${task.text}" as ${task.completed ? 'active' : 'done'}`}
        />
        <span className="checkmark" />
      </label>

      {editing ? (
        <input
          className="cp-input inline"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          autoFocus
          aria-label="Edit task text"
        />
      ) : (
        <span
          className="task-text"
          onDoubleClick={() => setEditing(true)}
          title="Double-click to edit"
        >
          {task.text}
        </span>
      )}

      <div className="task-actions">
        <button
          className="cp-btn secondary outline"
          onClick={() => setEditing(e => !e)}
          aria-label={editing ? 'Save' : 'Edit'}
          title={editing ? 'Save' : 'Edit'}
        >
          {editing ? 'Save' : 'Edit'}
        </button>
        <button
          className="cp-btn danger"
          onClick={onDelete}
          aria-label="Delete"
          title="Delete"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

/**
 * Footer meta
 */
function AppMeta() {
  return (
    <div className="cp-meta" role="contentinfo">
      <span>Built with 💖 in Candy Pop style</span>
    </div>
  );
}

export default App;

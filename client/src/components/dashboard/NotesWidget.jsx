import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const NotesWidget = () => {
  const { dashData, addNote, updateNote, deleteNote } = useDashboard();
  const [activeFolder, setActiveFolder] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [folder, setFolder] = useState('Learning');

  const notes = dashData.notes || [];

  const folders = ['All', 'Learning', 'Career', 'Projects', 'General'];

  const filteredNotes = notes.filter((n) => {
    const matchesFolder = activeFolder === 'All' || n.folder === activeFolder;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addNote({ title, content, folder });
    setTitle('');
    setContent('');
    setShowAddModal(false);
  };

  return (
    <div className="dash-widget-card notes-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>📝 Personal Career Notes & Workspace</h3>
          <span className="widget-subtitle">Create, organize, pin, and search your study notes</span>
        </div>
        <button className="btn-dash-primary-sm" onClick={() => setShowAddModal(!showAddModal)}>
          {showAddModal ? 'Close Form ✕' : '+ New Note'}
        </button>
      </div>

      {showAddModal && (
        <form onSubmit={handleCreate} className="inline-add-note-form">
          <div className="form-group full-width">
            <input
              type="text"
              className="dash-input"
              placeholder="Note Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group full-width">
            <textarea
              className="dash-textarea"
              rows={3}
              placeholder="Write your study notes, key takeaways, code snippets, or interview questions..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="form-row-2">
            <select className="dash-select" value={folder} onChange={(e) => setFolder(e.target.value)}>
              <option value="Learning">📁 Learning</option>
              <option value="Career">📁 Career</option>
              <option value="Projects">📁 Projects</option>
              <option value="General">📁 General</option>
            </select>
            <button type="submit" className="btn-dash-save-sm">Save Note 💾</button>
          </div>
        </form>
      )}

      {/* Folders & Search Bar */}
      <div className="notes-controls-row">
        <div className="folder-tabs">
          {folders.map((f) => (
            <button
              key={f}
              className={`folder-tab-btn ${activeFolder === f ? 'active' : ''}`}
              onClick={() => setActiveFolder(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="notes-search-wrapper">
          <input
            type="text"
            className="notes-search-input"
            placeholder="🔍 Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Notes Grid */}
      <div className="notes-grid">
        {filteredNotes.length === 0 ? (
          <div className="dash-empty-small">
            <p>No notes found in this folder.</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div key={note.id} className={`note-card ${note.isPinned ? 'pinned' : ''}`}>
              <div className="note-card-header">
                <span className="note-folder-tag">📁 {note.folder}</span>
                <div className="note-card-actions">
                  <button
                    className="btn-pin-icon"
                    onClick={() => updateNote(note.id, { isPinned: !note.isPinned })}
                    title={note.isPinned ? 'Unpin Note' : 'Pin Note'}
                  >
                    {note.isPinned ? '📌 Pinned' : '📌 Pin'}
                  </button>
                  <button className="btn-delete-icon" onClick={() => deleteNote(note.id)} title="Delete Note">
                    🗑️
                  </button>
                </div>
              </div>

              <h4>{note.title}</h4>
              <p className="note-preview-content">{note.content}</p>
              <span className="note-date-text">
                {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Recently'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesWidget;

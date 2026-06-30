import React, { useState } from 'react';

export default function AssignmentDetailsLayout({ 
  assignment = {
    title: "Assignments",
    shortDesc: "Track deadlines, priorities, and reminders without clutter.",
    whatInside: "Keep submissions, progress, and reminders in one place so you never lose track of deadlines.",
    subject: "Psychology",
    priority: "High",
    dueDate: "2026-06-28",
    time: "12:30"
  },
  onClose 
}) {
  // Checklist state management
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Priority tracking", completed: false, isEditing: false },
    { id: 2, text: "Deadline reminders", completed: false, isEditing: false },
    { id: 3, text: "Submission checklist", completed: false, isEditing: false }
  ]);
  const [newPoint, setNewPoint] = useState('');

  const remainingItems = checklist.filter(item => !item.completed).length;

  // Checklist Action Handlers
  const toggleComplete = (id) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteItem = (id) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  const startEdit = (id) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, isEditing: true } : item));
  };

  const saveEdit = (id, newText) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, text: newText, isEditing: false } : item));
  };

  const addPoint = () => {
    if (!newPoint.trim()) return;
    setChecklist([...checklist, { id: Date.now(), text: newPoint, completed: false, isEditing: false }]);
    setNewPoint('');
  };

  return (
    <div style={{ backgroundColor: '#0f172a', padding: '32px', borderRadius: '16px', color: '#ffffff', fontFamily: 'sans-serif', border: '1px solid #1e293b' }}>
      
      {/* Header Context Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <span style={{ fontSize: '11px', color: '#38bdf8', letterSpacing: '1.5px', fontWeight: 'bold', textTransform: 'uppercase' }}>Live Module Context</span>
          <h1 style={{ margin: '4px 0 0 0', fontSize: '28px', fontWeight: 'bold' }}>{assignment.title}</h1>
        </div>
        <button onClick={onClose} style={{ backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
          Close
        </button>
      </div>

      {/* Meta Properties Row (Subject, Priority, Date, Time) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Core Subject</span>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#f43f5e' }}>📘 {assignment.subject || 'General'}</span>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Priority Level</span>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: assignment.priority === 'High' ? '#ef4444' : '#f59e0b' }}>
            {assignment.priority === 'High' ? '🔴 High' : '🟡 Medium'}
          </span>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Due Date</span>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8' }}>📅 {assignment.dueDate}</span>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Submission Time</span>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981' }}>⏰ {assignment.time}</span>
        </div>
      </div>

      {/* Informational Blocks Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#94a3b8' }}>Short Description</h3>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#cbd5e1' }}>{assignment.shortDesc}</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#94a3b8' }}>What's Inside</h3>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#cbd5e1' }}>{assignment.whatInside}</p>
        </div>
      </div>

      {/* Checklist Queue Controller Box */}
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 'bold', color: '#38bdf8', display: 'flex', justifyContent: 'space-between' }}>
          <span>📋 Active Academic Checklist Queue</span>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>({remainingItems} items remaining)</span>
        </h3>

        {/* Item Queue Entry Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {checklist.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', backgroundColor: '#0f172a', padding: '12px 16px', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <input 
                  type="checkbox" 
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                {item.isEditing ? (
                  <input 
                    type="text" 
                    defaultValue={item.text}
                    onBlur={(e) => saveEdit(item.id, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(item.id, e.target.value)}
                    autoFocus
                    style={{ backgroundColor: '#1e293b', color: '#ffffff', border: '1px solid #38bdf8', borderRadius: '4px', padding: '2px 6px', fontSize: '14px', width: '80%' }}
                  />
                ) : (
                  <span style={{ 
                    fontSize: '14px', 
                    color: item.completed ? '#64748b' : '#e2e8f0', 
                    textDecoration: item.completed ? 'line-through' : 'none',
                    cursor: 'pointer'
                  }} onClick={() => startEdit(item.id)}>
                    {item.text}
                  </span>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <span onClick={() => startEdit(item.id)} style={{ cursor: 'pointer', color: '#6366f1', fontSize: '13px' }}>✏️ Edit</span>
                <span onClick={() => deleteItem(item.id)} style={{ cursor: 'pointer', color: '#ef4444', fontSize: '13px' }}>🗑️ Delete</span>
              </div>
            </div>
          ))}
        </div>

        {/* Append Point Controller */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Add new actionable requirement point..." 
            value={newPoint}
            onChange={(e) => setNewPoint(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addPoint()}
            style={{ flex: 1, backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '14px' }}
          />
          <button onClick={addPoint} style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
            Add point
          </button>
        </div>
      </div>

    </div>
  );
}

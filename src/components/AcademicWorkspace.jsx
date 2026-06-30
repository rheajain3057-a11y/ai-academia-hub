import React, { useState } from 'react';

export default function AcademicWorkspace({ onAddObjective, onCommandAi }) {
  const [taskText, setTaskText] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [date, setDate] = useState('2026-06-30');
  const [time, setTime] = useState('12:30');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    onAddObjective({ taskText, subject, priority, date, time });
    setTaskText('');
  };

  return (
    <div style={{ backgroundColor: '#0f172a', padding: '24px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      
      {/* Top Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #1e293b', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Circular Profile Avatar Placeholder */}
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #3b82f6)', border: '2px solid #6366f1' }}></div>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Welcome, Rhea! <span style={{ color: '#f59e0b' }}>✨</span>
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Operational Workspace Active</p>
          </div>
        </div>
        <button style={{ backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: '0.2s' }}>
          Sign Out
        </button>
      </div>

      {/* Main Card Panel */}
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' }}>
        
        {/* Panel Section Subtitle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#38bdf8', fontWeight: 'bold', fontSize: '15px', marginBottom: '16px' }}>
          <span>➕</span> Log New Academic Objective
        </div>

        {/* Input Controls Row */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            
            <input 
              type="text" 
              placeholder="Enter assignment, essay topic, or task..." 
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              style={{ flex: '2', minWidth: '200px', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '14px' }}
            />

            <select 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              style={{ flex: '1', minWidth: '120px', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '14px' }}
            >
              <option value="">Select Subject</option>
              <option value="Psychology">Psychology</option>
              <option value="Business">Business</option>
              <option value="Statistics">Statistics</option>
            </select>

            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              style={{ flex: '1', minWidth: '110px', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '14px' }}
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </select>

            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ flex: '1', minWidth: '120px', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '14px' }}
            />

            <input 
              type="text" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ width: '80px', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '14px', textAlign: 'center' }}
            />
          </div>

          {/* Add Objective Action Button */}
          <button 
            type="submit"
            style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', marginBottom: '16px', display: 'block' }}
          >
            Add Objective
          </button>
        </form>

        {/* AI Action Execution Button */}
        <button 
          onClick={() => onCommandAi(taskText)}
          style={{ width: '100%', backgroundColor: '#6b21a8', color: '#ffffff', border: '1px solid #a855f7', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}
        >
          🔮 Command AI to Break Task Into Actionable Steps
        </button>

      </div>
    </div>
  );
}

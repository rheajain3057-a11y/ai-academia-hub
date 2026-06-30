import React, { useState, useEffect } from 'react'; 
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function App() {
  // --- AUTHENTICATION STATE TRACKING (NEW ADD-ON) ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('academia_hub_is_logged_in') === 'true';
  });
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [username, setUsername] = useState(() => localStorage.getItem('academia_hub_form_username') || '');
  const [password, setPassword] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem('academia_hub_registered_users');
    return savedUsers ? JSON.parse(savedUsers) : [{ username: 'admin', password: 'password123' }];
  });
  const [authError, setAuthError] = useState('');

  // --- PREVIOUS STATES (UNTOUCHED) ---
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('academia_hub_active_tab') || 'dashboard';
  });

  // 1. Core Assignments Data Matrix with localStorage Persistence
  const [assignments, setAssignments] = useState(() => {
    const savedData = localStorage.getItem('academia_hub_assignments');
    if (savedData) return JSON.parse(savedData);
    return [
      { 
        id: 1, 
        title: "Psychology Report", 
        subject: "Psychology", 
        priority: "High", 
        dueDate: "2026-06-28", 
        time: "12:30", 
        shortDesc: "Track deadlines, priorities, and reminders without clutter.", 
        whatInside: "Keep submissions, progress, and reminders in one place so you never lose track of deadlines.",
        checklist: [
          { id: 101, text: "Priority tracking", completed: true, isEditing: false },
          { id: 102, text: "Deadline reminders", completed: false, isEditing: false },
          { id: 103, text: "Submission checklist", completed: false, isEditing: false }
        ]
      },
      { 
        id: 2, 
        title: "Business Case Study", 
        subject: "Business", 
        priority: "Medium", 
        dueDate: "2026-07-02", 
        time: "14:00", 
        shortDesc: "Analyze market structures and operational strategies.", 
        whatInside: "Case studies on local corporate shifts and organizational frameworks.",
        checklist: [
          { id: 201, text: "Gather research data matrix", completed: false, isEditing: false }
        ]
      }
    ];
  });

  // 2. AI States & History Matrix Panel with localStorage Persistence
  const [aiPrompt, setAiPrompt] = useState(() => {
    return localStorage.getItem('academia_hub_ai_prompt') || '';
  });
  const [aiResponse, setAiResponse] = useState(() => {
    return localStorage.getItem('academia_hub_ai_response') || '';
  });
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiHistory, setAiHistory] = useState(() => {
    const savedHistory = localStorage.getItem('academia_hub_ai_history');
    if (savedHistory) return JSON.parse(savedHistory);
    return [
      { id: 1, prompt: "Outline key concepts in sports psychology", response: "1. Mental Toughness\n2. Goal Setting\n3. Anxiety Management Frameworks." },
      { id: 2, prompt: "Break down ANOVA variables", response: "Calculates variance ratios between categories ($F$-distribution thresholds)." }
    ];
  });

  // Media attachment temporary state handles
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [attachedPhotos, setAttachedPhotos] = useState([]);

  // 3. Form Logger State Holders with localStorage Persistence
  const [taskText, setTaskText] = useState(() => localStorage.getItem('academia_hub_form_task') || '');
  const [subject, setSubject] = useState(() => localStorage.getItem('academia_hub_form_subject') || '');
  const [customSubject, setCustomSubject] = useState(() => localStorage.getItem('academia_hub_form_custom_subject') || ''); 
  const [priority, setPriority] = useState(() => localStorage.getItem('academia_hub_form_priority') || 'Medium');
  const [date, setDate] = useState(() => localStorage.getItem('academia_hub_form_date') || '2026-06-30');
  const [time, setTime] = useState(() => localStorage.getItem('academia_hub_form_time') || '12:30');
  const [newPoint, setNewPoint] = useState('');

  // Drilldown Inspector Selected
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // 4. Fully Editable Lecture Timetable State with localStorage Persistence
  const [timetable, setTimetable] = useState(() => {
    const savedTimetable = localStorage.getItem('academia_hub_timetable');
    if (savedTimetable) return JSON.parse(savedTimetable);
    return [
      { id: 1, day: 'Monday', subject: 'Psychology 101', time: '09:00 - 11:00', room: 'Hall A', isEditing: false },
      { id: 2, day: 'Wednesday', subject: 'Advanced Statistics', time: '11:30 - 13:30', room: 'Lab 3', isEditing: false },
      { id: 3, day: 'Thursday', subject: 'Business Management', time: '14:00 - 16:00', room: 'Room 402', isEditing: false }
    ];
  });

  // Dynamic input states for adding a new timetable entry
  const [newSlotDay, setNewSlotDay] = useState('Monday');
  const [newSlotSubject, setNewSlotSubject] = useState('');
  const [newSlotTime, setNewSlotTime] = useState('');
  const [newSlotRoom, setNewSlotRoom] = useState('');

  // 5. Fully Editable Calendar Matrix State with localStorage Persistence
  const [calendarEvents, setCalendarEvents] = useState(() => {
    const savedCalendar = localStorage.getItem('academia_hub_calendar');
    if (savedCalendar) return JSON.parse(savedCalendar);
    return {
      2: "Biz Study",
      28: "Psych Due"
    };
  });
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);
  const [calendarInputVal, setCalendarInputVal] = useState('');

  // ==========================================
  // COMPREHENSIVE LOCALSTORAGE SYNC EFFECTS
  // ==========================================
  useEffect(() => {
    localStorage.setItem('academia_hub_is_logged_in', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('academia_hub_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('academia_hub_form_username', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('academia_hub_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('academia_hub_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('academia_hub_ai_prompt', aiPrompt);
  }, [aiPrompt]);

  useEffect(() => {
    localStorage.setItem('academia_hub_ai_response', aiResponse);
  }, [aiResponse]);

  useEffect(() => {
    localStorage.setItem('academia_hub_ai_history', JSON.stringify(aiHistory));
  }, [aiHistory]);

  useEffect(() => {
    localStorage.setItem('academia_hub_timetable', JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem('academia_hub_calendar', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem('academia_hub_form_task', taskText);
  }, [taskText]);

  useEffect(() => {
    localStorage.setItem('academia_hub_form_subject', subject);
  }, [subject]);

  useEffect(() => {
    localStorage.setItem('academia_hub_form_custom_subject', customSubject);
  }, [customSubject]);

  useEffect(() => {
    localStorage.setItem('academia_hub_form_priority', priority);
  }, [priority]);

  useEffect(() => {
    localStorage.setItem('academia_hub_form_date', date);
  }, [date]);

  useEffect(() => {
    localStorage.setItem('academia_hub_form_time', time);
  }, [time]);
  // ==========================================

  // --- NEW AUTHENTICATION HANDLERS ---
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (!username.trim() || !password.trim()) {
      setAuthError('Please fill out all fields.');
      return;
    }

    if (authMode === 'login') {
      const userExists = registeredUsers.find(u => u.username === username && u.password === password);
      if (userExists) {
        setIsLoggedIn(true);
        setPassword('');
      } else {
        setAuthError('Invalid username or password.');
      }
    } else {
      const userExists = registeredUsers.find(u => u.username === username);
      if (userExists) {
        setAuthError('Username is already taken.');
      } else {
        const updatedUsers = [...registeredUsers, { username, password }];
        setRegisteredUsers(updatedUsers);
        setIsLoggedIn(true);
        setPassword('');
        alert('Account registered successfully!');
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
  };

  // --- REUSED INFRASTRUCTURE HANDLERS (UNTOUCHED) ---
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      setAttachedFiles(prev => [...prev, file.name]);
      if (file.type === "text/plain" || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setAiPrompt(prev => prev + `\n\n[Attached File Content (${file.name}):]\n${event.target.result}`);
        };
        reader.readAsText(file);
      }
    });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedPhotos(prev => [...prev, { name: file.name, url: event.target.result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleTimetableFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target.result;
      const lines = content.split('\n');
      const incomingSlots = [];

      lines.forEach((line) => {
        if (!line.trim()) return;
        const segments = line.split(',');
        if (segments.length >= 2) {
          const parsedDay = segments[0].trim();
          const cleanDay = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].includes(parsedDay) ? parsedDay : 'Monday';
          
          incomingSlots.push({
            id: Date.now() + Math.random(),
            day: cleanDay,
            subject: segments[1]?.trim() || 'Imported Class Slot',
            time: segments[2]?.trim() || '12:00 - 14:00',
            room: segments[3]?.trim() || 'Room TBD',
            isEditing: false
          });
        }
      });

      if (incomingSlots.length > 0) {
        setTimetable(prev => [...prev, ...incomingSlots]);
      }
    };
    reader.readAsText(file);
  };

  const handleQueryEngine = async () => {
    if (!aiPrompt.trim()) return;

    setIsAiLoading(true);
    setAiResponse('');
    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'qwen2.5:1.5b',
          messages: [{ 
            role: 'user', 
            content: `${aiPrompt} (Provide an extensive, highly comprehensive academic breakdown with complete historical timeline details and comprehensive multi-paragraph explanations.)` 
          }],
          stream: false,
          options: { temperature: 0.6, num_predict: 1200 }
        })
      });

      if (!response.ok) throw new Error("Offline");
      const data = await response.json();
      const outputText = data.message?.content || "No framework tokens generated.";
      
      setAiResponse(outputText);
      setAiHistory([{ id: Date.now(), prompt: aiPrompt, response: outputText }, ...aiHistory]);
      setAttachedFiles([]);
      setAttachedPhotos([]);
    } catch (err) {
      const fallbackErrorText = "⚠️ Local model offline. Ensure 'export OLLAMA_ORIGINS=\"*\" && ollama serve' is active.";
      setAiResponse(fallbackErrorText);
      setAiHistory([{ id: Date.now(), prompt: aiPrompt, response: fallbackErrorText }, ...aiHistory]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAddObjective = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    
    const finalSubject = subject === 'Others' ? (customSubject.trim() || 'Other') : (subject || "General");

    const formatted = {
      id: Date.now(),
      title: taskText,
      subject: finalSubject,
      priority: priority,
      dueDate: date,
      time: time,
      isCompleted: false, 
      shortDesc: "Logged user custom objective task criteria template.",
      whatInside: "Actionable local checkpoint items.",
      checklist: [{ id: Date.now() + 1, text: "Initial Setup Framework Checkpoint", completed: false, isEditing: false }]
    };
    setAssignments([...assignments, formatted]);
    
    const dayNum = parseInt(date.split('-')[2], 10);
    if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 28) {
      setCalendarEvents({ ...calendarEvents, [dayNum]: taskText });
    }
    setTaskText('');
    setCustomSubject('');
  };

  const toggleChecklistItem = (itemId) => {
    const updated = selectedAssignment.checklist.map(i => i.id === itemId ? { ...i, completed: !i.completed } : i);
    updateChecklistSync(updated);
  };
  const deleteChecklistItem = (itemId) => {
    const updated = selectedAssignment.checklist.filter(i => i.id !== itemId);
    updateChecklistSync(updated);
  };
  const startEditingChecklistItem = (itemId) => {
    const updated = selectedAssignment.checklist.map(i => i.id === itemId ? { ...i, isEditing: true } : { ...i, isEditing: false });
    updateChecklistSync(updated);
  };
  const saveEditingChecklistItem = (itemId, newText) => {
    const updated = selectedAssignment.checklist.map(i => i.id === itemId ? { ...i, text: newText, isEditing: false } : i);
    updateChecklistSync(updated);
  };
  const addChecklistItem = () => {
    if (!newPoint.trim()) return;
    const updated = [...selectedAssignment.checklist, { id: Date.now(), text: newPoint, completed: false, isEditing: false }];
    updateChecklistSync(updated);
    setNewPoint('');
  };
  const updateChecklistSync = (updatedChecklist) => {
    const updatedAssignment = { ...selectedAssignment, checklist: updatedChecklist };
    setSelectedAssignment(updatedAssignment);
    setAssignments(assignments.map(a => a.id === selectedAssignment.id ? updatedAssignment : a));
  };

  const handleAddTimetableSlot = (e) => {
    e.preventDefault();
    if (!newSlotSubject.trim()) return;

    const newSlot = {
      id: Date.now(),
      day: newSlotDay,
      subject: newSlotSubject,
      time: newSlotTime || '00:00 - 00:00',
      room: newSlotRoom || 'TBD',
      isEditing: false
    };

    setTimetable([...timetable, newSlot]);
    setNewSlotSubject('');
    setNewSlotTime('');
    setNewSlotRoom('');
  };

  const saveTimetableSlot = (id, fields) => {
    setTimetable(timetable.map(slot => slot.id === id ? { ...slot, ...fields, isEditing: false } : slot));
  };

  const handleRemoveTimetableSlot = (id) => {
    setTimetable(timetable.filter(slot => slot.id !== id));
  };

  const saveCalendarDayEvent = () => {
    if (!selectedCalendarDay) return;
    setCalendarEvents({ ...calendarEvents, [selectedCalendarDay]: calendarInputVal });
    setSelectedCalendarDay(null);
  };

  // Dashboard Aggregations
  const completedCount = assignments.filter(a => a.isCompleted || a.checklist?.every(c => c.completed)).length;
  const pendingCount = assignments.length - completedCount;

  const statusData = [
    { name: 'Completed', value: completedCount, color: '#10b981' },
    { name: 'Pending', value: pendingCount, color: '#f59e0b' }
  ];

  const subjectMap = {};
  assignments.forEach(a => {
    if (!a.isCompleted) {
      subjectMap[a.subject] = (subjectMap[a.subject] || 0) + 1;
    } else {
      if (!subjectMap[a.subject]) subjectMap[a.subject] = 0;
    }
  });
  
  const workloadData = Object.keys(subjectMap).length > 0 
    ? Object.keys(subjectMap).map(subj => ({ name: subj, count: subjectMap[subj] }))
    : [{ name: 'None Pending', count: 0 }];


  // --- CONDITIONAL RENDERING CONTROL GATE ---
  if (!isLoggedIn) {
    return (
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontFamily: 'sans-serif', padding: '16px' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', border: '1px solid #334155', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>🎓</div>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>AcademiaHub</span>
          </div>

          <h2 style={{ textAlign: 'center', margin: '0 0 8px 0', fontSize: '20px' }}>
            {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '14px', margin: '0 0 24px 0' }}>
            {authMode === 'login' ? 'Sign in to access your local command base.' : 'Register a new profile credential slot.'}
          </p>

          {authError && (
            <div style={{ backgroundColor: '#ef444422', border: '1px solid #ef4444', color: '#f87171', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Username</label>
              <input type="text" placeholder="e.g. student123" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px', color: '#ffffff', boxSizing: 'border-box' }} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px', color: '#ffffff', boxSizing: 'border-box' }} required />
            </div>

            <button type="submit" style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', marginTop: '8px' }}>
              {authMode === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#94a3b8' }}>
            {authMode === 'login' ? (
              <span>Don't have an account? <span onClick={() => { setAuthMode('register'); setAuthError(''); }} style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold' }}>Register</span></span>
            ) : (
              <span>Already registered? <span onClick={() => { setAuthMode('login'); setAuthError(''); }} style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold' }}>Sign In</span></span>
            )}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', color: '#64748b' }}>
            Default testing bypass: <strong>admin</strong> / <strong>password123</strong>
          </div>
        </div>
      </div>
    );
  }

  // --- PREVIOUS ROOT INTERFACE RENDER (UNTOUCHED LOGIC WITH LOGOUT ADDED TO SIDEBAR) ---
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', color: '#ffffff', fontFamily: 'sans-serif' }}>
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <div style={{ width: '260px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>🎓</div>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>AcademiaHub</span>
        </div>
        
        <button onClick={() => { setActiveTab('dashboard'); setSelectedAssignment(null); }} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'dashboard' ? '#334155' : 'transparent', color: '#ffffff', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>📊 Dashboard Overview</button>
        <button onClick={() => setActiveTab('calendar')} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'calendar' ? '#334155' : 'transparent', color: '#ffffff', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>📅 Editable AI Calendar</button>
        <button onClick={() => setActiveTab('timetable')} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'timetable' ? '#334155' : 'transparent', color: '#ffffff', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>⏰ Editable Timetable</button>
        <button onClick={() => setActiveTab('ai-core')} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'ai-core' ? '#334155' : 'transparent', color: '#ffffff', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>🔮 AI Engine + History</button>

        {/* LOGOUT UTILITY TRIGGER (NEW SIDEBAR ADD-ON) */}
        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #334155' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px', paddingLeft: '8px' }}>User: {username}</div>
          <button onClick={handleLogout} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: '#f87171', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>🚪 Log Out Session</button>
        </div>
      </div>

      {/* RIGHT WORKSPACE SURFACE */}
      <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        
        {/* TAB 1: MAIN DASHBOARD & DRILLDOWNS */}
        {activeTab === 'dashboard' && (
          selectedAssignment ? (
            <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 'bold' }}>LIVE MODULE CONTEXT</span>
                  <h1 style={{ margin: '4px 0 0 0', fontSize: '26px', fontWeight: 'bold', textDecoration: selectedAssignment.isCompleted ? 'line-through' : 'none' }}>{selectedAssignment.title}</h1>
                </div>
                <button onClick={() => setSelectedAssignment(null)} style={{ backgroundColor: '#0f172a', color: '#94a3b8', border: '1px solid #334155', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>Back to Dashboard</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Core Subject</span>
                  <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#f43f5e' }}>📘 {selectedAssignment.subject}</span>
                </div>
                <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Priority Level</span>
                  <span style={{ fontSize: '15px', fontWeight: 'bold', color: selectedAssignment.priority === 'High' ? '#ef4444' : '#f59e0b' }}>{selectedAssignment.priority === 'High' ? '🔴 High' : '🟡 Medium'}</span>
                </div>
                <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Due Date</span>
                  <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#38bdf8' }}>📅 {selectedAssignment.dueDate}</span>
                </div>
              </div>

              {/* Checklist Queue Panel */}
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#38bdf8' }}>📋 Active Academic Checklist Queue</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  {selectedAssignment.checklist?.map((item) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1e293b', padding: '12px 16px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                        <input type="checkbox" checked={item.completed} onChange={() => toggleChecklistItem(item.id)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                        {item.isEditing ? (
                          <input type="text" defaultValue={item.text} autoFocus onBlur={(e) => saveEditingChecklistItem(item.id, e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveEditingChecklistItem(item.id, e.target.value)} style={{ backgroundColor: '#0f172a', color: '#ffffff', border: '1px solid #38bdf8', borderRadius: '4px', padding: '4px', fontSize: '14px', width: '70%' }} />
                        ) : (
                          <span onClick={() => startEditingChecklistItem(item.id)} style={{ fontSize: '14px', textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? '#64748b' : '#e2e8f0', cursor: 'pointer' }}>{item.text}</span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <span onClick={() => startEditingChecklistItem(item.id)} style={{ cursor: 'pointer', color: '#818cf8', fontSize: '13px' }}>✏️ Edit</span>
                        <span onClick={() => deleteChecklistItem(item.id)} style={{ cursor: 'pointer', color: '#ef4444', fontSize: '13px' }}>🗑️ Delete</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" placeholder="Add task requirement details..." value={newPoint} onChange={(e) => setNewPoint(e.target.value)} style={{ flex: 1, backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '6px', padding: '10px', color: '#ffffff' }} />
                  <button onClick={addChecklistItem} style={{ backgroundColor: '#6366f1', color: '#ffffff', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Add Point</button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                <form onSubmit={handleAddObjective}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                    <input type="text" placeholder="Enter assignment, essay topic..." value={taskText} onChange={(e) => setTaskText(e.target.value)} style={{ flex: '2', minWidth: '200px', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px', color: '#ffffff' }} />
                    
                    <select value={subject} onChange={(e) => setSubject(e.target.value)} style={{ flex: '1', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px', color: '#ffffff' }}>
                      <option value="">Select Subject</option>
                      <option value="Psychology">Psychology</option>
                      <option value="Business">Business</option>
                      <option value="Statistics">Statistics</option>
                      <option value="Others">Others</option>
                    </select>

                    {/* DYNAMIC BLANK SPACE CONDITIONAL INPUT FIELD FOR OTHERS */}
                    {subject === 'Others' && (
                      <input type="text" placeholder="Type custom subject name..." value={customSubject} onChange={(e) => setCustomSubject(e.target.value)} style={{ flex: '1', minWidth: '160px', backgroundColor: '#0f172a', border: '1px solid #38bdf8', borderRadius: '6px', padding: '10px', color: '#ffffff' }} required />
                    )}
                    
                    <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ flex: '1', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px', color: '#ffffff' }}>
                      <option value="Low">🟢 Low</option>
                      <option value="Medium">🟡 Medium</option>
                      <option value="High">🔴 High</option>
                    </select>
                    
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ flex: '1', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px', color: '#ffffff' }} />
                    
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ flex: '1', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px', color: '#ffffff', minWidth: '100px' }} />
                  </div>
                  <button type="submit" style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Add Objective</button>
                </form>
              </div>

              {/* Charts Panel Layout */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', color: '#1e293b', marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h4 style={{ alignSelf: 'flex-start', margin: '0 0 12px 0', fontWeight: 'bold' }}>Assignment Status Metrics</h4>
                  <div style={{ width: '100%', height: '140px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={statusData} cx="50%" cy="50%" outerRadius={55} dataKey="value">
                          {statusData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 12px 0', fontWeight: 'bold' }}>Workload Distribution by Subject Name</h4>
                  <div style={{ width: '100%', height: '140px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={workloadData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis allowDecimals={false} stroke="#64748b" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
                <h3 style={{ color: '#ffffff', margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>Active Assignments & Main Targets ({assignments.length})</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {assignments.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, cursor: 'pointer' }} onClick={() => setSelectedAssignment(item)}>
                        <button onClick={(e) => { e.stopPropagation(); setAssignments(assignments.map(a => a.id === item.id ? { ...a, isCompleted: !a.isCompleted } : a)); }} style={{ backgroundColor: item.isCompleted ? '#10b981' : '#334155', border: 'none', borderRadius: '4px', color: '#ffffff', padding: '4px 8px', cursor: 'pointer', fontSize: '12px' }}>
                          ✓
                        </button>
                        <span style={{ color: '#ffffff', fontWeight: 'bold', textDecoration: item.isCompleted ? 'line-through' : 'none', opacity: item.isCompleted ? 0.5 : 1 }}>
                          {item.title}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ color: '#38bdf8', fontSize: '14px' }}>{item.subject}</span>
                        <button onClick={(e) => { e.stopPropagation(); setAssignments(assignments.filter(a => a.id !== item.id)); }} style={{ backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }} title="Delete Target Assignment">
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        )}

        {/* TAB 2: EDITABLE CALENDAR */}
        {activeTab === 'calendar' && (
          <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#38bdf8' }}>📅 Dynamic Interactive Calendar Matrix</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>Click any box layout cell directly to edit or append custom deadline targets.</p>
            
            {selectedCalendarDay && (
              <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #6366f1', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span>Editing Day {selectedCalendarDay}:</span>
                <input type="text" value={calendarInputVal} onChange={(e) => setCalendarInputVal(e.target.value)} style={{ backgroundColor: '#1e293b', border: '1px solid #475569', padding: '8px', color: '#ffffff', borderRadius: '4px', flex: 1 }} />
                <button onClick={saveCalendarDayEvent} style={{ backgroundColor: '#10b981', border: 'none', padding: '8px 16px', borderRadius: '4px', color: '#ffffff', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', textAlign: 'center' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <div key={day} style={{ fontWeight: 'bold', color: '#64748b' }}>{day}</div>)}
              {Array.from({ length: 28 }).map((_, idx) => {
                const dayNum = idx + 1;
                const txt = calendarEvents[dayNum] || '';
                return (
                  <div key={idx} onClick={() => { setSelectedCalendarDay(dayNum); setCalendarInputVal(txt); }} style={{ backgroundColor: '#0f172a', height: '80px', borderRadius: '8px', padding: '8px', border: txt ? '1px solid #6366f1' : '1px solid #1e293b', position: 'relative', cursor: 'pointer' }}>
                    <span style={{ fontSize: '11px', color: '#64748b', position: 'absolute', top: '4px', left: '6px' }}>{dayNum}</span>
                    {txt && <div style={{ backgroundColor: '#6366f133', color: '#818cf8', fontSize: '10px', padding: '2px', borderRadius: '4px', marginTop: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{txt}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: EDITABLE TIMETABLE */}
        {activeTab === 'timetable' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#10b981', fontWeight: 'bold' }}>➕ Append New Lecture or Track Event</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ backgroundColor: '#334155', color: '#38bdf8', border: '1px solid #475569', padding: '8px 14px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 'bold' }}>
                    📥 Upload Timetable Matrix File
                    <input type="file" accept=".txt,.csv,.md" onChange={handleTimetableFileImport} style={{ display: 'none' }} />
                  </label>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>(Format: Day, Subject, Time, Room)</span>
                </div>
              </div>

              <form onSubmit={handleAddTimetableSlot} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <select value={newSlotDay} onChange={(e) => setNewSlotDay(e.target.value)} style={{ backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px', color: '#ffffff', flex: '1', minWidth: '120px' }}>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
                <input type="text" placeholder="Subject (e.g. Advanced Statistics)" value={newSlotSubject} onChange={(e) => setNewSlotSubject(e.target.value)} style={{ backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px', color: '#ffffff', flex: '2', minWidth: '180px' }} required />
                <input type="text" placeholder="Hours (e.g. 11:30 - 13:30)" value={newSlotTime} onChange={(e) => setNewSlotTime(e.target.value)} style={{ backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px', color: '#ffffff', flex: '1', minWidth: '140px' }} />
                <input type="text" placeholder="Room/Lab (e.g. Lab 3)" value={newSlotRoom} onChange={(e) => setNewSlotRoom(e.target.value)} style={{ backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '10px', color: '#ffffff', flex: '1', minWidth: '100px' }} />
                <button type="submit" style={{ backgroundColor: '#10b981', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Add Event</button>
              </form>
            </div>

            {/* Timetable List Display */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#ffffff' }}>⏰ Lecture Schedule Overview</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {timetable.map((slot) => (
                  <div key={slot.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                    {slot.isEditing ? (
                      <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
                        <input type="text" defaultValue={slot.subject} onBlur={(e) => saveTimetableSlot(slot.id, { subject: e.target.value })} style={{ backgroundColor: '#1e293b', color: '#ffffff', border: '1px solid #38bdf8', padding: '4px', borderRadius: '4px' }} />
                        <input type="text" defaultValue={slot.time} onBlur={(e) => saveTimetableSlot(slot.id, { time: e.target.value })} style={{ backgroundColor: '#1e293b', color: '#ffffff', border: '1px solid #38bdf8', padding: '4px', borderRadius: '4px' }} />
                        <input type="text" defaultValue={slot.room} onBlur={(e) => saveTimetableSlot(slot.id, { room: e.target.value })} style={{ backgroundColor: '#1e293b', color: '#ffffff', border: '1px solid #38bdf8', padding: '4px', borderRadius: '4px' }} />
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <span style={{ backgroundColor: '#334155', color: '#10b981', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{slot.day}</span>
                        <span style={{ fontWeight: 'bold' }}>{slot.subject}</span>
                        <span style={{ color: '#94a3b8', fontSize: '14px' }}>⏳ {slot.time}</span>
                        <span style={{ color: '#38bdf8', fontSize: '14px' }}>📍 {slot.room}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button onClick={() => setTimetable(timetable.map(s => s.id === slot.id ? { ...s, isEditing: !s.isEditing } : s))} style={{ backgroundColor: 'transparent', border: 'none', color: '#818cf8', cursor: 'pointer' }}>✏️</button>
                      <button onClick={() => handleRemoveTimetableSlot(slot.id)} style={{ backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AI STREAM SURFACE ENGINE */}
        {activeTab === 'ai-core' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#818cf8' }}>🔮 Local AI Core Engine System</h3>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                <label style={{ backgroundColor: '#0f172a', border: '1px solid #475569', color: '#94a3b8', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
                  📎 Attach Syllabus (.txt)
                  <input type="file" accept=".txt,.md" onChange={handleFileUpload} style={{ display: 'none' }} />
                </label>
                <label style={{ backgroundColor: '#0f172a', border: '1px solid #475569', color: '#94a3b8', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
                  📷 Attach Assignment Image
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                </label>
              </div>

              {attachedFiles.length > 0 && (
                <div style={{ marginBottom: '12px', color: '#38bdf8', fontSize: '13px' }}>
                  Ready File Attachments: {attachedFiles.join(', ')}
                </div>
              )}

              {attachedPhotos.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                  {attachedPhotos.map((p, idx) => (
                    <img key={idx} src={p.url} alt={p.name} style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #38bdf8' }} />
                  ))}
                </div>
              )}

              <textarea placeholder="Ask your local Ollama instance for assignment breakdowns, conceptual maps, or schedule optimizations..." value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} style={{ width: '100%', height: '120px', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '8px', padding: '12px', color: '#ffffff', fontFamily: 'sans-serif', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box', marginBottom: '16px' }} />
              
              <button onClick={handleQueryEngine} disabled={isAiLoading} style={{ backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: isAiLoading ? 'not-allowed' : 'pointer', opacity: isAiLoading ? 0.6 : 1 }}>
                {isAiLoading ? "Processing Stream Tokens..." : "Execute Query Engine"}
              </button>

              {aiResponse && (
                <div style={{ marginTop: '24px', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '20px', borderRadius: '8px', whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '14px' }}>
                  <span style={{ fontSize: '11px', color: '#818cf8', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>INCOMING STREAM RESPONSE:</span>
                  {aiResponse}
                </div>
              )}
            </div>

            {/* AI Prompt History List */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#94a3b8' }}>📜 Matrix Search History</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {aiHistory.map((hist) => (
                  <div key={hist.id} style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                    <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>Q: {hist.prompt}</div>
                    <div style={{ color: '#cbd5e1', fontSize: '13px', whiteSpace: 'pre-wrap' }}>{hist.response}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
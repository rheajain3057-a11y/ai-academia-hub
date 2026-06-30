cat << 'EOF' > src/components/DashboardMetrics.jsx
import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardMetrics({ assignments = [] }) {
  // Calculate Status Metrics (Pie Chart)
  const completedCount = assignments.filter(a => a.status === 'Completed' || a.completed).length;
  const pendingCount = assignments.length - completedCount;

  const statusData = [
    { name: 'Completed', value: completedCount || 0, color: '#10b981' }, 
    { name: 'Pending', value: pendingCount || 0, color: '#f59e0b' }     
  ];

  // Calculate Workload Distribution (Bar Chart)
  const workloadData = [
    { name: 'Pending', count: pendingCount },
    { name: 'Completed', count: completedCount }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      color: '#1e293b',
      marginBottom: '24px'
    }}>
      
      {/* Left Panel: Assignment Status Metrics (Pie) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ alignSelf: 'flex-start', margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>
          Assignment Status Metrics
        </h3>
        <div style={{ width: '100%', height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={assignments.length > 0 ? statusData : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={80}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Custom Legend */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '14px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', backgroundColor: '#10b981', display: 'inline-block' }}></span>
            Completed
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', backgroundColor: '#f59e0b', display: 'inline-block' }}></span>
            Pending
          </span>
        </div>
      </div>

      {/* Right Panel: Workload Distribution (Bar) */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>
          Workload Distribution
        </h3>
        <div style={{ width: '100%', height: '220px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workloadData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={true} tickLine={false} stroke="#64748b" />
              <YAxis allowDecimals={false} axisLine={true} tickLine={false} stroke="#64748b" />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={120} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
EOF
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function AnalyticsDashboard({ assignments = [] }) {
  // Process Status breakdown for Pie Chart
  const statusCounts = assignments.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map(key => ({
    name: key,
    value: statusCounts[key]
  }));

  const COLORS = { Pending: '#f59e0b', Completed: '#10b981', Overdue: '#ef4444' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '20px', background: '#fff', borderRadius: '12px' }}>
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>Assignment Status Metrics</h3>
        <div style={{ height: '250px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name] || '#999'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>Workload Distribution</h3>
        <div style={{ height: '250px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
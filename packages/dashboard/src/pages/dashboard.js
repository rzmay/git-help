import React from 'react';

export default function Dashboard() {
  // Example data for the issues table
  console.log('MOTLDSFJK');
  const issues = [
    { id: 1, title: 'Issue 1', status: 'Open', priority: 'High' },
    { id: 2, title: 'Issue 2', status: 'Closed', priority: 'Medium' },
    // Add more issues here
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id} className="border-b">
                <td className="px-4 py-2">{issue.id}</td>
                <td className="px-4 py-2">{issue.title}</td>
                <td className="px-4 py-2">{issue.status}</td>
                <td className="px-4 py-2">{issue.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

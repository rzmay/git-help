import React from 'react';
import useLogin from '../hooks/useLogin';
import dayjs from 'lib/dayjs'
import useAPI from '../hooks/useAPI'

export default function Dashboard() {
  useLogin();

  const { data: issues, error, loading } = useAPI('/issues',);

  console.log(issues);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical': return 'text-red-600';
      case 'High': return 'text-orange-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Account</th>
              <th className="px-4 py-2 ">Number</th>
              <th className="px-4 py-2">Complaints</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">ETOC</th>
              <th className="px-4 py-2">Urgency</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Impact</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id} className="border-b">
                <td className="px-4 py-2">{issue.created}</td>
                <td className="px-4 py-2">{issue.number}</td>
                <td className="px-4 py-2">{issue.complaints}</td>
                <td className="px-4 py-2">{issue.title}</td>
                <td className="px-4 py-2">{issue.description}</td>
                <td className={`px-4 py-2 ${getUrgencyColor(issue.labelsurgency)}`}>{issue.labelsurgency}</td>
                <td className={`px-4 py-2 ${getImpactColor(issue.labelsimpact)}`}>{issue.labelsimpact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

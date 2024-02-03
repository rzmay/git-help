import React from 'react';
import dayjs from 'lib/dayjs'

export default function Dashboard() {
  // Example data for the issues 
  const formattedDate = dayjs().format('YYYY-MM-DD');
  const issues = [
    { created: dayjs().format('YYYY-MM-DD'), account: "macdonalds", number: 1, status: "open", complaints: 43, title: "Problem: A big one", description: "Its just a big problem", labelsurgency: "Critical", labelstype: "Bug", labelsestimated_implementation_time: "hours", labelsimpact: "high" },
    { created: dayjs().format('YYYY-MM-DD'), account: "macdonalds", number: 2, status: "open", complaints: 5, title: "Problem: A big one", description: "Its just a big problem", labelsurgency: "Critical", labelstype: "Bug", labelsestimated_implementation_time: "hours", labelsimpact: "high" },
    { created: dayjs().format('YYYY-MM-DD'), account: "macdonalds", number: 3, status: "open", complaints: 32, title: "Problem: A big one", description: "Its just a big problem", labelsurgency: "Critical", labelstype: "Bug", labelsestimated_implementation_time: "hours", labelsimpact: "high" },
    // Add more issues here
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Account</th>
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Urgency</th>
              <th className="px-4 py-2">ETOC</th>
              <th className="px-4 py-2">Impact</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id} className="border-b">
                <td className="px-4 py-2">{issue.created}</td>
                <td className="px-4 py-2">{issue.account}</td>
                <td className="px-4 py-2">{issue.number}</td>
                <td className="px-4 py-2">{issue.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

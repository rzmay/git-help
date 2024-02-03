import dayjs from 'lib/dayjs';
import React from 'react';
import useAPI from '../hooks/useAPI';
import useLogin from '../hooks/useLogin';
<<<<<<< HEAD
import useAPI from '../hooks/useAPI'
import dayjs from 'lib/dayjs'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
=======
>>>>>>> 6c4d9962f8cfc36813787c7d134199ab7d54a8ae

export default function Dashboard() {
  useLogin();

  const { data: issues, error, loading } = useAPI('/v1/issues');

  if (loading) return <div>Please login before accessing the dashboard</div>;
  if (error) return <div>Error: {error.message}</div>;

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'wide': return 'text-red-500';
      case 'medium': return 'text-yellow-400';
      case 'minimal': return 'text-green-500';
      default: return 'text-gray-600';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-500';
      default: return 'text-gray-600';
    }
  };
  const getImpactState = (impact) => {
    switch (impact) {
      case 'wide': return 'Wide';
      case 'medium': return 'Medium';
      case 'minimal': return 'Minimal';
      default: return '';
    }
  };

  const getUrgencyState = (urgency) => {
    switch (urgency) {
      case 'critical': return 'Critical';
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return '';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2 ">Number</th>
              <th className="px-4 py-2">Complaints</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Urgency</th>
              <th className="px-4 py-2">Impact</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
<<<<<<< HEAD
              <tr key={issue.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 ">{dayjs(issue.created).format("LLL")}</td>
=======
              <tr key={issue.id} className="border-b">
                <td className="px-4 py-2">{dayjs(issue.created).format('LLL')}</td>
>>>>>>> 6c4d9962f8cfc36813787c7d134199ab7d54a8ae
                <td className="px-4 py-2">{issue.number}</td>
                <td className="px-4 py-2">{issue.complaints}</td>
                <td className="px-4 py-2">{issue.title}</td>
                <td className="px-4 py-2">{issue.description}</td>
                <td className={`px-4 py-2 font-bold ${getUrgencyColor(issue.labels.urgency)}`}>{getUrgencyState(issue.labels.urgency)}</td>
                <td className={`px-4 py-2 font-bold ${getImpactColor(issue.labels.impact)}`}>{getImpactState(issue.labels.impact)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

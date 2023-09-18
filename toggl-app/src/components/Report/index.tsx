import { TimeEntry } from '@/types/timeEntry';
import React from 'react';

type Props = {
  timeEntries: TimeEntry[];
};

export const Report = ({ timeEntries }: Props) => {
  // Create a grouped object where keys are project_ids and values are arrays of time entries
  const groupedTimeEntries: Record<number, TimeEntry[]> = timeEntries.reduce(
    (grouped, entry) => {
      const projectId = entry.project_id;
      if (!grouped[projectId]) {
        grouped[projectId] = [];
      }
      grouped[projectId].push(entry);
      return grouped;
    },
    {}
  );

  return (
    <>
      {Object.entries(groupedTimeEntries).map(([projectId, entries]) => {
        // Find the project name based on the project_id
        const project = entries.length > 0 ? entries[0].project_name : '';

        // Further group entries by date
        const groupedByDate: Record<string, TimeEntry[]> = entries.reduce(
          (grouped, entry) => {
            const date = entry.start.split('T')[0];
            if (!grouped[date]) {
              grouped[date] = [];
            }
            grouped[date].push(entry);
            return grouped;
          },
          {}
        );

        return (
          <div key={projectId} >
            <h2>Project - {projectId} ({project})</h2>
            {Object.entries(groupedByDate).map(([date, entriesPerDate]) => (
              <div key={date}>
                <h3 className="self-center">Date: {date}</h3>
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                      <th />
                      <th>Task</th>
                      <th>Start</th>
                      <th>End</th>
                    </tr>
                    </thead>
                    <tbody>
                    {entriesPerDate.map((entry) => (
                      <tr key={entry.id}>
                        <td>{entry.id}</td>
                        <td>{entry.task}</td>
                        <td>{entry.start}</td>
                        <td>{entry.end}</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

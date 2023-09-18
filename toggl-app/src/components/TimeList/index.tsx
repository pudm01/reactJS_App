'use client'
import React, {useEffect, useState} from 'react';
import {TimeEntry} from '@/types/timeEntry';
import {useRouter} from 'next/navigation'
import {Input} from '@/components/Input';
import {Dialog} from '@/components/Dialog';
import {deleteTE, updateTE} from '@/clientCalls/timeEntries';

type Props = {
  timeEntries: TimeEntry[];
};

const formatDate = (dateString: string) => {
  // Parse the date string into a Date object
  const date = new Date(dateString);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

export const TimeList = ({timeEntries}: Props) => {
  const router = useRouter();
  const [editingEntry, setEditingEntry] = useState<TimeEntry | undefined>(undefined);
  const [deletingEntry, setDeletingEntry] = useState<TimeEntry | undefined>(undefined);

  const selectEntry = (id: number) => () => {
    const selectedEntry = timeEntries.find((p) => p.id === id);
    if (selectedEntry) {
      setEditingEntry(selectedEntry);
    }
  };

  const selectDeleteEntry = (id: number) => () => {
    const selectedEntry = timeEntries.find((p) => p.id === id);
    if (selectedEntry) {
      setDeletingEntry(selectedEntry);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setEditingEntry((prevEditingEntry) => ({...prevEditingEntry,[name]: value,}));
  };

  const onSave = () => {
    // Call this function when you want to save the edited entry
    // You can perform validation here
    // If the validation passes, it will trigger the useEffect and update the entry
    if(!editingEntry) return
    updateTE(editingEntry)
      .then(() => {
        setEditingEntry(undefined);
        router.refresh();
      })
      .catch((error) => {
        console.error('Error updating entry:', error);
        // Handle error appropriately
      });
  };

  const onDelete = () => {
    // Handle delete action here using your API endpoint
    // You can use createTE or another function for this
    // After successful delete, setEditingEntry(undefined) and refresh the data
    if(!deletingEntry) return
    deleteTE(deletingEntry)
      .then(() => {
        setDeletingEntry(undefined);
        router.refresh();
      })
      .catch((error) => {
        console.error('Error updating entry:', error);
        // Handle error appropriately
      });
  };

  return (
    <>
      <Dialog open={editingEntry !== undefined} close={() => setEditingEntry(undefined)}>
        {editingEntry !== undefined && (
          <form onSubmit={onSave} className="flex flex-col gap-2">
            <Input label="Task" name="task" value={editingEntry.task} onChange={handleEditChange}/>
            <Input
              label="Start"
              name="start"
              value={formatDate(editingEntry.start)}
              type="datetime-local"
              onChange={handleEditChange}
            />
            <Input
              label="End"
              name="end"
              value={formatDate(editingEntry.end)}
              type="datetime-local"
              onChange={handleEditChange}
            />
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        )}
      </Dialog>
      <Dialog open={deletingEntry !== undefined} close={() => setDeletingEntry(undefined)}>
        {deletingEntry !== undefined && (
          <form onSubmit={onDelete} className="flex flex-col gap-2">
            <p>Are you sure you want to delete this time entry?</p>
            <button className="btn btn-error" type="submit">
              DELETE
            </button>
          </form>
        )}
      </Dialog>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
          <tr>
            <th/>
            <th>Task</th>
            <th>Start</th>
            <th>End</th>
            <th>Project</th>
            <th className="flex justify-end">Actions</th>
          </tr>
          </thead>
          <tbody>
          {timeEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.task}</td>
              <td>{formatDate(entry.start)}</td>
              <td>{formatDate(entry.end)}</td>
              <td>{entry.project_name}</td>
              <td className="flex justify-end space-x-4">
                <button className="btn btn-neutral btn-sm" onClick={selectEntry(entry.id!)}>
                  edit
                </button>
                <button className="btn btn-error btn-sm" onClick={selectDeleteEntry(entry.id!)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

'use client'
import {useRouter} from 'next/navigation'
import {TimeEntry} from '@/types/timeEntry'
import {useEffect, useState} from 'react'
import {Input} from '@/components/Input'
import {createTE} from '@/clientCalls/timeEntries'
import {ProjectSelector} from '@/components/ProjectSelector'

const initValue: TimeEntry = {
  end: '',
  start: '',
  task: '',
  project_id: 4,
  user_name: process.env.NEXT_PUBLIC_USERNAME!,
};

export const TimeForm = () => {
  const router = useRouter();
  const [timeEntry, setTimeEntry] = useState<TimeEntry>(initValue);


  useEffect(() => {
    if (timeEntry.start && timeEntry.end && timeEntry.task) {
      createTE(timeEntry)
        .then(() => {
          setTimeEntry(initValue)
          router.refresh()
        })
    }
  }, [router, timeEntry])


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setTimeEntry({...timeEntry, [name]: value});
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setTimeEntry({...timeEntry, [name]: value});
  };


  return (
    <form className="flex flex-wrap items-end gap-1">
      <Input label="Task" name="task" value={timeEntry.task} onChange={handleChange}/>
      <Input
        label="Start"
        name="start"
        value={timeEntry.start}
        onChange={handleChange}
        type="datetime-local"
      />
      <Input label="End" name="end" value={timeEntry.end} onChange={handleChange} type="datetime-local"/>
      <ProjectSelector name="project_id" value={timeEntry.project_id} handleChange={handleSelectChange}/>
      {timeEntry.start && (
        <button
          className="btn btn-neutral"
          disabled={timeEntry.end !== ''}
          onClick={() => {
            setTimeEntry({...timeEntry, end: formatDate(new Date())})
          }}
        >
          Stop
        </button>
      )}
      {!timeEntry.start && (
        <button
          className="btn btn-neutral"
          onClick={() => {
            setTimeEntry({...timeEntry, start: formatDate(new Date())})
          }}
        >
          Start
        </button>
      )}
    </form>
  );
};

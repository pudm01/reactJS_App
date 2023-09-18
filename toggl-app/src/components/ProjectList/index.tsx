import React, { useState } from 'react';
import { Project } from '@/types/project';

type Props = {
  projects: Project[];
  onSelect: (id: number) => () => void;
  onToggle: (id: number) => () => void;
};

export const ProjectList = ({ projects, onSelect, onToggle }: Props) => {
  const [searchText, setSearchText] = useState<string>('');

  const filteredProjects = projects.filter((project) =>
    project.user_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <div className="form-control mb-4 flex flex-row justify-end space-x-4">
        <label htmlFor="searchInput" className="self-center">Filter by user:</label>
        <input
          type="text"
          id="searchInput"
          value={searchText}
          onChange={handleSearchInputChange}
          placeholder="Enter username..."
          className="input input-bordered w-24 md:w-auto"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Owner</th>
            <th className="flex justify-end">Actions</th>
          </tr>
          </thead>
          <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.id} className={project.active ? undefined : 'line-through'}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.user_name}</td>
              <td className="flex justify-end space-x-4">
                <button disabled={project.user_name!==process.env.NEXT_PUBLIC_USERNAME} className="btn btn-neutral btn-sm" onClick={onSelect(project.id!)}>
                  edit
                </button>
                <button disabled={project.user_name!==process.env.NEXT_PUBLIC_USERNAME} className="btn btn-primary btn-sm" onClick={onToggle(project.id!)}>
                  toggle
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

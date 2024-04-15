/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import { Task } from '../App';

interface Props {
  name: string;
  isCompleted: boolean;
  data: unknown;
  dataSetter: Task;
}

export default function Item(props: Props) {
  const { name, isCompleted, data, dataSetter } = props;
  const [isEditing, setIsEditing] = useState(false);

  const onDelete = () => {
    const newTasks = data?.filter((element: { name: string }) => element?.name !== name);
    dataSetter(newTasks);
  };

  const markAsDone = () => {
    // get the item
    const updatedData = data?.map((element: { name: string; isCompleted: unknown }) =>
      element.name === name ? { ...element, isCompleted: !element.isCompleted } : element,
    );
    // mark it as complete
    dataSetter(updatedData);
  };

  const onClickEdit = () => {
    setIsEditing(!isEditing);
  };

  const setChangedValue = (value: string) => {
    const updatedData = data?.map((element: { name: string }) =>
      element.name === name ? { ...element, name: value } : element,
    );
    // mark it as complete
    dataSetter(updatedData);
  };

  return (
    <div className="card" style={{ margin: '2%' }}>
      <div
        className="card-body"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        {(isEditing && (
          <textarea
            className="text-wrap"
            style={{ flex: 0.5 }}
            disabled={!isEditing}
            value={name}
            onChange={(value) => setChangedValue(value.target.value)}
          />
        )) || (
          <h6
            className="card-title text-wrap"
            style={{
              flex: 0.5,
              textDecoration: (isCompleted && 'line-through') || '',
              border: 'none',
              textAlign: 'left',
            }}
          >
            {name}
          </h6>
        )}
        <div
          style={{
            display: 'flex',
            flex: 0.5,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <button className="btn btn-primary" onClick={onClickEdit}>
            {(!isEditing && 'Edit') || 'Save'}
          </button>
          <button className="btn btn-primary" onClick={onDelete}>
            Delete
          </button>
          <button className="btn btn-primary" onClick={markAsDone}>
            {(isCompleted && 'Mark as Incomplete') || 'Mark as Complete'}
          </button>
        </div>
      </div>
    </div>
  );
}

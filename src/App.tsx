import './App.css';

import { useState } from 'react';

import Item from './Components/Item';

export interface Task {
  name: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { name: 'First One', isCompleted: false },
    { name: 'Second One', isCompleted: false },
  ]);
  const [newTask, setNewTask] = useState('');
  const onSubmit = () => {
    const updatedArray = [...tasks, { name: newTask, isCompleted: false }];
    setTasks(updatedArray);
  };

  const getCompletedTasks = (): number => {
    return tasks.filter((item) => item.isCompleted).length;
  };

  return (
    <div className="App">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <p className="navbar-brand">To-Do List</p>
          <button
            type="button"
            className="btn btn-secondry"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Task
          </button>
        </div>
      </nav>
      <div
        className="container-fluid"
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}
      >
        <p style={{ flex: 0.5 }}>Total Tasks: {tasks.length}</p>
        <p style={{ flex: 0.5 }}>Completed Tasks: {getCompletedTasks()}</p>
      </div>
      {tasks.length &&
        tasks.map((item, key) => {
          return (
            <Item
              name={item.name}
              isCompleted={item.isCompleted}
              key={key}
              data={tasks}
              dataSetter={setTasks}
            />
          );
        })}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add a Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <span className="input-group-text">Task Description</span>
                <textarea
                  onChange={(text) => setNewTask(text.target.value)}
                  className="form-control"
                  aria-label="With textarea"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSubmit}
                data-bs-dismiss="modal"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';

function App() {
  return (
      <div className="App">
        <div className="todoList">
          <div className="todoList-header">
            <h3 className="todoList-header__title">What to Learn</h3>
            <div className="todoList-newTaskForm">
              <input type="text" placeholder="title"/>
              <button>Add</button>
            </div>
          </div>
          <div className="todoList-tasks">
            <div className="todoList-task">
              <input type="checkbox" checked={true}/>
              <span>CSS</span>
            </div>
            <div className="todoList-task">
              <input type="checkbox" checked={false}/>
              <span>JS</span>
            </div>
            <div className="todoList-task">
              <input type="checkbox" checked={false}/>
              <span>ReactJS</span>
            </div>
            <div className="todoList-task">
              <input type="checkbox" checked={true}/>
              <span>Patterns</span>
            </div>
          </div>
          <div className="todoList-footer">
            <button>All</button>
            <button>Completed</button>
            <button>Active</button>
          </div>
        </div>
      </div>
  );
}

export default App;

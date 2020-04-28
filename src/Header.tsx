import React from "react";

export const Header = () => {
    return <div className="todoList-header">
        <h3 className="todoList-header__title">What to Learn</h3>
        <div className="todoList-newTaskForm">
            <input type="text" placeholder="title"/>
            <button>Add</button>
        </div>
    </div>
}
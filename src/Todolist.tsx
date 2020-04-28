import {Header} from "./Header";
import {Tasks} from "./Tasks";
import {Footer} from "./Footer";
import React from "react";

export const Todolist = () => {
    return <div className="todoList">
        <Header/>
        <Tasks/>
        <Footer/>
    </div>
}
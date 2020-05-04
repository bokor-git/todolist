import styles from './App.module.css';
import {Todolist} from './components/Todolist/Todolist';
import React from 'react';

function App() {
    return (
        <div className={styles.App}>
            <Todolist/>
            <Todolist/>
            <Todolist/>
        </div>
    );
}

export default App;

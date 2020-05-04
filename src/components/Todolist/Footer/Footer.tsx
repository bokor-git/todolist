import React from 'react';
import Button from "../../common/Button/Button";

export function Footer() {
    return <div className="todoList-footer">
        <Button text="All" type="info"/>
        <Button text="Completed" type="danger"/>
        <Button text="Active" type="success"/>
    </div>
}

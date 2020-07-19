import {AddItemForm} from "./AddItemForm";
import React from "react"
import { action } from '@storybook/addon-actions';

export default {
    title: 'AddItemForm component',
    component: AddItemForm,
}

const callback =action("Button Add was pressed inside the form")

export const AddItemFormBaseExample = ()=>{
    return <AddItemForm addItem={(callback)}/>
}
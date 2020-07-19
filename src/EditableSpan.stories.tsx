import React from "react"
import {action} from '@storybook/addon-actions';
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'EditableSpan component',
    component: EditableSpan,
}

const onChangeCallback = action("Value changed")

export const EditableSpanBaseExample = () => {
    return <EditableSpan value={"Example text"} onChange={onChangeCallback}/>
}
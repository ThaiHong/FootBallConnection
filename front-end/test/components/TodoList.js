import React from 'react'
import getRenderOutput from './TestComponentUtils'
import TodoList from '../../app/components/TodoList'
import expect from 'expect'

export const testRenderTodoList = () => {
    const props = {
        todos: [
            {
                name: 'Learn Redux',
                completed: false,
                id: 0
            },
            {
                name: 'Go shopping',
                completed: true,
                id: 1
            }
        ],
        onTodoClick: () => {}
    }

    const output = getRenderOutput(<TodoList {...props} />)
    expect(output.type).toBe('ul')
    expect(output.props.children.length).toBe(2)
}

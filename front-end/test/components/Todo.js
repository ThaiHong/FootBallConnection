import Todo from '../../app/components/Todo'
import expect from 'expect'
import React from 'react'
import getRenderOutput from './TestComponentUtils'

export const testRenderIncompleteTodo = () => {
    const props = {
        onClick: () => {},
        name: 'Learn Redux',
        completed: false
    }

    const output = getRenderOutput(<Todo {...props} />)

    expect(output.type).toBe('li')
    expect(output.props.children.type).toBe('div')
    expect(output.props.children.props.className).toEqual('view')
}

export const testRenderCompletedTodo = () => {
    const props = {
        onClick: () => {},
        name: 'Learn Redux',
        completed: true
    }

    const output = getRenderOutput(<Todo {...props} />)

    expect(output.type).toBe('li')
    expect(output.props.className).toEqual('completed')
    expect(output.props.children.type).toBe('div')
    expect(output.props.children.props.className).toEqual('view')
}

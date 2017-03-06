import React from 'react'
import getRenderOutput from './TestComponentUtils'
import Link from '../../app/components/Link'
import expect from 'expect'

export const testRenderActiveLink = () => {
    const props = {
        active: true,
        children: 'All',
        onClick: () => {}
    }
    const output = getRenderOutput(<Link {...props} />)

    expect(output.type).toBe('li');
    expect(output.props.children.type).toBe('a')
    expect(output.props.children.props.className).toEqual('selected')
}

export const testRenderInactiveLink = () => {
    const props = {
        active: false,
        children: 'All',
        onClick: () => {}
    }
    const output = getRenderOutput(<Link {...props} />)

    expect(output.type).toBe('li');
    expect(output.props.children.type).toBe('a')
}



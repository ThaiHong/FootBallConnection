import * as types from '../../app/constants'
import * as actions from '../../app/actions'
import expect from 'expect'

describe('actions', () => {
    it('TODO: should create an action to add a todo', () => {
        // const name = 'Finish docs'
        // const expectedAction = {
        //     type: types.ADD_TODO,
        //     name
        // }
        // expect(actions.addTodo(name)).toEqual(expectedAction)
    })

    it('TODO: should create an action to toggle a todo', () => {
        // const id = 1
        // const expectedAction = {
        //     type: types.TOGGLE_TODO,
        //     id
        // }
        //
        // expect(actions.toggleTodo(id)).toEqual(expectedAction)
    })

    it('should create an action to set visibility filter', () => {
        const filter = types.SHOW_ALL
        const expectedAction = {
            type: types.SET_VISIBILITY_FILTER,
            filter
        }

        expect(actions.setVisibilityFilter(filter)).toEqual(expectedAction)
    })
})



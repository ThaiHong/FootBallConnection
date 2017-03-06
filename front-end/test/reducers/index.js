import * as reducers from '../../app/reducers'
import * as actions from '../../app/actions'
import * as types from '../../app/constants'
import expect from 'expect'

describe('reducers', () => {
    describe('todo', () =>{
        it('TODO: handle ADD_TODO', ()=>{
            // const beforeState = undefined
            // const action = {...actions.addTodo('Learn Redux'), id: 0}
            // const afterState = {
            //     name: 'Learn Redux',
            //     id: 0,
            //     completed: false
            // }
            //
            // expect(reducers.todo(beforeState, action))
            //     .toEqual(afterState)

        })

        it('TODO: handle TOGGLE_TODO: different id', () => {
            // const beforeState = {
            //     name: 'Learn Redux',
            //     id: 0,
            //     completed: false
            // }
            //
            // const action = actions.toggleTodo(1)
            //
            // expect(reducers.todo(beforeState, action))
            //     .toEqual(beforeState)
        })

        it('TODO: handle TOGGLE_TODO: same id', () => {
            // const beforeState = {
            //     name: 'Learn Redux',
            //     id: 1,
            //     completed: false
            // }
            //
            // const action = actions.toggleTodo(1)
            //
            // const afterState = {
            //     name: 'Learn Redux',
            //     id: 1,
            //     completed: true
            // }
            //
            // expect(reducers.todo(beforeState, action))
            //     .toEqual(afterState)
        })
    })

    describe('TODO: todos', () => {
        it('TODO: handle ADD_TODO', () => {
            // const beforeState = []
            // const action = actions.addTodo('Learn Redux')
            // const afterState = [{
            //     name: 'Learn Redux',
            //     id: 0,
            //     completed: false
            // }]
            //
            // expect(reducers.todos(beforeState, action))
            //     .toEqual(afterState)
        })

        it('TODO: handle TOGGLE_TODO', () => {
            // const beforeState = [
            //     {
            //         name: 'Learn Redux',
            //         id: 0,
            //         completed: false
            //     },
            //     {
            //         name: 'Go Shopping',
            //         id: 1,
            //         completed: false
            //     }
            // ]
            //
            // const action = actions.toggleTodo(1)
            //
            // const afterState = [
            //     {
            //         name: 'Learn Redux',
            //         id: 0,
            //         completed: false
            //     },
            //     {
            //         name: 'Go Shopping',
            //         id: 1,
            //         completed: true
            //     }
            // ]
            //
            // expect(reducers.todos(beforeState, action))
            //     .toEqual(afterState)
        })
    })

    describe('visibilityFitler', () => {
        it('Default state is  SHOW_ALL', () => {
            const action = actions.setVisibilityFilter('random')
            expect(reducers.visibilityFilter(undefined, actions))
                .toEqual(types.SHOW_ALL)
        })

        it('Set filter is SHOW_ACTIVE', () => {
            const action = actions.setVisibilityFilter(types.SHOW_ACTIVE)
            expect(reducers.visibilityFilter(types.SHOW_ALL, action))
                .toEqual(types.SHOW_ACTIVE)
        })
    })
})

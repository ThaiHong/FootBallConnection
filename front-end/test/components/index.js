import * as LinkTest from './Link'
import * as TodoTest from './Todo'
import * as TodoListTest from './TodoList'


describe('components', () => {
    describe('Link', () => {
        it('render active Link', LinkTest.testRenderActiveLink)
        it('render inactive Link', LinkTest.testRenderInactiveLink)
    })

    describe('Todo', () => {
        it('render uncompleted todo', TodoTest.testRenderIncompleteTodo)
        it('render completed todo', TodoTest.testRenderCompletedTodo)
    })

    describe('TodoList', () => {
        it('render todo list', TodoListTest.testRenderTodoList)
    })
})

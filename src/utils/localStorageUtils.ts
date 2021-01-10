import {todoType} from '@/interfaces/main'

export function getTodoList() : Array<todoType>{
    const todolist = JSON.parse(localStorage.getItem('todo-list') || '[]')
    console.log(todolist);
    
    return todolist
}

export function setTodoList(value : todoType[]) :void{
    if(!value) return
    localStorage.setItem('todo-list',JSON.stringify(value))
}

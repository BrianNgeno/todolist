import React from 'react'
import Todo from './Todo';


function TodoList({todos,toggleData}) {
  return (
    todos.map(todo => {
        return <Todo key={todo.id} todo={todo} toggleData={toggleData}/>
    })
  )
}

export default TodoList;
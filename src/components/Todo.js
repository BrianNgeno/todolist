import React from 'react'

function Todo({todo,toggleData}) {
  function handleNewItem(){
    toggleData(todo.id)
  }
  return (
    <>
    <input type="checkbox" checked={todo.complete} onChange={handleNewItem}/>
    {todo.name}
    </>
  )
}

export default Todo;
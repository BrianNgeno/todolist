import "./App.css";
import TodoList from "./components/TodoList";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import PouchDB from "pouchdb";

const LOCAL_STORAGE_KEY = "listApp.items";
function App() {
  const [items, setItems] = useState([]);
  const listNameRef = useRef();
  var db = new PouchDB("dbname");

  // useEffect(() => {
  //   localStorage.setItem(
  //     LOCAL_STORAGE_KEY,
  //     JSON.stringify([{ id: Date.now(), complete: false, name: "Some name" }])
  //   );
  // }, [items]);

  function handleStorage(item) {
    let res = localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...items, item])
    );
    console.log([...items, item]);
    console.log(res);
  }

  useEffect(() => {
    async function fetchData() {
      const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      console.log(storedData);
      if (storedData) {
        setItems(storedData);
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   db.put({
  //     _id: "mydoc" + Date.now(),
  //     title: "Cats",
  //   })
  //     .then(function (response) {
  //       // handle response
  //       console.log(response);
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });

  //   db.allDocs({
  //     include_docs: true,
  //     attachments: true,
  //   })
  //     .then(function (result) {
  //       // handle result
  //       console.log(result);
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // }, []);

  function handleUpdateList(e) {
    const name = listNameRef.current.value;

    if (name === "") return;
    setItems((prevItems) => {
      return [...prevItems, { id: uuidv4(), name: name, complete: false }];
    });
    handleStorage({ id: uuidv4(), name: name, complete: false });
    listNameRef.current.value = null
  }

  function toggleData(id){
    const newitem = [...items]
    const item = newitem.find(item=>item.id===id)
    
    item.complete = !item.complete
    console.log(item.complete)
    setItems(newitem)
  }

  function handleClear(){
    const newitem = [...items]
    
    const data = newitem.filter(item=> item.complete===false)

    setItems(data)
  }
  return (
    <>
      You have 0 items to do
      <input ref={listNameRef} type="text" />
      <button onClick={handleUpdateList}>Add Item</button>
      <button onClick={handleClear}>Remove completed</button>
      <TodoList todos={items} toggleData={toggleData} />
    </>
  );
}

export default App;

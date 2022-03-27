import React, { useState, useEffect } from "react";

export const GetTodo = ({ onClickComplete, onClickDelate }) => {
  const [inCompleteTodos, setInompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/todo/")
      .then((res) => res.json())
      .then(
        (result) => {
          const todoValue = result.map((item) => item.name);
          setInompleteTodos(todoValue);
          console.log(inCompleteTodos);
          setCompleteTodos(todoValue);
          console.log(completeTodos);
          setTodo(todoValue);
        },
        (error) => {
          setTodo("todoなし");
        }
      );
  }, []);
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {todo.map((item, index) => {
          return (
            <li key={index} className="list-row">
              <span key={index}>
                {item}
                {index}
              </span>
              {/* イベントを記述 */}
              <button onClick={() => onClickComplete(index)}>完了</button>
              <button onClick={() => onClickDelate(index)}>削除</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default GetTodo;

import React from "react";
import { useState, useEffect } from "react";

export const GetTodo = (props) => {
  const { onClickComplete, onClickDelate } = props;
  const [toDo, setTodo] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/todo/")
      .then((res) => res.json())
      .then(
        (result) => {
          const todoValue = result.map((e) => e.do);
          setTodo(todoValue);
        },
        (error) => {
          console.log(error);
          const errData = {
            todo: "名無し",
          };
          setTodo(errData.todo);
        }
      );
  }, []);
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {toDo.map((e, index) => {
          return (
            <div key={index} className="list-row">
              <li>{e}</li>
              {/* イベントを記述 */}
              <button onClick={() => onClickComplete(index)}>完了</button>
              <button onClick={() => onClickDelate(index)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default GetTodo;

import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../App";

export const GetTodo = (props) => {
  const { todos, onClickComplete, onClickDelate } = props;
  const context = useContext(Context);
  const [toDo, setTodo] = useState([]);
  let gg = [];
  useEffect(() => {
    fetch("http://localhost:3000/todo/")
      .then((res) => res.json())
      .then(
        (result) => {
          result.map((r) => {
            console.log(r);
            // const ff = [...toDo, r.do];
            // console.log(ff);
            setTodo([...toDo, r.do]);
          });
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
        {toDo.map((g, index) => {
          {
            console.log(g);
          }
          return (
            <div key={index} className="list-row">
              <li>{g}</li>
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

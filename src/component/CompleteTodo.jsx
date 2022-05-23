import React from "react";

export const CompleteTodo = ({ todos, onClickBack }) => {
  return (
    <div className="complete-area ">
      <p className="title">完了のTODO</p>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={index} className="list-row">
              <span>{todo.name}</span>
              <button onClick={() => onClickBack(todo, index)}>戻す</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

import React from "react";

export const CompleteTodo = (props) => {
  const { todos, onClickBack } = props;
  return (
    <div className="complete-area ">
      <p className="title">完了のTODO</p>
      <ul>
        {todos.map((todo, index) => {
          return (
            <div key={index} className="list-row">
              <li>{todo.name}</li>
              <button onClick={() => onClickBack(todo, index)}>戻す</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

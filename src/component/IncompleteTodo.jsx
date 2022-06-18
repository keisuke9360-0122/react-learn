import React from "react";

export const InCompleteTodo = ({ todos, onClickComplete, onClickDelate }) => {
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={index} className="list-row">
              <span>{todo.name}</span>
              {/* イベントを記述 */}
              <button onClick={() => onClickComplete(todo, index)}>完了</button>
              <button onClick={() => onClickDelate(todo, index)}>削除</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

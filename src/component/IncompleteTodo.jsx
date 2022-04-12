import React from "react";

export const InCompleteTodo = (props) => {
  const { todos, onClickComplete, onClickDelate } = props;

  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {todos.map((todo, index) => {
          console.log(todo);

          return (
            <div key={index} className="list-row">
              <li>{todo.name}</li>
              {/* イベントを記述 */}
              <button onClick={() => onClickComplete(todo, index)}>完了</button>
              <button onClick={() => onClickDelate(todo, index)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

import React from "react";

export const InCompleteTodo =(props)=>{
  const {todos,onClickComplete,onClickDelate}=props;
  return (
    <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {todos.map((todo,index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>

                {/* イベントを記述 */}

                <button onClick={()=>onClickComplete(index)}>完了</button>
                <button onClick={()=>onClickDelate(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
  )
}
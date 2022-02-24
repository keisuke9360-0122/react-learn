import React from "react";

//(水色のインプットエリアのコンポーネント化)
export const InputTodo = (props) => {
  //必要な情報をpropsを通して、分割して読み込む

  const { todoText, onChange, onClick } = props;
  return (
    <div className="input-area">
      <input placeholder="TODOを入力" value={todoText} onChange={onChange} />
      <button onClick={onClick}>追加</button>
    </div>
  );
};

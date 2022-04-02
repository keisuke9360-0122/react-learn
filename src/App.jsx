import React, { useEffect, useState } from "react";
import "./index.css";
import { InputTodo } from "./component/InputTodo";
import { InCompleteTodo } from "./component/IncompleteTodo";
import { CompleteTodo } from "./component/CompleteTodo";
import GetTodo from "./component/Todo";

export const App = () => {
  const [todoText, setTodoText] = useState("");

  const [inCompleteTodos, setInompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [errorTodos, seterrorTodos] = useState(false);
  ///処理を行う関数///////

  // インプットエリアから入力する処理
  const onChangeText = (event) => {
    setTodoText(event.target.value);
  };

  // インプットエリアから未完了エリアにテキストを追加する関数
  const onClickAdd = () => {
    if (todoText === "") {
      const judge = true;
      seterrorTodos(judge);
      return;
    }

    const newTodos = [...inCompleteTodos, todoText];

    setInompleteTodos(newTodos);

    fetch.post({ name: "hoge" });
    seterrorTodos(false);
    setTodoText("");
  };

  // 未完了のエリアから削除ボタンが押された行のタスクを消す処理
  const onClickDelate = (index) => {
    const newTodos = [...inCompleteTodos];
    console.log(newTodos);
    newTodos.splice(index, 1);
    setInompleteTodos(newTodos);

    fetch.delete(2);
  };

  // 未完了のタスクの完了ボタンが押され、未完了のタスクが消え完了エリアに追加する処理
  const onClickComplete = (index) => {
    const newInCompleteTodos = [...inCompleteTodos];
    newInCompleteTodos.splice(index, 1);
    setInompleteTodos(newInCompleteTodos);
    const addTodo = [...completeTodos, inCompleteTodos[index]];
    setCompleteTodos(addTodo);

    fetch.put(1, { name: "fuga" });
  };

  //  完了エリアのタスクの戻すボタンが押され、押されたタスクが未完了エリアに追加される処理
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const backTodos = [...inCompleteTodos, completeTodos[index]];
    setInompleteTodos(backTodos);
    setCompleteTodos(newCompleteTodos);
  };

  useEffect(() => {
    fetch().then((result) => {
      if (result.isComlete) {
        setCompleteTodos();
      } else {
        setIncompleta();
      }
    });
  }, []);

  return (
    /////何をレンダリングするか//////////
    <>
      {/* インプットコンポーネントに変数や関数を渡す */}

      <InputTodo
        todoText={todoText}
        onChange={onChangeText}
        onClick={onClickAdd}
        errorTodos={errorTodos}
      />
      {/* <TodoData
       onLoadTodo={myTodo}/> */}
      <InCompleteTodo
        todos={inCompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelate={onClickDelate}
        // onLoadTodo={onLoadTodo}
      />
      <GetTodo
        todos={inCompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelate={onClickDelate}
      />
      <CompleteTodo todos={completeTodos} onClickBack={onClickBack} />
      <div></div>
    </>
  );
};

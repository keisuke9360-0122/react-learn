import React, { useState, useEffect } from "react";
import "./index.css";
import { InputTodo } from "./component/InputTodo";
import { InCompleteTodo } from "./component/IncompleteTodo";
import { CompleteTodo } from "./component/CompleteTodo";
import { v4 as uuidv4 } from "uuid";
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
      seterrorTodos(true);
      return;
    }
    const privateId = uuidv4();
    const newText = {
      name: todoText,
      id: privateId,
    };
    const newTodos = [...inCompleteTodos, newText];
    setInompleteTodos(newTodos);
    fetch("http://localhost:3001/todo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newText,
        inComplete: false,
      }),
    }).then((response) => response.json());

    seterrorTodos(false);
    setTodoText("");
  };

  // 未完了のエリアから削除ボタンが押された行のタスクを消す処理
  const onClickDelate = (todo, index) => {
    const newTodos = [...inCompleteTodos];
    newTodos.splice(index, 1);
    setInompleteTodos(newTodos);
    fetch(`http://localhost:3001/todo/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  // 未完了のタスクの完了ボタンが押され、未完了のタスクが消え完了エリアに追加する処理
  const onClickComplete = (todo, index) => {
    const newInCompleteTodos = [...inCompleteTodos];
    newInCompleteTodos.splice(index, 1);
    setInompleteTodos(newInCompleteTodos);
    const addTodo = [...completeTodos, inCompleteTodos[index]];
    setCompleteTodos(addTodo);
    fetch(`http://localhost:3001/todo/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        inComplete: true,
      }),
    });
  };

  //  完了エリアのタスクの戻すボタンが押され、押されたタスクが未完了エリアに追加される処理
  const onClickBack = (todo, index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const backTodos = [...inCompleteTodos, completeTodos[index]];
    setInompleteTodos(backTodos);
    setCompleteTodos(newCompleteTodos);
    fetch(`http://localhost:3001/todo/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        inComplete: false,
      }),
    });
  };

  useEffect(() => {
    fetch("http://localhost:3001/todo/")
      .then((res) => res.json())
      .then((result) => {
        setCompleteTodos(result.filter((e) => e.inComplete === true));
        setInompleteTodos(result.filter((e) => e.inComplete === false));
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
      <InCompleteTodo
        todos={inCompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelate={onClickDelate}
      />
      <CompleteTodo todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};

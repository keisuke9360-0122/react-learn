import React, { useState, useEffect } from "react";
import "./index.css";
import { InputTodo } from "./component/InputTodo";
import { InCompleteTodo } from "./component/IncompleteTodo";
import { CompleteTodo } from "./component/CompleteTodo";
// import GetTodo from "./component/Todo";

export const App = () => {
  const [todoText, setTodoText] = useState("");

  const [inCompleteTodos, setInompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [errorTodos, seterrorTodos] = useState(false);
  ///処理を行う関数///////

  // インプットエリアから入力する処理
  const onChangeText = (event) => {
    console.log(event);
    setTodoText(event.target.value);
  };

  // インプットエリアから未完了エリアにテキストを追加する関数
  const onClickAdd = (w) => {
    if (todoText === "") {
      const judge = true;
      seterrorTodos(judge);
      return;
    }
    console.log(w);
    const po = {
      name: todoText,
      id: inCompleteTodos.length + 10,
    };
    const newTodos = [...inCompleteTodos, po];
    console.log(todoText);
    setInompleteTodos(newTodos);
    console.log(newTodos);
    fetch("http://localhost:3001/todo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: todoText,
        id: newTodos.length + 10,
        inComplete: false,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res.name);
      });
    // response.map((item) => console.log(item.name));
    // レスポンス結果

    seterrorTodos(false);
    setTodoText("");
  };

  // 未完了のエリアから削除ボタンが押された行のタスクを消す処理
  const onClickDelate = (todo, index) => {
    const newTodos = [...inCompleteTodos];
    console.log(newTodos);
    newTodos.splice(index, 1);
    setInompleteTodos(newTodos);
    fetch(`http://localhost:3001/todo/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  localStorage.setItem("newTodo", JSON.stringify(inCompleteTodos));
  // 未完了のタスクの完了ボタンが押され、未完了のタスクが消え完了エリアに追加する処理
  const onClickComplete = (todo, index) => {
    const newInCompleteTodos = [...inCompleteTodos];

    const newItem = localStorage.getItem("newTodo");
    console.log(JSON.parse(newItem));
    newInCompleteTodos.splice(index, 1);
    setInompleteTodos(newInCompleteTodos);
    const addTodo = [...completeTodos, inCompleteTodos[index]];
    setCompleteTodos(addTodo);
    console.log("index", index);
    console.log(todo);
    console.log("http://localhost:3001/todo/${index}");
    fetch(`http://localhost:3001/todo/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: todo.name,
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
        name: todo.name,
        inComplete: false,
      }),
    });
  };

  useEffect(() => {
    fetch("http://localhost:3001/todo/")
      .then((res) => res.json())
      .then(
        (result) => {
          setCompleteTodos(result.filter((e) => e.inComplete === true));
          setInompleteTodos(result.filter((e) => e.inComplete === false));
        }
        // (result) => {
        //   console.log();

        //   result.map((item) => {
        //     if (item.inComplete === true) {
        //       // setInompleteTodos(item);
        //       const addTodo = [...completeTodos,item];
        //       setCompleteTodos(addTodo);
        //       console.log(item);
        //     } else {
        //       const newTodos = [...inCompleteTodos, item];
        //       console.log(inCompleteTodos);
        //       setInompleteTodos(newTodos);
        //     }
        //   });
        //   // setInompleteTodos(result);
        // },
        // (error) => {
        //   seterrorTodos(true);
        // }
      );
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
      {/* <GetTodo
        todos={inCompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelate={onClickDelate}
      /> */}
      <CompleteTodo todos={completeTodos} onClickBack={onClickBack} />
      <div></div>
    </>
  );
};

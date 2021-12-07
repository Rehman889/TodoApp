import Head from "next/head";
import { useState } from "react";

const Index = () => {
  const [userinput, setUserInput] = useState("");
  const [todolist, setTodoList] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();

    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTodoList([userinput, ...todolist]);

    setUserInput("");
  };

  const handleDelete = (todo) => {
    const updatedArr = todolist.filter(
      (todoItem) => todolist.indexOf(todoItem) != todolist.indexOf(todo)
    );

    setTodoList(updatedArr);
  };

  return (
    <div className="text-center font-bold mt-4">
      <Head>
        <title>TODO APP</title>
        <meta name="description" content="TodoApp" />
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>
      <h1>Welcone to Todo MyApp</h1>
      <form>
        <input
          className=""
          type="text"
          placeholder="Add a Todo"
          value={userinput}
          onChange={handleChange}
        ></input>
        <button onClick={handleSubmit}>Submit</button>
      </form>

      <ul>
        {todolist.length >= 1
          ? todolist.map((todo, idx) => {
              return (
                <li key={idx}>
                  {todo}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(todo);
                    }}
                  >
                    Delete
                  </button>
                </li>
              );
            })
          : "Enter a Todo item"}
      </ul>
    </div>
  );
};

export default Index;

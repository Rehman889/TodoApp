import Head from "next/head";
import { useState } from "react";
import { todolist } from "../recoil/atom";
import { useRecoilState } from "recoil";
import Link from "next/link";

const Index = () => {
  const [userinput, setUserInput] = useState("");
  const [duedate, setDuedate] = useState("");
  const [todoli, setTodoLi] = useRecoilState(todolist);
  const [userselect, setUserSelect] = useState("user1");

  const handleChange = (e) => {
    e.preventDefault();

    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ value: userinput, due: duedate });
    setTodoLi([
      { value: userinput, due: duedate, select: userselect, completed: false },
      ...todoli,
    ]);

    setUserInput("");
  };

  const handleDelete = (todo) => {
    const updatedArr = todoli.filter(
      (todoItem) => todoli.indexOf(todoItem) != todoli.indexOf(todo)
    );

    setTodoLi(updatedArr);
  };

  const handleDuedate = (e) => {
    console.log(e.target.value);
    setDuedate(e.target.value);
  };

  const handleSelect = (e) => {
    setUserSelect(e.target.value);
  };

  const handleCompleted = (index) => {
    let temp = todoli;
    console.log(temp, index);

    console.log(temp[index].completed);
    setTodoLi(temp);
  };

  return (
    <div className="text-center font-bold mt-4">
      <Head>
        <title>TODO APP</title>
        <meta name="description" content="TodoApp" />
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>
      <h1>Welcone to Todo MyApp</h1>
      <form>
        <input
          className=""
          type="text"
          placeholder="Add a Todo"
          value={userinput}
          onChange={handleChange}
        />
        <input
          className=""
          type="date"
          placeholder="Due Date"
          value={duedate}
          onChange={handleDuedate}
        />

        <select className="" value={userselect} onChange={handleSelect}>
          <option value="user1">user1</option>
          <option value="user2">user2</option>
          <option value="user3">user3</option>
          <option value="user4">user4</option>
          <option value="user5">user5</option>
        </select>

        <button onClick={handleSubmit}>Submit</button>
      </form>

      <ul>
        {todoli.length >= 1
          ? todoli.map((todo, idx) => {
              return (
                <li key={idx}>
                  {todo.completed && <span>Completed </span>}
                  {todo.value} {todo.due} {todo.select}
                  <button onClick={() => handleCompleted(idx)}>
                    Mark as complete
                  </button>
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

      <div className="text-center font-bold  mt-8 ">
        <h1 className="">Your Completed Todo's Tasks</h1>
        <ul>
          {todoli.map((todo, idx) => {
            return (
              // console.log(todo.completed)
              todo.completed === true && (
                <li key={idx}>
                  {todo.completed && <span>Completed </span>}
                  {todo.value} {todo.due} {todo.select}
                </li>
              )
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Index;

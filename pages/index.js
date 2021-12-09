import Head from "next/head";
import { useEffect, useState } from "react";
import { todolist } from "../recoil/atom";
import { useRecoilState } from "recoil";
import Link from "next/link";
import ApiCalendar from "react-google-calendar-api";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Appbar from "../component/Appbar";
import Tabs from "../component/Tabs";
import Card from "../component/Card";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteIcon from "@mui/icons-material/Delete";

const Index = () => {
  const [userinput, setUserInput] = useState("");
  const [duedate, setDuedate] = useState("");
  const [todoli, setTodoLi] = useState([]);
  const [userselect, setUserSelect] = useState("USER1");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("todolist")) !== null)
      setTodoLi(JSON.parse(localStorage.getItem("todolist")));
  }, []);
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

    localStorage.setItem(
      "todolist",
      JSON.stringify([
        {
          value: userinput,
          due: duedate,
          select: userselect,
          completed: false,
        },
        ...todoli,
      ])
    );
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

    temp[index].completed = true;
    console.log(temp[index].completed);

    localStorage.setItem("todolist", JSON.stringify(temp));
    setTodoLi(JSON.parse(localStorage.getItem("todolist")));
  };

  return (
    <div className="card flex-1 p-12 mt-12 mx-20 gap-2 justify-center bg-[#F3F6F9]">
      <Head>
        <title>TODO APP</title>
        <meta name="description" content="TodoApp" />
        <link rel="icon" href="/favicon-16x16.png" />
        <Appbar />
      </Head>

      <div className="flex flex-col px-20 justify-center items-center  mx-auto ">
        <h1 className="font-bold text-xl mt-2">PLANS FOR TODAY</h1>

        <form>
          <div className="flex-1 flex items-center gap-4 justify-center mt-8 font-bold">
            <div className="flex-1 flex items-center gap-4  ">
              <label className="label">Tasks</label>
              <input
                className="flex w-[13rem] h-10 px-4 rounded-md "
                type="text"
                placeholder="Add a Todo"
                value={userinput}
                onChange={handleChange}
              />
              <button className="bg-red-600 h-9 rounded-md w-[6rem] text-white ">
                Add Todo
              </button>
            </div>
            <div className="flex-1 flex items-center gap-4 w-full">
              <label className="label">Select Date</label>
              <input
                className="w-[13rem] h-10 border-red-800 rounded-md px-4"
                type="date"
                placeholder="Due Date"
                name=""
                value={duedate}
                onChange={handleDuedate}
              />
              <div className="flex-1 flex items-center gap-4 w-full">
                <label className="label">Select Users</label>
                <select
                  className="w-[13rem] h-10 border-red-800 rounded-md px-4"
                  value={userselect}
                  onChange={handleSelect}
                >
                  <option value="USER1">USER1</option>
                  <option value="USER2">USER2</option>
                  <option value="USER3">USER3</option>
                  <option value="USER4">USER4</option>
                  <option value="USER5">USER5</option>
                  <option value="USER6">USER6</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div>
          <button
            className="flex flex-1 bg-blue-600 w-[8rem] h-9 text-white mt-6 justify-center items-center rounded-full"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <div className="flex-1 items-center mt-12 border-gray-900 gap-8 justify-between		">
          <ul className="flex flex-1 font-bold justify-between	" >
            {todoli.length >= 1
              ? todoli.map((todo, idx) => {
                  return (
                    <li key={idx}>
                      {todo.completed && <span>Completed </span>}
                      {todo.value} {todo.due} {todo.select}
                      <button onClick={() => handleCompleted(idx)}>
                        <DoneOutlineIcon />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(todo);
                        }}
                      >
                        <DeleteIcon  />
                      </button>
                    </li>
                  );
                })
              : "Enter a Todo item"}
          </ul>
        </div>
      </div>
      <div className="card text-center flex flex-1 font-bold mx-auto mt-12  w-full">
        <h1 className="mt-2 text-red-600">YOUR COMPLETED TODO&apos;S TASKS</h1>
        <ul className="flex flex-1  gap-8 mt-6 px-6 text-sm mb-11">
          {todoli.map((todo, idx) => {
            return (
              // console.log(todo.completed)
              todo.completed === true && (
                <li key={idx}>
                  {todo.completed && <span className="text-blue font-bold">|Completed| </span>}
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

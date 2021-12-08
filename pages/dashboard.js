import React, { useEffect } from "react";
import { useState } from "react";
import PieChart from "../component/PieChart";
import { todolist } from "../recoil/atom";
import { useRecoilState } from "recoil";

function dashboard() {
  const [todoli, setTodoli] = useRecoilState(todolist);
  let [data, setData] = useState([
    { name: "Completed", value: 2 },
    { name: "Pending", value: 2 },
  ]);

  useEffect(() => {
    console.log(todoli);
    let compTodos = 0;
    todoli.map((todo) => {
      todo.completed === true && compTodos++;
    });
    setData([
      { name: "Completed", value: compTodos },
      { name: "Pending", value: todoli.length - compTodos },
    ]);
  }, [todoli]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="text-center font-bold mt-8">
      <h1>TODO's Of all Completed Users</h1>
      <PieChart data={data} />
    </div>
  );
}

export default dashboard;

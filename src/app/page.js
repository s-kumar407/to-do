"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task === "") {
      alert("Please write a task first!");
    } else {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, name: task, checked: false },
      ]);
      setTask("");
    }
  }

  function toggleTaskCheckbox(taskId) {
    setTasks(
      tasks.map((t) => {
        if (t.id === taskId) {
          return { ...t, checked: !t.checked };
        }
        return t;
      })
    );
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950">
      <header className="bg-gray-900 text-gray-50 py-4 px-6">
        <h1 className="text-2xl font-bold">Todo List</h1>
      </header>
      <main className="flex-1 p-6">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              className="flex-1 bg-white dark:bg-gray-800 dark:text-gray-50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Add a new todo..."
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button
              className="bg-gray-900 text-gray-50 rounded-md px-4 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={addTask}
            >
              Add
            </Button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between px-4 py-3 group"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`todo-${task.id}`}
                    checked={task.checked}
                    onClick={() => toggleTaskCheckbox(task.id)}
                  />
                  <label
                    className={`text-gray-900 ${
                      task.checked
                        ? "line-through dark:text-gray-50"
                        : "dark:text-gray-50"
                    }`}
                    htmlFor={`todo-${task.id}`}
                  >
                    {task.name}
                  </label>
                </div>
                <Button
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 invisible group-hover:visible"
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteTask(task.id)}
                >
                  ✖
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}



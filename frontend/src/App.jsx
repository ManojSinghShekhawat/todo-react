import { useState, useEffect } from "react";

import "./style/todo.css";

import Register from "./component/Register";
import Login from "./component/Login";
import { TodoForm } from "./component/TodoForm";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Nav from "./component/Nav";
import TodoList from "./TodoList";
import { addTodo, deleteTodo, editTodo, logOut } from "./util/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isAuthanticate, setIsAuthanticate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.trim()) {
      return;
    }
    try {
      const newTodo = await addTodo(todo);
      setTodos((prev) => [...prev, newTodo]);
      setTodo("");
    } catch (error) {
      console.log(`Failed to add todo : ${error}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(`Failed to delete todo : ${error}`);
    }
  };

  const handleEdit = async (id, updatedTask, isCompleted = false) => {
    try {
      const updatedTodo = await editTodo(id, updatedTask, isCompleted);

      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  //fetch Auth Status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/user/authcheck",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          setIsAuthanticate(true);
        } else {
          console.log("Error while auth");
        }
      } catch (error) {
        console.error("Error in auth");
      }
    };
    checkAuthStatus();
  }, []);

  //fetch all todos

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/todos", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        setTodos(data.allTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, [isAuthanticate]);

  return (
    <Router>
      <Nav isAuthanticate={isAuthanticate} handleLogout={handleLogout} />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={() => setIsAuthanticate(true)} />}
        />
        <Route
          path="/"
          element={
            isAuthanticate ? (
              <>
                <h2>Tasks</h2>
                <TodoForm
                  todo={todo}
                  setTodo={setTodo}
                  handleSubmit={handleSubmit}
                />
                <TodoList
                  handleDelete={handleDelete}
                  todos={todos}
                  handleEdit={handleEdit}
                />
              </>
            ) : (
              <h2>
                Please{" "}
                <Link to="/login" style={{ fontSize: "2rem" }}>
                  Login
                </Link>{" "}
                First
              </h2>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

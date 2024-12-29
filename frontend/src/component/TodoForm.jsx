import React from "react";
import { IoMdAdd } from "react-icons/io";

export const TodoForm = ({ todo, setTodo, handleSubmit }) => {
  return (
    <div key={"qww"} className="heading">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" aria-label="Add Task">
          <IoMdAdd />
        </button>
      </form>
    </div>
  );
};

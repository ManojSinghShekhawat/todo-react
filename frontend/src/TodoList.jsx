import React, { Fragment } from "react";
import { Todo } from "./Todo";

const TodoList = ({ todos, handleEdit, handleDelete }) => {
  return (
    <Fragment>
      {todos.map((todo) => {
        return (
          <Todo
            key={todo._id}
            todo={todo}
            handleEdit={handleEdit}
            handleDelete={() => {
              handleDelete(todo._id);
            }}
          />
        );
      })}
    </Fragment>
  );
};

export default TodoList;

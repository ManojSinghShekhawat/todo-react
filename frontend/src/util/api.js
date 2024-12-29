export const addTodo = async (task) => {
  const response = await fetch("http://localhost:4000/api/v1/newtodo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
  const data = await response.json();
  // console.log("data after saving the todo", data);
  return data.savedTask;
};

//delete a todo
export const deleteTodo = async (id) => {
  const response = await fetch(`http://localhost:4000/api/v1/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
  return await response.json;
};

//edit a todo

export const editTodo = async (id, updatedTask, isCompleted = false) => {
  const response = await fetch(`http://localhost:4000/api/v1/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: updatedTask, completed: isCompleted }),
  });
  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
  const data = await response.json();
  // console.log("data returned from API", data.updateTodo);
  return data.updateTodo;
};

export const logOut = async () => {
  const response = await fetch("http://localhost:4000/api/v1/user/logout", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
};

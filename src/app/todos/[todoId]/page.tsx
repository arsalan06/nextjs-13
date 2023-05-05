import React from "react";
import { Todo } from "../../../../typings";
type PageProps = {
  params: {
    todoId: string;
  };
};
const fetchTodos = async (todoId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`
  );
  const todos: Todo[] = await res.json();
  return todos;
};
async function TodoPage({ params: { todoId } }: PageProps) {
  const todos = await fetchTodos(todoId);
  return (
    <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{todos.id}:{todos.title}
      </p>
    </div>
  );
}

export default TodoPage;

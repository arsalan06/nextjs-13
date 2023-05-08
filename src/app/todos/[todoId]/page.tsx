import React from "react";
import { Todo } from "../../../../typings";
import {notFound} from "next/navigation"
export const dynamicParams=true;
// dynamicParams is used for generation a page that is not generated at build time but it has a problem it will rander UI for that page which has not data available. for this problemwe will use notFound function
type PageProps = {
  params: {
    todoId: string;
  };
};
const fetchTodos = async (todoId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    // {cache:"force-cache"}  static side generation
    {next:{revalidate: 60}} //increatmental static generation
    // {cache:"no-cache"}  server side generation
  );
  const todos: Todo[] = await res.json();
  console.log(todos)
  return todos;
};
async function TodoPage({ params: { todoId } }: PageProps) {
  const todos = await fetchTodos(todoId);
  {/* @ts-ignore */}
  if(!todos.id) return notFound()
  return (
    <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        {/* @ts-ignore */}
        #{todos?.id}:{todos?.title}
      </p>
    </div>
  );
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/')
  const todos:Todo[]=await res.json();
 // for this DEMO we are only prebuilding the first 10 pages to avoid being rate limited by the DEMO API
 const trimmedTodos=todos.slice(0.10);
  return trimmedTodos.map((todo) => ({
    todoId: todo.id.toString(),
  }));
}

export default TodoPage;

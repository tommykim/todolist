"use client"

import { useState } from "react"
import { TodoInput } from "@/components/todo-input"
import { TodoList } from "@/components/todo-list"
import type { Priority, Todo } from "@/components/todo-types"

const initialTodos: Todo[] = [
  { id: "seed-1", title: "경영학원론 3장 읽기", done: false, priority: "high" },
  { id: "seed-2", title: "팀플 회의 자료 정리", done: true, priority: "medium" },
]

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  function addTodo(title: string, priority: Priority) {
    setTodos((prev) => [
      { id: crypto.randomUUID(), title, done: false, priority },
      ...prev,
    ])
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
  }

  function changePriority(id: string) {
    const nextPriority: Record<Priority, Priority> = {
      high: "medium",
      medium: "low",
      low: "high",
    }
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, priority: nextPriority[t.priority ?? "medium"] }
          : t,
      ),
    )
  }

  function removeTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="flex flex-col gap-5">
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onRemove={removeTodo}
        onChangePriority={changePriority}
      />
    </div>
  )
}


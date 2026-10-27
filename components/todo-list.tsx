"use client"

import { Check, Trash2, ListTodo } from "lucide-react"
import type { Priority, Todo } from "@/components/todo-types"

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onChangePriority?: (id: string) => void
}

const priorityMap: Record<
  Priority,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  high: {
    label: "상",
    bg: "bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-500/20",
    dot: "bg-red-500",
  },
  medium: {
    label: "중",
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/20",
    dot: "bg-amber-500",
  },
  low: {
    label: "하",
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20",
    dot: "bg-blue-500",
  },
}

export function TodoList({ todos, onToggle, onRemove, onChangePriority }: TodoListProps) {
  const remaining = todos.filter((t) => !t.done).length

  return (
    <section
      aria-label="할 일 목록"
      className="rounded-2xl border border-border bg-card p-2 shadow-sm"
    >
      <header className="flex items-center justify-between px-3 py-2.5">
        <h2 className="text-sm font-medium text-card-foreground">오늘의 목록</h2>
        <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
          남은 일 {remaining}개
        </span>
      </header>

      {todos.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
          <ListTodo className="size-8 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm text-muted-foreground text-balance">
            아직 할 일이 없어요. 위에서 첫 일정을 추가해 보세요.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-1.5 p-1">
          {todos.map((todo) => {
            const config = priorityMap[todo.priority ?? "medium"]

            return (
              <li key={todo.id}>
                <div className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-accent/60">
                  <button
                    type="button"
                    onClick={() => onToggle(todo.id)}
                    aria-pressed={todo.done}
                    aria-label={todo.done ? "완료 취소" : "완료로 표시"}
                    className={`flex size-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      todo.done
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-transparent hover:border-primary"
                    }`}
                  >
                    <Check className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onChangePriority?.(todo.id)}
                    title="클릭하여 우선순위 변경"
                    className={`inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold transition-all ${
                      config.bg
                    } ${config.text} ${config.border} ${
                      todo.done ? "opacity-40" : "hover:scale-105 active:scale-95"
                    }`}
                  >
                    <span className={`size-1.5 rounded-full ${config.dot}`} />
                    {config.label}
                  </button>

                  <span
                    className={`flex-1 text-sm transition-colors ${
                      todo.done
                        ? "text-muted-foreground line-through"
                        : "text-card-foreground"
                    }`}
                  >
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    onClick={() => onRemove(todo.id)}
                    aria-label="할 일 삭제"
                    className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}


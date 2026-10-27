export type Priority = "high" | "medium" | "low"

export type Todo = {
  id: string
  title: string
  done: boolean
  priority: Priority
}


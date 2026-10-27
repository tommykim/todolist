"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Priority } from "@/components/todo-types"

type TodoInputProps = {
  onAdd: (title: string, priority: Priority) => void
}

const priorities: {
  key: Priority
  label: string
  activeClass: string
  dotClass: string
}[] = [
  {
    key: "high",
    label: "상",
    activeClass: "bg-red-500 text-white font-semibold shadow-xs",
    dotClass: "bg-red-500",
  },
  {
    key: "medium",
    label: "중",
    activeClass: "bg-amber-500 text-white font-semibold shadow-xs",
    dotClass: "bg-amber-500",
  },
  {
    key: "low",
    label: "하",
    activeClass: "bg-blue-500 text-white font-semibold shadow-xs",
    dotClass: "bg-blue-500",
  },
]

export function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState("")
  const [priority, setPriority] = useState<Priority>("medium")

  function submit() {
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed, priority)
    setValue("")
    setPriority("medium")
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
      className="flex flex-col gap-2.5"
    >
      <div className="flex items-center gap-2">
        <label htmlFor="todo-input" className="sr-only">
          할 일 입력
        </label>
        <input
          id="todo-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.nativeEvent.isComposing || e.keyCode === 229)) {
              e.preventDefault()
            }
          }}
          placeholder="예: 자료구조 과제 제출하기"
          className="h-12 flex-1 rounded-xl border border-border bg-card px-4 text-base text-card-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
        />
        <Button
          type="submit"
          size="lg"
          className="h-12 shrink-0 rounded-xl px-4"
          disabled={!value.trim()}
        >
          <Plus className="size-5" />
          추가
        </Button>
      </div>

      <div className="flex items-center gap-2 px-1">
        <span className="text-xs font-medium text-muted-foreground">우선순위</span>
        <div className="inline-flex rounded-lg border border-border bg-muted/30 p-1 gap-1">
          {priorities.map((item) => {
            const isSelected = priority === item.key
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setPriority(item.key)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  isSelected
                    ? item.activeClass
                    : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    isSelected ? "bg-white" : item.dotClass
                  }`}
                />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
    </form>
  )
}


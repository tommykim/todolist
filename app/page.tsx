"use client"

import { useEffect, useState } from "react"
import { TodoApp } from "@/components/todo-app"

export default function Page() {
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("ko-KR", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      )
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const today = new Date().toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  })

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-xl flex-col px-5 py-12 sm:py-20">
      <header className="mb-8">
        <p className="text-sm font-medium text-primary tabular-nums">
          {today}
          {currentTime ? ` ${currentTime}` : ""}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground text-balance">
          To Do List
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          수업, 과제, 약속까지. 떠오르는 일정을 바로 적어두고 하나씩 지워 나가세요.
        </p>
      </header>

      <TodoApp />
    </main>
  )
}


"use client"

import React, { createContext, useContext, useRef, useState } from "react"
import { Chat } from "@ai-sdk/react"
import { generateId, TextStreamChatTransport } from "ai"

function createChatInstance(activeFileRef: React.RefObject<string | null>) {
  return new Chat({
    id: generateId(),
    // @ts-ignore
    transport: new TextStreamChatTransport({
      api: "/api/chat",
      body: () => ({ activeFile: activeFileRef.current }),
    }),
  })
}

interface ChatContextType {
  chat: Chat<any>
  resetChat: () => void
  input: string
  setInput: (v: string) => void
  activeFileRef: React.RefObject<string | null>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const activeFileRef = useRef<string | null>(null)
  const [chat, setChat] = useState(() => createChatInstance(activeFileRef))
  const [input, setInput] = useState("")

  const resetChat = () => {
    setChat(createChatInstance(activeFileRef))
    setInput("")
  }

  return (
    <ChatContext.Provider value={{ chat, resetChat, input, setInput, activeFileRef }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) throw new Error("useChatContext must be used within <ChatProvider>")
  return context
}

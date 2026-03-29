"use client"

import React, {useEffect, useRef, useState} from "react"
import {BotIcon, PlusIcon, SendIcon, Terminal, UserIcon} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea";
import {chatLoadingPhrases} from "@/content/chat-loading-phrases";

type Message = {
  id: string
  text: string
  sender: 'user' | 'bot'
}

const initialMessages: Message[] = [
  { id: '1', text: 'Hello! How can I help you today?\n\n> I have context about the whole portfolio and the currently opened file.', sender: 'bot' }
]

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user'
    }

    setMessages(prev => [...prev, newUserMsg])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: 'This is a dummy response.',
        sender: 'bot'
      }
      setMessages(prev => [...prev, newBotMsg])
      setIsTyping(false)
    }, 5000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleNewChat = () => {
    setMessages(initialMessages)
  }

  return (
    <aside className="h-full flex flex-col w-full z-40 bg-popover">
      <div className="px-2 py-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex justify-between items-center shrink-0">
        <span>Chat</span>
        <PlusIcon className="w-3.5 h-3.5 cursor-pointer" onClick={handleNewChat}/>
      </div>

      <div className="flex-1 overflow-y-auto p-2" ref={scrollRef}>
        {messages.map(msg => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <MessageLoadingAnimation />}
      </div>

      <div className="p-2 border-t border-border shrink-0">
        <div className="flex gap-2 items-end">
          <Textarea
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-8 max-h-32 resize-none text-xs py-2"
            rows={Math.min(3, Math.max(1, inputValue.split('\n').length))}
          />
          <Button size="icon" className="h-8 w-8 shrink-0" onClick={handleSend}>
            <SendIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.sender === 'user'
  return (
    <div className={`flex w-full mb-4 gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
          <BotIcon className="w-4 h-4 text-primary" />
        </div>
      )}
      <div
        className={`px-3 py-2 rounded-lg text-sm max-w-[80%] break-words whitespace-pre-wrap ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-muted text-foreground rounded-bl-none'
        }`}
      >
        {message.text}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
          <UserIcon className="w-4 h-4 text-primary" />
        </div>
      )}
    </div>
  )
}

function MessageLoadingAnimation() {
  const [phraseIndex, setPhraseIndex] = useState(getRandomEntryIndex(chatLoadingPhrases))

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const scheduleNext = () => {
      const nextDuration = Math.floor(Math.random() * 1500) + 500 // 500ms to 2000ms
      timeoutId = setTimeout(() => {
        setPhraseIndex((prev) => {
          let newIndex
          do {
            newIndex = getRandomEntryIndex(chatLoadingPhrases)
          } while (newIndex === prev)
          return newIndex
        })
        scheduleNext()
      }, nextDuration)
    }

    scheduleNext()

    return () => clearTimeout(timeoutId)
  }, [])

  function getRandomEntryIndex(list: string[]) {
    return Math.floor(Math.random() * list.length)
  }

  return <div className="flex w-full mb-4 gap-2 justify-start">
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
      <BotIcon className="w-4 h-4 text-primary" />
    </div>
    <div
      className={`text-sm max-w-[80%] break-words whitespace-pre-wrap text-foreground flex flex-row items-center gap-2 overflow-hidden`}
    >
      <Terminal className="w-4 h-4 shrink-0 text-muted-foreground" />
      <div className="flex-1 flex items-center overflow-hidden font-mono">
        <span className="text-muted-foreground truncate">
          {chatLoadingPhrases[phraseIndex]}
        </span>
        <span className="ml-2 w-2 h-4 bg-primary animate-pulse shrink-0"></span>
      </div>
    </div>
  </div>
}
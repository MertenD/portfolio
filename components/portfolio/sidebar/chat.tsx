"use client"

import React, {useEffect, useRef, useState} from "react"
import ReactMarkdown from "react-markdown"
import {
  BotIcon,
  ExternalLinkIcon,
  FileIcon,
  GithubIcon,
  LinkedinIcon,
  PlusIcon,
  SendIcon,
  Terminal,
  UserIcon
} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {chatLoadingPhrases} from "@/content/chat-loading-phrases"
import {useIsMobile} from "@/hooks/use-mobile"
import {useChat} from "@ai-sdk/react"
import {useFileSystem} from "@/context/file-system-context"
import {useChatContext} from "@/context/chat-context"
import type {UIMessage} from "ai"

const CONSENT_KEY = "portfolio-chat-consent"
const POLICY_VERSION = "2026-05"

const WELCOME_TEXT = "Hi! I'm Merten's portfolio assistant — an AI system.\n\nAsk me anything about him. For example about his **projects**, **tech stack**, **CV**, or **thesis** work. I also know which file you currently have open."

export default function ChatPanel() {
  const isMobile = useIsMobile()
  const { getActiveFile, openFileById } = useFileSystem()
  const { chat, sessionId, resetChat, input, setInput, activeFileRef } = useChatContext()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [hasConsented, setHasConsented] = useState(false)

  useEffect(() => {
    setHasConsented(sessionStorage.getItem(CONSENT_KEY) === "true")
  }, [])

  activeFileRef.current = getActiveFile()?.name ?? null

  const { messages, sendMessage, status } = useChat({ chat })
  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages.length, isLoading])

  const handleConsent = () => {
    sessionStorage.setItem(CONSENT_KEY, "true")
    setHasConsented(true)
    fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, policyVersion: POLICY_VERSION }),
    }).catch(() => {})
  }

  const handleWithdrawConsent = () => {
    sessionStorage.removeItem(CONSENT_KEY)
    setHasConsented(false)
    resetChat()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isMobile) {
      e.preventDefault()
      if (!isLoading) handleSubmit(e as unknown as React.FormEvent)
    }
  }

  const handleNewChat = () => {
    resetChat()
  }

  return (
    <aside className="h-full flex flex-col w-full z-40 bg-popover">
      <div className="px-2 py-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex justify-between items-center shrink-0">
        <span>Chat</span>
        {hasConsented && <PlusIcon className="w-3.5 h-3.5 cursor-pointer" onClick={handleNewChat} />}
      </div>

      {!hasConsented ? (
        <ConsentGate onConsent={handleConsent} onOpenPrivacyPolicy={() => openFileById("privacy")} />
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-2" ref={scrollRef}>
            <AssistantBubble text={WELCOME_TEXT} onOpenFile={openFileById} />
            {messages
              .filter((msg, i) => !(isLoading && i === messages.length - 1 && msg.role === "assistant"))
              .map((msg) => (
                <ChatBubble key={msg.id} message={msg} onOpenFile={openFileById} />
              ))}
            {isLoading && <MessageLoadingAnimation />}
          </div>

          <form onSubmit={handleSubmit} className="p-2 border-t border-border shrink-0">
            <div className="flex gap-2 items-end">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="min-h-8 max-h-32 resize-none text-xs py-2"
                rows={Math.min(3, Math.max(1, input.split("\n").length))}
              />
              <Button type="submit" size="icon" className="h-8 w-8 shrink-0" disabled={isLoading || !input.trim()}>
                <SendIcon className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Messages forwarded to external AI providers.{" "}
              <button
                type="button"
                onClick={handleWithdrawConsent}
                className="underline hover:text-foreground transition-colors"
              >
                Withdraw consent
              </button>
            </p>
          </form>
        </>
      )}
    </aside>
  )
}

function ConsentGate({
  onConsent,
  onOpenPrivacyPolicy,
}: {
  onConsent: () => void
  onOpenPrivacyPolicy: () => void
}) {
  return (
    <div className="flex-1 flex flex-col justify-center p-4 gap-4">
      <div className="space-y-3 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground text-sm">Before using the chat</p>
        <p>
          This chat is powered by external AI services. Your messages will be sent to:
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li><strong>OpenRouter Inc.</strong> (USA) — API routing (SCC)</li>
          <li><strong>Google LLC</strong> (USA) — AI model (DPF adequacy)</li>
        </ul>
        <p className="text-xs">
          You are interacting with an AI system. Do not share personal data.
          See our{" "}
          <button
            type="button"
            onClick={onOpenPrivacyPolicy}
            className="text-primary underline hover:no-underline"
          >
            Privacy Policy
          </button>
          {" "}for details.
        </p>
      </div>
      <Button onClick={onConsent} className="w-full text-sm">
        I understand — Start chatting
      </Button>
    </div>
  )
}

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("")
}

function MessageContent({ text, onOpenFile }: { text: string; onOpenFile: (id: string) => void }) {
  return (
    <ReactMarkdown
      urlTransform={(url) => url}
      components={{
        a({ href, children }) {
          if (href?.startsWith("file://")) {
            return (
              <button
                onClick={() => onOpenFile(href!.slice("file://".length))}
                className="inline-flex items-center gap-1 mx-0.5 px-2 py-0.5 rounded bg-primary/15 text-primary text-xs font-medium hover:bg-primary/25 transition-colors"
              >
                <FileIcon className="w-3 h-3 shrink-0" />
                {children}
              </button>
            )
          }
          const isGithub = href?.includes("github.com")
          const isLinkedin = href?.includes("linkedin.com")
          const LinkIcon = isGithub ? GithubIcon : isLinkedin ? LinkedinIcon : ExternalLinkIcon
          return (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 mx-0.5 px-2 py-0.5 rounded bg-primary/15 border-b border-b-primary text-foreground text-xs font-medium hover:border-b-primary/25 transition-colors"
            >
              <LinkIcon className="w-3 h-3 shrink-0" />
              {children}
            </a>
          )
        },
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>
        },
        ul({ children }) {
          return <ul className="list-disc list-inside mb-2 space-y-0.5">{children}</ul>
        },
        ol({ children }) {
          return <ol className="list-decimal list-inside mb-2 space-y-0.5">{children}</ol>
        },
        li({ children }) {
          return <li className="text-sm">{children}</li>
        },
        strong({ children }) {
          return <strong className="font-semibold">{children}</strong>
        },
        code({ children }) {
          return <code className="px-1 py-0.5 rounded bg-black/20 font-mono text-xs">{children}</code>
        },
      }}
    >
      {text}
    </ReactMarkdown>
  )
}

function AssistantBubble({ text, onOpenFile }: { text: string; onOpenFile: (id: string) => void }) {
  return (
    <div className="flex w-full mb-4 gap-2 justify-start">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
        <BotIcon className="w-4 h-4 text-primary" />
      </div>
      <div className="px-3 py-2 rounded-lg text-sm max-w-[80%] break-words bg-muted text-foreground rounded-bl-none">
        <MessageContent text={text} onOpenFile={onOpenFile} />
      </div>
    </div>
  )
}

function ChatBubble({ message, onOpenFile }: { message: UIMessage; onOpenFile: (id: string) => void }) {
  const isUser = message.role === "user"
  const text = getMessageText(message)

  if (!isUser) return <AssistantBubble text={text} onOpenFile={onOpenFile} />

  return (
    <div className="flex w-full mb-4 gap-2 justify-end">
      <div className="px-3 py-2 rounded-lg text-sm max-w-[80%] break-words bg-primary text-primary-foreground rounded-br-none">
        <span className="whitespace-pre-wrap">{text}</span>
      </div>
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
        <UserIcon className="w-4 h-4 text-primary" />
      </div>
    </div>
  )
}

function MessageLoadingAnimation() {
  const [phraseIndex, setPhraseIndex] = useState(() =>
    Math.floor(Math.random() * chatLoadingPhrases.length)
  )

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        setPhraseIndex((prev) => {
          let next
          do { next = Math.floor(Math.random() * chatLoadingPhrases.length) } while (next === prev)
          return next
        })
        scheduleNext()
      }, Math.floor(Math.random() * 1500) + 500)
    }
    scheduleNext()
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="flex w-full mb-4 gap-2 justify-start">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
        <BotIcon className="w-4 h-4 text-primary" />
      </div>
      <div className="text-sm max-w-[80%] break-words text-foreground flex flex-row items-center gap-2 overflow-hidden">
        <Terminal className="w-4 h-4 shrink-0 text-muted-foreground" />
        <div className="flex-1 flex items-center overflow-hidden font-mono">
          <span className="text-muted-foreground truncate">{chatLoadingPhrases[phraseIndex]}</span>
          <span className="ml-2 w-2 h-4 bg-primary animate-pulse shrink-0" />
        </div>
      </div>
    </div>
  )
}

'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  return (
    <div className="flex h-[calc(100vh-4rem)] pt-16 bg-gray-50 dark:bg-zinc-900">
      {/* Chat sidebar */}
      <aside className="flex flex-col w-96 h-full bg-white dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 shadow-md">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(message => (
            <div key={message.id} className="whitespace-pre-wrap text-sm">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {message.role === 'user' ? 'User: ' : 'AI: '}
              </span>
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return <span key={`${message.id}-${i}`}>{part.text}</span>;
                  default:
                    return null;
                }
              })}
            </div>
          ))}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            sendMessage({ text: input });
            setInput('');
          }}
          className="p-4 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
        >
          <input
            className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:text-white"
            value={input}
            placeholder="Say something..."
            onChange={e => setInput(e.currentTarget.value)}
          />
        </form>
      </aside>
      {/* Canvas area */}
      <main className="flex-1 h-full bg-gray-100 dark:bg-zinc-900"></main>
    </div>
  );
}
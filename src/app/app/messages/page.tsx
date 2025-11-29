"use client";

import { MOCK_THREADS, MOCK_MESSAGES, MOCK_TALENT, MOCK_EVENTS } from "@/lib/data";
import { useUser } from "@/context/user-context";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function MessagesPage() {
    const { user } = useUser();
    const [activeThreadId, setActiveThreadId] = useState(MOCK_THREADS[0]?.id);
    const [newMessage, setNewMessage] = useState("");

    if (!user) return null;

    const threads = MOCK_THREADS.filter(t => t.clientId === user.id || t.talentId === user.id);
    const activeThread = threads.find(t => t.id === activeThreadId);
    const messages = MOCK_MESSAGES.filter(m => m.threadId === activeThreadId);

    const getOtherParticipant = (thread: any) => {
        if (user.role === 'CLIENT') {
            return MOCK_TALENT.find(t => t.id === thread.talentId);
        } else {
            // Mock client lookup or just return a placeholder
            return { name: "Client", avatarUrl: "" };
        }
    };

    const getEvent = (thread: any) => {
        return MOCK_EVENTS.find(e => e.id === thread.eventId);
    }

    return (
        <div className="flex h-full bg-emerald-deep/20 border-t border-white/10 pt-24">
            {/* Thread List */}
            <div className="w-80 border-r border-white/10 flex flex-col bg-emerald-deep/40 backdrop-blur-md">
                <div className="p-4 border-b border-white/10">
                    <h2 className="font-display text-lg text-bone">Messages</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {threads.map(thread => {
                        const other = getOtherParticipant(thread);
                        const event = getEvent(thread);
                        return (
                            <div
                                key={thread.id}
                                onClick={() => setActiveThreadId(thread.id)}
                                className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${activeThreadId === thread.id ? 'bg-white/10 border-l-2 border-l-gold' : ''}`}
                            >
                                <div className="flex justify-between mb-1">
                                    <span className={`font-medium text-sm ${activeThreadId === thread.id ? 'text-gold' : 'text-bone'}`}>{other?.name}</span>
                                    <span className="text-xs text-bone/40">10:30 AM</span>
                                </div>
                                <p className="text-xs text-bone/60 mb-1">{event?.title}</p>
                                <p className="text-xs text-bone/40 truncate">Last message content...</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-emerald-deep/20">
                {activeThread ? (
                    <>
                        <div className="p-4 border-b border-white/10 bg-emerald-deep/40 backdrop-blur-md flex justify-between items-center">
                            <div>
                                <h3 className="font-medium text-bone">{getOtherParticipant(activeThread)?.name}</h3>
                                <p className="text-xs text-bone/60">{getEvent(activeThread)?.title}</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map(msg => {
                                const isMe = msg.senderId === user.id;
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] p-3 rounded-lg text-sm ${isMe ? 'bg-gold text-emerald-deep rounded-tr-none font-medium' : 'bg-white/10 border border-white/10 text-bone rounded-tl-none'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="p-4 bg-emerald-deep/40 border-t border-white/10 backdrop-blur-md">
                            <div className="flex gap-2">
                                <Input
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="bg-black/20 border-white/10 text-bone placeholder:text-bone/30 focus-visible:ring-gold/50"
                                />
                                <Button size="icon" className="bg-gold text-emerald-deep hover:bg-gold/90">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                            <p className="text-[10px] text-center text-bone/40 mt-2">
                                Keep it event-focused and respectful. No explicit offers.
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-bone/40">
                        Select a conversation
                    </div>
                )}
            </div>
        </div>
    );
}

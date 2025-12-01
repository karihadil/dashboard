"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface Message {
    id: string;
    type: "user" | "agent" | "error";
    content: string;
    timestamp: Date;
    metadata?: {
        status?: string;
        confidence?: number;
        riskLevel?: "low" | "medium" | "high";
        matches?: Array<{
            name: string;
            list: string;
            score: number;
        }>;
    };
}

export default function ListsPanel() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [agentStatus, setAgentStatus] = useState<"idle" | "analyzing" | "error">("idle");
    const [sessionId, setSessionId] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Initialize session ID on mount
    useEffect(() => {
        const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setSessionId(newSessionId);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            type: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);
        setAgentStatus("analyzing");

        try {
            // Call the AML AI Agent API
            const response = await fetch("http://192.168.246.126:5001/api/agent/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: input,
                    session_id: sessionId,
                }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();

            // Add agent response with AI reasoning and search results
            const agentMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: "agent",
                content: data.response || "Analysis completed",
                timestamp: new Date(),
                metadata: {
                    status: data.success ? "completed" : "error",
                    confidence: data.results && data.results.length > 0 ? (data.results[0].score / 100) : 0,
                    riskLevel: data.results && data.results.length > 0 
                        ? (data.results[0].score > 90 ? "high" : data.results[0].score > 75 ? "medium" : "low")
                        : "low",
                    matches: data.results?.map((result: any) => ({
                        name: result.name,
                        list: result.dataset,
                        score: result.score / 100,
                    })) || [],
                },
            };

            setMessages((prev) => [...prev, agentMessage]);
            setAgentStatus("idle");
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 2).toString(),
                type: "error",
                content: `Error: ${error instanceof Error ? error.message : "Failed to connect to AML Agent. Is it running at http://localhost:5001?"}`,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
            setAgentStatus("error");
        } finally {
            setLoading(false);
        }
    };

    const getRiskColor = (level?: string) => {
        switch (level) {
            case "high":
                return "text-red-600 bg-red-50 border-red-200";
            case "medium":
                return "text-yellow-600 bg-yellow-50 border-yellow-200";
            case "low":
                return "text-green-600 bg-green-50 border-green-200";
            default:
                return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 border-b border-blue-900">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">AML AI Agent</h2>
                        
                    </div>
                    <div
                        className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
                            agentStatus === "analyzing"
                                ? "bg-yellow-400 text-yellow-900"
                                : agentStatus === "error"
                                ? "bg-red-400 text-red-900"
                                : "bg-green-400 text-green-900"
                        }`}
                    >
                        {agentStatus === "analyzing" ? (
                            <>
                                <Loader size={16} className="animate-spin" />
                                Analyzing...
                            </>
                        ) : agentStatus === "error" ? (
                            <>
                                <AlertCircle size={16} />
                                Error
                            </>
                        ) : (
                            <>
                                <CheckCircle size={16} />
                                Ready
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center">
                        <div className="text-gray-400">
                            <div className="text-5xl mb-4">🤖</div>
                            <p className="text-lg font-semibold text-gray-600">
                                Ask the AI Agent about sanctions and watchlists
                            </p>
                            
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-xl px-4 py-3 rounded-lg ${
                                        msg.type === "user"
                                            ? "bg-blue-600 text-white"
                                            : msg.type === "error"
                                            ? "bg-red-100 text-red-800 border border-red-300"
                                            : "bg-white text-gray-800 border border-gray-200 shadow"
                                    }`}
                                >
                                    <p className="text-sm">{msg.content}</p>

                                    {/* Metadata Display */}
                                    {msg.metadata && msg.type === "agent" && (
                                        <div className="mt-3 space-y-2 text-xs">
                                            {msg.metadata.status && (
                                                <div className="flex items-center gap-2">
                                                    <Clock size={14} />
                                                    <span>Status: {msg.metadata.status}</span>
                                                </div>
                                            )}

                                            {msg.metadata.riskLevel && (
                                                <div
                                                    className={`px-3 py-1 rounded-full inline-block border ${getRiskColor(
                                                        msg.metadata.riskLevel
                                                    )}`}
                                                >
                                                    Risk Level: {msg.metadata.riskLevel.toUpperCase()}
                                                </div>
                                            )}

                                            {msg.metadata.confidence !== undefined && (
                                                <div className="text-gray-600">
                                                    Confidence: {(msg.metadata.confidence * 100).toFixed(0)}%
                                                </div>
                                            )}

                                            {msg.metadata.matches && msg.metadata.matches.length > 0 && (
                                                <div className="mt-2 bg-gray-100 p-2 rounded">
                                                    <p className="font-semibold mb-1">Matches Found:</p>
                                                    {msg.metadata.matches.map((match, idx) => (
                                                        <div key={idx} className="text-xs text-gray-700 mb-1">
                                                            • {match.name} ({match.list}) - {(
                                                                match.score * 100
                                                            ).toFixed(0)}% match
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="text-xs opacity-70 mt-2">
                                        {msg.timestamp.toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-3">
                <form onSubmit={sendMessage} className="flex gap-3">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.ctrlKey) {
                                sendMessage(e as any);
                            }
                        }}
                        placeholder="Ask me anything about sanctions, PEP lists, or AML compliance... (Ctrl+Enter to send)"
                        className="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-400"
                        rows={2}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition font-semibold"
                    >
                        {loading ? (
                            <>
                                <Loader size={18} className="animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Send size={18} />
                                Analyze
                            </>
                        )}
                    </button>
                </form>

                
            </div>
        </div>
    );
}

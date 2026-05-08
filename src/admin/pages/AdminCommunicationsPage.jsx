import React, { useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, Phone, Send, CheckCircle2, Clock, X } from "lucide-react";
import { messages as initialMessages, users } from "../data/dummyData";

const AdminCommunicationsPage = () => {
  const [msgs, setMsgs] = useState(initialMessages);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? msgs : msgs.filter((m) => m.channel === filter);

  const sendReply = () => {
    if (!reply.trim() || !selected) return;
    const newMsg = {
      id: `admin-${Date.now()}`,
      client: selected.client || "Guest",
      clientId: selected.clientId,
      channel: selected.channel,
      message: reply,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: true,
      replied: true,
      isAdmin: true,
    };
    setMsgs((prev) =>
      prev.map((m) => (m.id === selected.id ? { ...m, replied: true, read: true } : m)).concat(newMsg)
    );
    setReply("");
    setSelected(null);
  };

  const markReplied = (id) => {
    setMsgs(msgs.map((m) => (m.id === id ? { ...m, replied: true, read: true } : m)));
  };

  return (
    <div className="space-y-6 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Communications</h1>
        <div className="flex items-center gap-2">
          {["all", "in-app", "whatsapp"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                filter === f
                  ? "bg-lime-500/10 text-lime-500 border-lime-500/20"
                  : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 bg-neutral-950 border border-neutral-800 rounded-2xl p-4 h-fit max-h-[600px] overflow-y-auto">
          <h2 className="text-sm font-bold mb-3 text-neutral-500 uppercase tracking-wider">Messages</h2>
          <div className="space-y-2">
            {filtered.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m)}
                className={`w-full text-left p-3 rounded-xl transition-all border ${
                  selected?.id === m.id
                    ? "bg-lime-500/10 border-lime-500/20"
                    : "bg-neutral-900/50 border-neutral-800/50 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{m.client || "Guest"}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                    m.channel === "whatsapp" ? "bg-lime-500/10 text-lime-400 border-lime-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}>
                    {m.channel}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 truncate">{m.message}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-neutral-600">{m.date}</span>
                  {!m.replied && <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat / Reply Area */}
        <div className="lg:col-span-2 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col min-h-[500px]">
          {selected ? (
            <>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-800">
                <div>
                  <p className="font-semibold">{selected.client || "Guest"}</p>
                  <p className="text-xs text-neutral-500">{selected.channel} &middot; {selected.time}</p>
                </div>
                <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                <div className={`flex ${selected.isAdmin ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    selected.isAdmin
                      ? "bg-lime-500/10 border border-lime-500/20 text-white"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-300"
                  }`}>
                    {selected.message}
                  </div>
                </div>
                {filtered
                  .filter((m) => m.clientId === selected.clientId && m.id !== selected.id)
                  .map((m) => (
                    <div key={m.id} className={`flex ${m.isAdmin ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                        m.isAdmin
                          ? "bg-lime-500/10 border border-lime-500/20 text-white"
                          : "bg-neutral-900 border border-neutral-800 text-neutral-300"
                      }`}>
                        {m.message}
                      </div>
                    </div>
                  ))}
              </div>

              {!selected.replied && !selected.isAdmin && (
                <div className="space-y-3">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-lime-500/50 min-h-[80px]"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={sendReply}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-500 text-black font-semibold text-sm hover:bg-lime-600 transition-all"
                    >
                      <Send size={14} /> Send Reply
                    </button>
                    <a
                      href={`https://wa.me/254141447430`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 text-white text-sm hover:bg-neutral-700 transition-all"
                    >
                      <Phone size={14} /> WhatsApp
                    </a>
                    <button
                      onClick={() => markReplied(selected.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 text-neutral-400 text-sm hover:bg-neutral-700 transition-all"
                    >
                      <CheckCircle2 size={14} /> Mark Replied
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-500">
              <MessageSquare size={40} className="mb-3 text-neutral-700" />
              <p>Select a message to view and reply</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCommunicationsPage;

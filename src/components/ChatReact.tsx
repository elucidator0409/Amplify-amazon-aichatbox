import { useState } from "react";
import { callGemini } from "../utils/geminiApi";

export default function ChatReact() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setLoading(true);
    const reply = await callGemini(input);
    setMessages((msgs) => [...msgs, { role: "assistant", text: reply }]);
    setInput("");
    setLoading(false);
  };

  return (
    <div>
      <h1>Gemini AI Chat</h1>
      <div style={{ minHeight: 200, border: "1px solid #ccc", padding: 8 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ color: msg.role === "user" ? "blue" : "green" }}>
            <b>{msg.role}:</b> {msg.text}
          </div>
        ))}
        {loading && <div>Đang trả lời...</div>}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        style={{ display: "flex", alignItems: "center", marginTop: 16 }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          style={{ width: "80%" }}
        />
        <button type="submit" disabled={loading} style={{ marginLeft: 8 }}>Gửi</button>
      </form>
    </div>
  );
}
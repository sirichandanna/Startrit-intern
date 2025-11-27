import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [conversationId, setConversationId] = useState("65a...someid");
  const [messages, setMessages] = useState([]);
  const token = useSelector((s) => s.auth.token);

  useEffect(() => {
    const s = io("http://localhost", {
      auth: { token },
    });

    setSocket(s);

    s.on("receive_message", msg => {
      setMessages(prev => [...prev, msg]);
    });

    return () => s.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", {
      conversationId,
      text: "Hello from frontend",
    });
  };

  return (
    <div>
      <h1>Chat</h1>
      <button onClick={sendMessage}>Send Msg</button>

      {messages.map(m => (
        <p key={m._id}>{m.text}</p>
      ))}
    </div>
  );
}

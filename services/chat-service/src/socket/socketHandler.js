import Message from "../models/message.js";
import Conversation from "../models/conversation.js";

export default function socketHandler(io) {
  io.on("connection", (socket) => {
    const userId = socket.user.id;

    console.log("User connected:", userId);

    // Join personal room (1-to-1 signaling)
    socket.join(userId);

    //----------------------------------------
    // Send Message
    //----------------------------------------
    socket.on("send_message", async ({ conversationId, text }) => {
      const msg = await Message.create({
        conversationId,
        sender: userId,
        text,
      });

      // Load conversation participants
      const conv = await Conversation.findById(conversationId);

      // Broadcast to all members
      conv.members.forEach((m) => {
        io.to(m.toString()).emit("receive_message", msg);
      });
    });

    //----------------------------------------
    // Typing indicator
    //----------------------------------------
    socket.on("typing", ({ conversationId }) => {
      io.emit("user_typing", { conversationId, userId });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", userId);
    });
  });
}

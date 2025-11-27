import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    text: { type: String },
    fileUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);

import { Bot, User } from "lucide-react";

function MessageBubble({ role, text }) {
  return (
    <div className={`message ${role}`}>
      {role === "assistant" && (
        <>
          <div className="avatar ai-avatar">
            <Bot size={20} />
          </div>

          <div className="bubble-container">
            <span className="sender">DocMind AI</span>

            <div className="bubble ai-bubble">
              {text}
            </div>
          </div>
        </>
      )}

      {role === "user" && (
        <>
          <div className="bubble-container user-container">
            <span className="sender">You</span>

            <div className="bubble user-bubble">
              {text}
            </div>
          </div>

          <div className="avatar user-avatar">
            <User size={20} />
          </div>
        </>
      )}
    </div>
  );
}

export default MessageBubble;
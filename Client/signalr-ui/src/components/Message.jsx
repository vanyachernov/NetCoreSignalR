import "./Message.css";

export const Message = ({ messageInfo }) => {
  return (
    <div className="message-block">
      <span className="message-username">{messageInfo.userName}</span>
      <div className="message-block-inner">
        <div className="message-content">{messageInfo.message}</div>
      </div>
    </div>
  );
};

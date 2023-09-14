export default function ChatBubble({message, direction}) {
return (
        <div>
            {direction === "start"? <div className="chat ml-3 chat-start">
  <div className="chat-header">
    {message.user.name}
    {/* <time className="text-xs opacity-50">2 hours ago</time> */}
  </div>
  <div className="chat-bubble m-2">{message.message}</div>
  
</div> : <div className="chat mr-3 chat-end">
  <div className="chat-header">
    {/* {message.user.name} */}
    {/* <time className="text-xs opacity-50">2 hours ago</time> */}
  </div>
  <div className="chat-bubble m-2">{message.message}</div>
  
</div>}
            

        </div>
    )
}
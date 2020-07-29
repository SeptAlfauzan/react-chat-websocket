import React from 'react';

const ChatBubbles = (props) => {
    const datas = props.messages
    return ( 
        <div>
        {datas.map(data => {
            return data.sender === props.username? 
            <div className="talk-bubble-right round">
                <div className="talktext">
                    <h5>{data.sender}</h5>
                    <p>{data.message}</p>
                </div>
            </div>:
            <div className="talk-bubble-left round">
            <div className="talktext">
                <h5>{data.sender}</h5>
                <p>{data.message}</p>
            </div>
        </div>
        })}
        </div>
     );
}
 
export default ChatBubbles;
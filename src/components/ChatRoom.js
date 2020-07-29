import React, { useState, useRef, useEffect } from 'react';
import { Container, Input,  Grid, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import DialogFormUsername from './DialogFormUsername';

let ws;
// chack is there any websocket
if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
}
// instance of new webscoket from server
// const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
ws = new WebSocket('ws://localhost:4000');

const ChatRoom = () => {
    const [username, setUsername] = useState('');
    const [alert, setAlert] = useState('');
    const [chat, setChat] = useState('');
    const [open, setOpen] = useState(true);
    const [chatsList, setChatsList] = useState([]);

    const divRref = useRef(null);



    const handleSetUsername = (data) => {
        setUsername(data);
    }

    const handleClose = () => {
        setOpen(false);
    };
    // websocket   
    ws.onopen = () => {
        // when websocket is conected
        console.log('connection opened');
    }

    ws.onmessage = ({ data }) => {
        // get new message 
        const getMessageObj = JSON.parse(data);
        // parse message data from json
        setChatsList(state => [...state, getMessageObj]);
        // set into chatsList state
    }

    ws.onclose = function () {
        // when user close the connection(etc. close the website)
        ws = null;
    }

    const handleSubmit = (e) => {
        if (!ws) {
            return alert(" no web socket connection");
            // return alert, when something happen to websocket server
        }
        if (username === '') {
            setAlert(`You can't send message.`)
            // set alert state
            return setOpen(true);
            // prevent user from sending message without type their username
        } else if(chat !== '') {
            setOpen(false);
            e.preventDefault();

            const messageObj = { sender: username, message: chat }
            setChatsList(state => [...state, messageObj])
            // set chatlist state
            ws.send(JSON.stringify(messageObj));
            // send message object to websocket server as json
            setChat('');
            // resen chat state
        }
    }

    useEffect(() => {
        divRref.current.scrollIntoView({ behavior: 'smooth' });
    });


    return (
        <Container maxWidth="sm">
            <h3>Simple chat room</h3>
            <DialogFormUsername message={alert} setUsername={handleSetUsername} open={open} handleClose={handleClose} />
            <form action="/" method="post" onSubmit={handleSubmit}>
                <div id="container" style={{ height: '80vh', width: '100%', overflowY: 'scroll' }}>

                    {chatsList.map(data => {
                        return data.sender === username? 
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

                    <div ref={ divRref } />

                </div>
                <Grid container style={{ bottom: 0, margin: 0 }} spacing={2}>
                    <Grid item xs={10}>
                        <Input value={chat} onChange={(e) => setChat(e.target.value)} id="messageBox" fullWidth variant="outlined" placeholder="type your message"></Input>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={handleSubmit} color="primary" type="submit" aria-label="upload picture" component="span">
                            <SendIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default ChatRoom;
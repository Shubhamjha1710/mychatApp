import React , {useState , useEffect , useRef} from 'react'
import axios from 'axios';
import Logout from './logout';
import {v4 as uuidv4} from 'uuid';
import ChatInput from './chatInput';
import styled from 'styled-components'
import { sendMessageRoute , recieveMessageRoute } from '../APIRoutes';

function ChatContainer({currentChat , currentUser , socket}) {
    
    const scrollRef = useRef();
    const [messages , setMessages] = useState([]);
    const [arrivalMessage , setArrivalMessage] = useState(null);
    useEffect(()=>{
        const fetch_chat = async ()=>{
            if(currentChat){
                const data = await axios.post(recieveMessageRoute , {
                    from :currentUser._id,
                    to: currentChat._id,
                })
                setMessages(data.data);
                console.log(data);
            }
        }
        fetch_chat();
    } , [currentChat])

    useEffect(() => {
        const getCurrentChat = async () => {
            if (currentChat) {
                await JSON.parse(localStorage.getItem('chat-app-user'))._id;
            }
        };
        getCurrentChat();
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute , {
            from: currentUser._id,
            to : currentChat._id,
            message : msg,
        })

        socket.current.emit("send-msg" , { 
            to : currentChat._id,
            from : currentUser._id,
            msg,
        });

        const msgs = [...messages];
        msgs.push({fromSelf : true , message :msg});
        setMessages(msgs);
    }

    useEffect(()=>{
        if(socket.current){
            socket.current.on('msg-recieve' , (msg)=>{
                setArrivalMessage({
                    fromSelf : false,
                    message :msg,
                })
            })
        }
    } , [])

    useEffect (()=>{
        arrivalMessage && setMessages((prev)=> [...prev , arrivalMessage]);
    } ,[arrivalMessage])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({
            behavior: "auto",
        })
    } , [messages]);

    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        {
                            (currentChat != undefined) ? (<img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />) : (<img src="" alt=""/>)
                        }
                    </div>
                    <div className="username">
                        {
                            (currentChat != undefined) ? (<h3>{currentChat.username}</h3>) : (<h3></h3>)
                        }
                    </div>
                </div>
                <Logout/>
            </div>

            <div className="chat-messages">
                {
                    messages.map((msg , idx)=>{
                        return (
                            <div ref={scrollRef} key={idx}>
                                <div className={`message ${msg.fromSelf ? "sended" :"recieved"}`}>
                                    <div className="content">
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <ChatInput handleSendMsg={handleSendMsg}/>
        </Container>
    )
}

const Container = styled.div`
    display : flex;
    flex-direction: column;
    padding :10px 15px;
    overflow :scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    .chat-header{
        display: flex;
        height: 10%;
        justify-content: space-between;
        align-items: centerl
        padding 0 2rem;

        .user-details{
            display: flex;
            align-items:center;
            gap: 1rem;
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
                color: white;
            }
        }
    }

    .chat-messages{
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap : 1rem;
        overflow: scroll;
        height: 80%;

        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .message{
            display: flex;
            align-items: center;
            .content{
                max-width: 50%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1rem;
                border-radius: 1rem;
                color: #d1d1d1;

            
            }
        }

        .sended {
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }
        .recieved {
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
    }

`
export default ChatContainer
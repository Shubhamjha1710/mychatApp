import React , {useState , useEffect} from 'react'
import styled from 'styled-components';
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'

function ChatInput({handleSendMsg}) {
    const [showEmojiPicker , setShowEmojiPicker] = useState(false);
    const [msg , setMsg] = useState("");

    const handleEmojiPickerHideShow = ()=>{
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event , emojiObject) =>{
        let message = msg;
        console.log(emojiObject);
        console.log(emojiObject.emoji);
        message += emojiObject.emoji;
        setMsg(message);
    }

    const sendChat = (event)=>{
        event.preventDefault();
        if(msg.length > 0){
            handleSendMsg(msg);
            setMsg('')
        }
    }
    
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                    {
                        showEmojiPicker && <Picker 
                        onEmojiClick={handleEmojiClick}/>
                    }
                </div>
            </div>
            <form className="input-container" onSubmit={(e)=>sendChat(e)}>
                <input type="text" 
                placeholder='Type a message'
                value={msg}
                onChange={(e)=> setMsg(e.target.value)}/>
                <button className="submit">
                    <IoMdSend/>
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display:grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    justify-content: center;
    padding :4px 1rem;
    height: 10%;
    
    @media (max-width: 800px){
        grid-template-columns: 12% 88%;
    }

        .button-container{
            display: flex;
            align-items:center;
            color:white;
            gap:1rem;
            height: 60%;

            .emoji{
                position:relative;
                margin-top: 5px;

                svg{
                    font-size: 1.5rem;
                    color: #ffff00c8;
                    cursor: pointer;
                }

                .EmojiPickerReact {
                    position: absolute;
                    top: -500px;
                    background-color: #080420;
                    box-shadow: 0 5px 10px #9a86f3;
                    border-color: #9a86f3;

                    @media (max-width: 800px){
                        width: 250px;
                    }
                    
                    .epr-body::-webkit-scrollbar {
                        background-color: #080420;
                        width: 8px;
                        border-radius: 10px;
                        &-thumb {
                            background-color: #9a86f3;
                        }
                    }
                    
                    .epr-emoji-category-label{
                        background-color: #080420;
                    }

                    input{
                        background-color: transparent;
                        border-color: #9a86f3;
                    }

                    .emoji-group:before {
                        background-color: #080420;
                    }
                }
            }
        }

        .input-container{
            width: 90%;
            height: 60%;
            border-radius: 2rem;
            display: flex;
            align-items:center;
            justify-content: center;
            background-color: #080420;
            border-radius: 5px;

            input{
                width: 95%;
                height: 90%;
                color: white;
                font-size: 1.2rem;
                padding: 5px;
                border: none;
                background-color: transparent ;

                &::selection {
                    background-color: #9a86f3;
                }
                &:focus {
                    outline: none;
                }
            }

            button{
                padding: 0.3rem 2rem;
                border-radius: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: transparent;
                border: none;
                cursor: pointer;

                svg {
                    font-size: 1.5rem;
                    color: white;
                }
            }
        }
`;
export default ChatInput
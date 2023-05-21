import React , {useState , useEffect , useRef}from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { allUsersRoute , host } from '../APIRoutes';
import Contact from '../components/contact'
import Welcome from '../components/welcome'
import ChatContainer from '../components/chatContainer'
import { io } from "socket.io-client";

function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contact , setContact] = useState([]);
  const [currentUser , setCurrentUser] =useState(undefined);
  const [currentChat , setCurrentChat] = useState(undefined);
  const [isLoaded , setLoaded] = useState(false);
  
  const get_current_user = async ()=>{
    if (!localStorage.getItem('chat-app-user')){
      navigate("/login");
    }
    else {
      setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
      setLoaded(true);
    }
  }

  const fetch_contacts = async ()=>{
    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
    setContact(data.data);
  }

  const handleChatChange = (chat)=>{
    setCurrentChat(chat);
  }

  useEffect(()=>{
    get_current_user();
  },[])

  useEffect(()=>{
    if(currentUser){
      if(currentUser.isAvatarImage){
        fetch_contacts();
      }
      else{
        navigate('/setAvatar');
      }
    }
  } ,[currentUser]);

  // sockets
  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user" , currentUser._id);
    }
  } , [currentUser]);

  return (
    <Container>
      <div className="container">
        <Contact 
        contacts={contact} 
        currentUser={currentUser} 
        changeChat={handleChatChange}/>

        {
          (isLoaded && currentChat === undefined) ? (
          <Welcome currentUser={currentUser}/> 
          ) : (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        )}

      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display:flex;
  flex-direction: column;
  justify-content :center;
  align-items :center;
  background-color: rgba(11,15,95,1);;
  min-width: 700px;
  .container{
    height:85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0,0,0,1);
    min-width: 550px;

    @media (max-width :1100px){
      grid-template-columns: 40% 60%;
    }
  }

`
export default Chat
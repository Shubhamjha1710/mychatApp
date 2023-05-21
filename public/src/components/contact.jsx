import React ,{useState , useEffect} from 'react'
import styled from 'styled-components';
import Logo from '../images/logo.svg';
import {useNavigate , Link} from 'react-router-dom'

function Contact({contacts , currentUser , changeChat}) {
    const [currentUserName , setCurrentUserName] = useState(undefined);
    const [currentUserImage , setCurrentUserImage] = useState(undefined);
    const [currentSelected , setCurrentSelected] = useState(undefined);

    const changeCurrentChat = (index, contact)=>{
        setCurrentSelected(index);
        changeChat(contact);
    }

    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    },[currentUser]);

    return (
        <>
        {
            currentUserImage && currentUserName &&(
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h3>Wassup</h3>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact,index)=>{
                                return(
                                    <div className={`contact ${index === currentSelected ? "selected" : ""}`}
                                    key={index} 
                                    onClick={()=>changeCurrentChat(index,contact)}>
                                        <div className="avatar">
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                                        </div>
                                        <div className="username">
                                            <h3>{contact.username}</h3>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <div className="currentuser">
                        <div className="avatar">
                            <Link to="/setAvatar"><img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" /></Link>
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>

                </Container>
            )
        }
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #080420; 
    border-radius: 20px;
    height: 100%;

    .brand{
        display: flex;
        align-items: center;
        justify-content:center;
        gap: 1rem;
        height: 10%;
        img{
            height: 2rem;
        }
        h3{
            color: white;
            text-transform: uppercase;
        }
    }

    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        height: 75%;

        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .contact{
            background-color :#ffffff34;
            min-height: 5rem;
            cursor: pointer;
            width: 90%;
            border-radius: 0.2rem;
            padding: 1rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            transition: 0.5s ease-in-out;
            overflow: hidden;
            
            .avatar{
                img{
                    height: 3rem;
                }
            }
            
            .username{
                h3{
                    color: white;
                    font-size:0.9rem;
                }
            }

        }
        
        .selected{
            background-color: #9a86f3;
        }
    }

    .currentuser {
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        height: 15%;

        .avatar {
            img {
                height: 4rem;
            }
        }

        .username {
            h2 {
                color: white;
                font-size:0.95rem;
            }
        }
    }
`
export default Contact
import React , {useState , useEffect }from 'react'
import styled from 'styled-components'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Loader from '../images/loader.gif';
import {setAvatarRoute} from '../APIRoutes.js';
import {Buffer} from 'buffer'

function SetAvatar() {
    const navigate = useNavigate()
    const api = `https://api.multiavatar.com`;
    const [avatars , setAvatars] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)

    // toast customization
    const toastOptions = {
        position : 'top-right',
        autoClose: 6000,
        draggable: true,
        pauseOnHover: true,
        theme: 'dark',
    }

    // First user should be logged in
    useEffect(() => {
        if (!localStorage.getItem('chat-app-user'))
            navigate("/login");
    }, []);


    const data = []
    const fetchAvatars = async ()=>{
        for(let i = 0;i<4;i++){
            const image = await axios.get(`${api}/${Math.round(Math.random()*1000 + 1000)}`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
            setAvatars(data);
        }
        setIsLoading(false);
    }

    const setProfilePicture = async () => {
        if(selectedAvatar === undefined){
            toast.error("Please Select an avatar" , toastOptions)
        }
        else 
        {
            const user = await JSON.parse(localStorage.getItem('chat-app-user'));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}` , {
                image:avatars[selectedAvatar],
            });

            if(data.isSet){
                user.isAvatarImage = true;
                user.avatarImage = data.image;
                localStorage.setItem('chat-app-user',JSON.stringify(user));
                navigate('/');
            }
            else 
            {
                toast.error("Error in setting Avatar. Please Try again" , toastOptions);
            }
        }
    };

    useEffect(()=>{
        fetchAvatars();
    } , []);

        return (
        <>
            {
                isLoading ? <Container>
                    <img src={Loader} alt="site is loading" className="loader"></img>
                </Container> :(
            <Container>
                <div className="card">
                    <div className="title_container">
                        <h1>Pick an avatar for your profile</h1>
                    </div>

                    <div className="avatars">
                        {
                            avatars.map((avatar ,idx) => {
                                return(
                                    <div key={idx} className={`avatar ${selectedAvatar === idx ? "selected" :""}`}>
                                        <img 
                                        src={`data:image/svg+xml;base64,${avatar}`} 
                                        alt="avatar"
                                        key={avatar}
                                        onClick={()=>setSelectedAvatar(idx)}/>
                                    </div>
                                )
                            })
                        } 
                    </div>

                    <button className="submit-btn" onClick={setProfilePicture}>Set a Profile Picture</button>
                </div>
            </Container>
            )    
            }
            <ToastContainer/>
        </>
        )
}

const Container = styled.div`
    display:flex;
    align-items: center;
    justify-content :center;
    height: 100vh;
    width: 100vw;
    background-color :#131324;
    min-width:250px;
    min-height:700px;

    @media (max-width: 600px) 
    {
        width:600px;
    }
    @media (max-width: 450px) 
    {
        width:480px;
    }

    .card{
        display :flex;
        align-items: center;
        justify-content :center;
        flex-direction:column;
        gap: 3rem;
        background-color :#00000076;
        padding: 10px;
        border-radius: 20px;
        box-shadow :0 1rem 1rem rgba(0,0,0,0.6);
    }
    
    .loader{
        max-inline-size: 100%;
    }
    
    .title_container{
        margin: 25px;
        h1{
            color: white;
            text-align:center;
        }
    }
    
    .avatars{
        margin: 25px;
        display: flex;
        align-items: center;
        justify-content :center;
        flex-wrap: wrap;
        gap: 3rem;
        .avatar{
            border: 0.4rem solid
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height :6rem;
                transition: 0.5s ease-in-out;
            }
        }
        .selected{
            border: 0.4rem solid #4e0eff;
        }
    }
    
    .submit-btn{
        background-color: #4e0eff;
        width: 60%;
        height: 35px;
        color:white;
        padding: 1px 2px;
        margin :20px 10px;
        border: none;
        cursor: pointer;
        border-radius: 10px;
    }
`
export default SetAvatar
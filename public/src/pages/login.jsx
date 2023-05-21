import React , {useState , useEffect }from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components'
import Logo from '../images/logo.svg';
import BackgroundImage from '../images/background.jpg';
import {useNavigate , Link} from 'react-router-dom'
import axios from 'axios';
import {loginRoute} from '../APIRoutes.js';

function Login() {
    const navigate = useNavigate()
    const [values , setValues] = useState({
        username: "",
        password: "",
    });
    
    // toast customization
    const toastOptions = {
        position : 'top-right',
        autoClose: 6000,
        draggable: true,
        pauseOnHover: true,
        theme: 'dark',
    }

    //  is user is already log in
    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate("/");
        }
    } ,[])

    const validations = ()=>{
        const {username, password} = values;
        if(username === ""){
            toast.error("username is required" , toastOptions);
            return false;
        }
        if(password === ""){
            toast.error("password is required" , toastOptions);
            return false;
        }
        return true;
    }

    const handleChange = (event) => {
        setValues({...values , [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event)=>{
        // console.log(event);
        event.preventDefault();
        if(validations()){
            const {username , password } = values; 
            const {data} = await axios.post(loginRoute , {username , password});
            if(data.status === false){
                toast.error(data.msg , toastOptions);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user' ,JSON.stringify(data.user));
                navigate('/')
            }
        }
    }

    return (
    <div>
        <FormContainer>
            <form action="" onSubmit={(event) => handleSubmit(event)}>
                <div className="Logo">
                    <img src={Logo} alt=".." />
                    <h2>Wassup</h2>
                </div>
                <input type="text" 
                    placeholder="Username" 
                    name="username" 
                    onChange={(event) => handleChange(event)}
                    />
                <input type="password" 
                    placeholder='Password'
                    name='password'
                    onChange={(event) => handleChange(event)}
                />
                <button type="submit">Login</button>

                <span>
                    Don't have an account ? <Link to="/signup">SignUp</Link>
                </span>
            </form>
        </FormContainer>
        <ToastContainer/>
    </div>
    )
}



// CSS style
// background-color: #FF3CAC;
// background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);


const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(11,15,95,1);
    min-width:300px;
    min-height:500px;
    padding: 30px;
    padding: 30px;

        .Logo
        {
            display:flex;
            align-item:center;
            justify-content: center;
            color: white;

            img
            {
                height :3rem;
            }

            h2
            {
                text-align: center;
                margin: auto 10px;
            }
        }

        form
        {
            display: flex;
            flex-direction :column;
            background-color :#00000076;
            padding: 2rem 5rem;
            align-items:center;
            justify-content:center;
            border-radius: 20px;
            box-shadow :0 1rem 4rem rgba(0,0,0,0.9);
            @media (max-width: 350px) 
            {
                padding: 1rem 1rem;
            }
        }
        
        input
        {
            height: 35px;
            width: 100%;
            border-radius:10px;
            text-align: center;
            margin :18px 10px;
            background-color: transparent;
            border: 1px solid #4e0eff;
            font-size: 1rem;
            color: white;
            
            &:focus
            {
                border: 1px solid #4e0eff;
                background-color: transparent;
                outline:none;
            }

            @media (max-width: 300px) 
            {
                width:80%;
            }
        }
        
        button
        {
            background-color: #4e0eff;
            height: 35px;
            width: 100%;
            color:white;
            padding: 1px 2px;
            margin :18px 10px;
            border: none;
            cursor: pointer;
            border-radius: 10px;
            moz-transition: all .4s ease-in-out;
            -o-transition: all .4s ease-in-out;
            -webkit-transition: all .4s ease-in-out;
            transition: all .4s ease-in-out;
            
            &:hover
            {
                background-position: 100% 0;
                moz-transition: all .4s ease-in-out;
                -o-transition: all .4s ease-in-out;
                -webkit-transition: all .4s ease-in-out;
                transition: all .4s ease-in-out;
            }
            
            @media (max-width: 300px) 
            {
                width:80%;
            }
        }

        
        span
        {
            text-align:center;
            margin: 5px;
            color: white;

            a
            {
                color :4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
        `;
export default Login
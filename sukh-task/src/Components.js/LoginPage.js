import axios from 'axios';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const LoginPage = ({setUser})=>{

    const dummyData = {
        username : '',
        password: ''
    }
    const history = useHistory();
    const [ data, setData ] = useState(dummyData);

    const handelChange = (e) =>{
        setData({
            ...data,
            [e.target.id] : e.target.value
        })        
    }

    const handelSubmit = async(e)=>{
        e.preventDefault();
        await axios({
            method: 'post',
            url: 'http://localhost:8000/userapi/login',
            data,
            headers:{'Content-Type':'application/json'}
        }).then((res)=>{
            console.log(res)
            setUser({
                ...res.data.user
            })
            history.push("/home");
        })
    }

    return(
        <div className="row container">
            <div className='row'>
                <div className='col offset-m3 col s12'>
                    <h4>Login </h4>
                </div>
            </div>
            
            <div className="row">
                <div className="input-field offset-m3 col s12 m6">
                <input id="username" type="email" className="validate" onChange={handelChange} value={data.username} required  />
                <label htmlFor="username">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field offset-m3 col s12 m6">
                <input id="password" type="password" className="validate" onChange={handelChange} value={data.password} required />
                <label htmlFor="password">Password</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field offset-m3 col s12 m6">
                    <button className="waves-effect waves-light btn" onClick={handelSubmit}>Login</button>
                    <Link to='/register'>New User? Register Here</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
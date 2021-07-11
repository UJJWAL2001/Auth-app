import { Link } from 'react-router-dom';
import { axios } from 'axios';

const Home = ({user, setUser})=>{

    const handelLogout = async()=>{
        setUser({});
        await axios({
            method: 'get',
            url: 'http://localhost:8000/userapi/logout'
        })
    }

    return(
        <div className="container">
            <h2>Home Page</h2>
            {(user.firstName)?<h4>Hello {user.firstname} </h4>:<h4>You are not logged In</h4>}
            {(user.firstName)?<button  onClick={handelLogout}>Log Out</button> : <Link to='/login'>Login </Link>}
            
        </div>
    )
}

export default Home;
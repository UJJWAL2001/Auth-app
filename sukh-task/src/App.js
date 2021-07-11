import './App.css';
import UserForm from './Components.js/UserForm';
import LoginPage from './Components.js/LoginPage';
import Home from './Components.js/Home'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {

  const dummyData = {
    phoneNumber : '',
    countryCode : '',
    code : ''
  }
  const [ countryList, setCountryList] = useState([]);
  const [ country, setCountry] = useState(', ');
  const [ phoneData, setPhoneData ] = useState(dummyData);  
  const [ user, setUser ] = useState({});
  
  useEffect(()=>{
      axios.get('https://restcountries.eu/rest/v2/')
      .then( (res) => {
          setCountryList(res.data);
      });
  },[])

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/register' component={()=>(<UserForm countryList={countryList}
            country={country}
            setCountry={setCountry}
            phoneData={phoneData}
            setPhoneData={setPhoneData} />
          )} />
          <Route path='/login' component={()=><LoginPage setUser={setUser} />} />
          <Route path='/home' component={()=><Home user={user} setUser={setUser} />} />
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;

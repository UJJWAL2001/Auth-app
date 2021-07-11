import '../assets/phoneVerificationForm.css';
import axios from 'axios';
import { useState} from 'react';

const PhoneVerificationForm = ({countryList, setCountry, phoneData, setPhoneData, verified, setVerified, data, setData}) => {

    const dummyData = {
        phoneNumber : '',
        countryCode : '',
        code : ''
    }
    
    const [ clickedVerify, setClickedVerify ] = useState(false);
    const [ permit, setPermit ] = useState(false);
    

    const reset = ()=>{
        setPhoneData(dummyData);
        setPermit(false);
        setVerified(false);
    }
    
    const handelChange = (e) => {
        setPhoneData({
            ...phoneData,
            [e.target.id] :  e.target.value
        });
    }
    const handelTick = async(e) => {
        e.preventDefault();
        const phone = phoneData.countryCode.split(',')[0] + phoneData.phoneNumber ;
        if(phoneData.phoneNumber.length===10 && phoneData.countryCode!==''){
            await axios.get(`http://localhost:8000/phoneapi/register/${phone}`)
              .then(function (response) {
                  console.log(response)
                    if(response.status===200) setPermit(true)
              })
              .catch(function (error) {
                console.log(error);
              })

        }
    }
    const handelVerify = async(e) =>{
        e.preventDefault();
        setClickedVerify(true);
        const phone = phoneData.countryCode.split(',')[0] + phoneData.phoneNumber ;
        const countryName = phoneData.countryCode.split(',')[1].slice(2);
        await axios.get(`http://localhost:8000/phoneapi/verify/${phone}/${phoneData.code}`)
              .then(function (response) {
                    console.log(response)
                    if(response.status===200) {
                        console.log("success")
                        setCountry(phoneData.countryCode);
                        const tempUser={
                            ...data.user,
                            mobileNumber : phone,
                            country: countryName
                        }
                        setData({
                            ...data,
                            user : tempUser
                        })
                        setVerified(true);
                    }
              })
              .catch(function (error) {
                console.log('wrong OTP')
                setVerified(false);
                console.log(error);
              })
    }

    return(
        <>
            <div className='row'>
                <div className="input-field col s1">
                <i className="material-icons prefix">phone</i>
                </div>
                <div className="input-field col s3">
                    <select id='countryCode' className="browser-default" onChange={handelChange} disabled={permit} value={phoneData.countryCode} >
                        <option value="" disabled selected>Choose your Country</option>
                            {   
                                countryList.map((country,i)=>(
                                    <option key={i} value={ country.callingCodes[0] + "," + country.alpha2Code + country.name }  >{country.name}, +{country.callingCodes[0]}</option>
                                ))
                            } 
                    </select>
                    
                </div>
                
                <div className="input-field col s5">
                    <input id="phoneNumber" name="phoneNumber" disabled={permit} type="tel" pattern='[0-9]{10}' maxLength="10" className="validate" onChange={handelChange} value={phoneData.phoneNumber} />
                    <label htmlFor="phoneNumber">Phone Number</label>
                </div>
                <div className='input-field col s2'>
                    <button className={(permit)?"btn-floating waves-effect waves-light green":"btn-floating waves-effect waves-light red"} onClick={handelTick} ><i className="material-icons">done</i></button>
                </div>
            </div>
            <div className="row">
                <div className='input-field col offset-s1 '>
                    <input id="code" name="code" type='text' className="validate" disabled={!(permit&&(!verified))} onChange={handelChange} value={phoneData.code} />
                    <label htmlFor="code">OTP</label>
                </div>
                <div className="input-field col">
                    <button className="btn waves-effect waves-light" disabled={!(permit&&(!verified))} type="submit" name="action" onClick={handelVerify}>
                        Verify
                        <i className="material-icons right">send</i>
                    </button>
                </div>
                <div className='input-field col s1'>
                    
                    {(clickedVerify)? ((!verified)?<i className="material-icons red">close</i>:<i className="material-icons green">done</i>):<i></i>} 
                    {(clickedVerify)? ((!verified)?<p onClick={reset}>Change Phone Number</p>:<i></i>):<i></i>} 
                    
                </div>
            </div>
        </>
    )
}

export default PhoneVerificationForm;
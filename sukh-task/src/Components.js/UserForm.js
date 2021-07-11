import PhoneVerificationForm from "./PhoneVerificationForm";
import { useState } from 'react'
import axios from "axios";

const UserForm = ({countryList, country, setCountry, phoneData,  setPhoneData}) => {

    const dummyData = {
        user: {
            firstName : '',
            middleName : '',
            lastName : '',
            dob : '',
            education : '',
            mobileNumber : '',
            email : '',
            pinCode : '',
            city : '',
            state : '',
            country : ''
        },
        password: '',
        confirmPassword: ''
    }

    const [ data, setData ] = useState(dummyData);
    const [ checkPassword, setCheckPassword ] = useState(false);
    const [ verified, setVerified ] = useState(false);

    const handleCheck = () =>{
        if(data.password!=='')
            setCheckPassword(true);
        else
            setCheckPassword(false);
    }

    const handelAutoFill = async() =>{
        if(data.user.pinCode.length === 6){
            const countryCode = country.split(',')[1].slice(0,2)
            console.log(countryCode)
            await axios({
                method: 'get',
                url: `https://api.worldpostallocations.com/pincode?postalcode=${data.user.pinCode}&countrycode=${countryCode}`
            }).then((res) => {
                const tempUser = {
                    ...data.user,
                    city : res.data.result[0].province,
                    state : res.data.result[0].state
                }
                console.log(tempUser)
                setData({
                    ...data,
                    user : tempUser
                })
            })
        }
    }

    const handelChangeUser = async (e)=>{
        const tempUser = {
            ...data.user,
            [e.target.id] : e.target.value
        }
        setData({
            ...data,
            user : tempUser
        })
        handelAutoFill();
    }
    const handelChange = (e)=> {
        setData({
            ...data,
            [e.target.id] : e.target.value
        })
    }

    const handelSubmit = async(e) =>{
        e.preventDefault();
        if(verified){

            await axios({
                method : 'post',
                url: 'http://localhost:8000/userapi/register',
                data,
                headers:{'Content-Type':'application/json'}
            })
        }
    }

 return(
     <>
        <div className="row container">
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s10 m4">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="firstName" onChange={handelChangeUser} type="text" className="validate" required />
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="input-field col s10 m4">
                        <input id="middleName" onChange={handelChangeUser} type="text" className="validate" />
                        <label htmlFor="middleName">Middle Name</label>
                    </div>
                    <div className="input-field col s10 m4">
                        <input id="lastName" onChange={handelChangeUser} type="text" className="validate" required />
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m3">
                        <input type="date" id='dob' value={data.user.dob} onChange={handelChangeUser} className="datepicker" required />
                        <label htmlFor="dob">DOB</label>
                    </div>
                    <div className="input-field col s12 m9">
                        <input placeholder='12th Pass, B.Tech in ECE , etc'  id="education" onChange={handelChangeUser} type="text" className="validate" required />
                        <label htmlFor="education">Eduction</label>
                    </div>
                </div>
                <PhoneVerificationForm countryList={countryList}
                country={country}
                setCountry={setCountry}
                phoneData={phoneData}
                setPhoneData={setPhoneData} 
                verified={verified}
                setVerified={setVerified}
                data={data}
                setData={setData} />
                <div className="row">
                    <div className="input-field col s12 m6">
                        <i className="material-icons prefix">mail</i>
                        <input id="email"  onChange={handelChangeUser} type="email" className="validate" />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                    <i className="material-icons prefix">lock</i>
                        <input id="password" type="password" onChange={handelChange} onClick={handleCheck} className="validate" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field col s12 m6">
                    <input id="confirmPassword" onChange={handelChange} type="password" onClick={handleCheck} className={(checkPassword)?((data.password === data.confirmPassword)?'valid':'invalid'):''} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                </div>
                <div className='row'>
                    <h4>Address</h4>
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <i className="material-icons prefix">place</i>
                        <input id="address" onChange={handelChangeUser} type="text" className="validate" />
                        <label htmlFor="address">Street/House No.</label>
                    </div>
                    <div className="input-field col s12 m6">
                        <input id="pinCode"  onChange={handelChangeUser} type="text" pattern='[0-9]{6}' maxLength="6" className="validate" />
                        <label htmlFor="pinCode">PinCode</label>
                    </div>
                </div>
                <div className="row">
                    <div className='input-field col s10 m4'>
                        <input id="city" placeholder=" " onChange={handelChangeUser} value={data.user.city} type="text" className="validate" />
                        <label htmlFor="city">City</label>
                    </div>
                    <div className='input-field col s10 m4'>
                        <input id="state" placeholder=" " onChange={handelChangeUser} value={data.user.state} type="text" className="validate" />
                        <label htmlFor="state">State</label>
                    </div>
                    <div className='input-field col s10 m4'>
                        <input placeholder='Country'  onChange={handelChangeUser} id="country" type="text" className="validate"  value={country.split(',')[1].slice(2)} disabled={true} />
                        <label htmlFor="country">Country</label>
                    </div>
                </div>
                <div className="row">
                    <div className='input-field col s3'>
                        <button className="btn waves-effect waves-light" disabled={!verified} onClick={handelSubmit}  >
                            Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
     </>
 )
}
export default UserForm;
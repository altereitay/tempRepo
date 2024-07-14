import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../Register/Register.css";

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

const ConfirmPasswordErrorMessage = () => {
  return (
    <p className="FieldError">Passwords do not match</p>
  );
};

function validateEmail(email){
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return false;
    }
    return true;
}; 

function validatePhoneNumber(phoneNumber) {
  if (!/^0(5[0-9])\d{7}$/.test(phoneNumber)) {
      return false;
  }
  return true;
};
function validateID(id){ 
  if(!/^\d{9}$/.test(id)){ 
    return false;
  } 
  return true;
}

function Register() {
  const nav = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [id, setID] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isTouched: false,
  });

  const [isIdValid, setIsIdValid] = useState(true);
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const getIsFormValid = () => {
    return (
      validateID(id) &&
      firstName && 
      lastName &&
      validateEmail(email) &&
      validatePhoneNumber(phoneNumber) &&
      address &&
      password.value.length >= 8 &&
      password.value === confirmPassword.value
    );
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setID("");
    setPassword({
      value: "",
      isTouched: false,
    });
    setConfirmPassword({
      value: "",
      isTouched: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          address: address,
          password: password.value,
          id: id
        })
      });
      console.log(response)
      if (response.status === 409) {
        const data = await response.json();
        alert(data.message); 
        
      } else if (!response.ok) {
        throw new Error("Bad Network");
      } else {
        clearForm();
        nav("/");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="Register">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label>
              ID <sup>{!isIdValid && "*"}</sup>
            </label>
            <input
              value={id}
              onChange={(e) => {
                setID(e.target.value);
                setIsIdValid(validateID(e.target.value));
              }}
              placeholder="ID"
            />
          </div>

          <div className="Field">
            <label>
              First name <sup>{!isFirstNameValid && "*"}</sup>
            </label>
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setIsFirstNameValid(!!e.target.value);
              }}
              placeholder="First name"
            />
          </div>
          <div className="Field">
            <label>
              Last name <sup>{!isLastNameValid && "*"}</sup>
            </label>
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setIsLastNameValid(!!e.target.value);
              }}
              placeholder="Last name"
            />
          </div>
          <div className="Field">
            <label>
              Email address <sup>{!isEmailValid && "*"}</sup>
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailValid(validateEmail(e.target.value));
              }}
              placeholder="Email address"
            />
          </div>
          <div className="Field">
            <label>
              Phone number <sup>{!isPhoneNumberValid && "*"}</sup>
            </label>
            <input
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setIsPhoneNumberValid(validatePhoneNumber(e.target.value));
              }}
              placeholder="Phone number"
            />
          </div>
          <div className="Field">
            <label>
              Address <sup>{!isAddressValid && "*"}</sup>
            </label>
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setIsAddressValid(!!e.target.value);
              }}
              placeholder="Address"
            />
          </div>
          <div className="Field">
            <label>
              Password <sup>{password.isTouched && !isPasswordValid && "*"}</sup>
            </label>
            <input
              value={password.value}
              type="password"
              onChange={(e) => {
                const newPasswordValue = e.target.value;
                setPassword({ ...password, value: newPasswordValue });
                setIsPasswordValid(newPasswordValue.length >= 8);
                setIsConfirmPasswordValid(newPasswordValue === confirmPassword.value);
              }}
              onBlur={() => {
                setPassword({ ...password, isTouched: true });
              }}
              placeholder="Password"
            />
            {password.isTouched && password.value.length < 8 ? (
              <PasswordErrorMessage />
            ) : null}
          </div>
          <div className="Field">
            <label>
              Confirm Password <sup>{confirmPassword.isTouched && !isConfirmPasswordValid && "*"}</sup>
            </label>
            <input
              value={confirmPassword.value}
              type="password"
              onChange={(e) => {
                const newConfirmPasswordValue = e.target.value;
                setConfirmPassword({ ...confirmPassword, value: newConfirmPasswordValue });
                setIsConfirmPasswordValid(newConfirmPasswordValue === password.value);
              }}
              onBlur={() => {
                setConfirmPassword({ ...confirmPassword, isTouched: true });
              }}
              placeholder="Confirm Password"
            />
            {confirmPassword.isTouched && confirmPassword.value !== password.value ? (
              <ConfirmPasswordErrorMessage />
            ) : null}
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;

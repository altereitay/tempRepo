import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../EditProfile/EditProfile.css";

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

function EditProfile() {
  const nav = useNavigate();
  const [userData, setUserData] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [newPassword, setNewPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isTouched: false,
  });

  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token"); 
        const response = await fetch('/auth/getUserData', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        setUserData(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setAddress(data.address);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const getIsFormValid = () => {
    return (
      firstName && 
      lastName &&
      validateEmail(email) &&
      validatePhoneNumber(phoneNumber) &&
      address &&
      (newPassword.value.length === 0 || newPassword.value.length >= 8) &&
      (newPassword.value === confirmPassword.value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token')
    try {
      const response = await fetch('/auth/editProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          address: address,
          newPassword: newPassword.value
        })
      });

      if (!response.ok) {

        let errorMessage = 'Profile update failed';
  

        if (response.status === 400) {
          const errorData = await response.json();
          errorMessage = errorData.message;  
        }
        
        alert(errorMessage);  
      } else {
        const data = await response.json();
        sessionStorage.removeItem("token");
        sessionStorage.setItem("token", data.token);
        console.log(sessionStorage.getItem("token"));
        alert('Profile updated successfully');
        nav("/Home");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please try again.');  
    }
  };


  return (
    <div className="EditProfile">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Edit Profile</h2>

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
              New Password <sup>{newPassword.isTouched && !isNewPasswordValid && "*"}</sup>
            </label>
            <input
              value={newPassword.value}
              type="password"
              onChange={(e) => {
                const newNewPasswordValue = e.target.value;
                setNewPassword({ ...newPassword, value: newNewPasswordValue });
                setIsNewPasswordValid(newNewPasswordValue.length === 0 || newNewPasswordValue.length >= 8);
                setIsConfirmPasswordValid(newNewPasswordValue === confirmPassword.value);
              } }
              onBlur={() => {
                setNewPassword({ ...newPassword, isTouched: true });
              } }
              placeholder="New Password" />
            {newPassword.isTouched && newPassword.value.length < 8 && newPassword.value.length > 0 ? (
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
                setIsConfirmPasswordValid(newConfirmPasswordValue === newPassword.value);
              } }
              onBlur={() => {
                setConfirmPassword({ ...confirmPassword, isTouched: true });
              } }
              placeholder="Confirm Password" />
            {confirmPassword.isTouched && confirmPassword.value !== newPassword.value ? (
              <ConfirmPasswordErrorMessage />
            ) : null}
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Update Profile
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default EditProfile;

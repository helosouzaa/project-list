import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';


const MyProfileTitle = styled.h1`
color: #FF6767;
`;

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 50px 20px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const ProfileImageInput = styled.input`
  display: none;
`;

const ChangeImageButton = styled.label`
  background-color: #FF6767;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #FF4010;
  }
`;

const ProfileForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

const FormLabel = styled.label`
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 90%;
`;

const FormButton = styled.button`
  padding: 10px 20px;
  background-color: #FF6767;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #FF4010;
  }
`;

const MyProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    linkedin: '',
    age: '',
    github: '',
    currentRole: '',
    birthDate: new Date(),
    profileImage: '',
  });

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      birthDate: date,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        profileImage: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
  };

  return (
    <ProfileContainer>
      <MyProfileTitle>My Profile</MyProfileTitle>
      <ProfileImageContainer>
        <ProfileImage src={formData.profileImage} alt="Profile" />
        <ProfileImageInput
          type="file"
          id="profile-image"
          accept="image/*"
          onChange={handleImageChange}
        />
        <ChangeImageButton htmlFor="profile-image">
          Choose Image
        </ChangeImageButton>
      </ProfileImageContainer>
      <ProfileForm onSubmit={handleSubmit}>
        <div>
          <FormLabel htmlFor="fullName">Full Name</FormLabel>
          <FormInput
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <FormLabel htmlFor="address">Address</FormLabel>
          <FormInput
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <FormLabel htmlFor="linkedin">LinkedIn</FormLabel>
          <FormInput
            type="text"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel htmlFor="age">Age</FormLabel>
          <FormInput
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          <FormLabel htmlFor="github">GitHub</FormLabel>
          <FormInput
            type="text"
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />
          <FormLabel htmlFor="currentRole">Current Role</FormLabel>
          <FormInput
            type="text"
            id="currentRole"
            name="currentRole"
            value={formData.currentRole}
            onChange={handleChange}
          />
        </div>
        <FormButton type="submit">Save</FormButton>
      </ProfileForm>
    </ProfileContainer>
  );
};

export default MyProfile;

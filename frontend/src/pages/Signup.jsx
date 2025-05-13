import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import API from '../api/api';
import { FaArrowLeft, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import bgImage from '../assets/landing-bg.jpg';

const Background = styled.div`
  height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
              url(${bgImage}) no-repeat center center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BackArrow = styled(Link)`
  position: absolute;
  top: 30px;
  left: 30px;
  color: white;
  font-size: 24px;
  text-decoration: none;
  transition: 0.2s ease;

  &:hover {
    transform: scale(1.1);
    color: #ffb6c1;
  }
`;

const GlassCard = styled.div`
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
  color: white;
  text-align: center;
  width: 100%;
  max-width: 400px;
  position: relative;
  animation: floatUp 0.8s ease-out;

  @keyframes floatUp {
    from {
      transform: translateY(40px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;


const InputWrapper = styled.div`
  position: relative;
  margin: 12px 0;
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: #ddd;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 16px;

  &::placeholder {
    color: #ddd;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background: #ff69b4;
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 8px #ff69b4;

  &:hover {
    background: #ff85c1;
    box-shadow: 0 0 16px #ff69b4;
  }
`;

const SmallText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #f0f0f0;

  a {
    color: #ffb6c1;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', form);
      alert("Signup successful! Please login.");
      navigate('/home');
    } catch (err) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <Background>
      <BackArrow to="/">
        <FaArrowLeft />
      </BackArrow>
      <GlassCard>
        <h2>Create an Account 🌸</h2>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Icon><FaUser /></Icon>
            <Input
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <Icon><FaEnvelope /></Icon>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <Icon><FaLock /></Icon>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </InputWrapper>

          <Button type="submit">Signup</Button>
        </form>
        <SmallText>
          Already have an account? <Link to="/login">Login</Link>
        </SmallText>
      </GlassCard>
    </Background>
  );
};

export default Signup;

import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import bgImage from '../assets/landing-bg.jpg';

const Background = styled.div`
  height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
              url(${bgImage}) no-repeat center center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 60px 20px;
  color: white;
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

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 40px;
  text-align: center;
  color: #fff;
`;

const glow = keyframes`
  0% { text-shadow: 0 0 10px #ff69b4, 0 0 20px #ff69b4, 0 0 30px #ff69b4; }
  50% { text-shadow: 0 0 20px #ff85c1, 0 0 30px #ff85c1, 0 0 40px #ff85c1; }
  100% { text-shadow: 0 0 10px #ff69b4, 0 0 20px #ff69b4, 0 0 30px #ff69b4; }
`;

const Feature = styled.p`
  font-size: 20px;
  margin: 16px 0;
  color: #fff;
  animation: ${glow} 2.5s ease-in-out infinite;
  text-align: center;
`;

const Features = () => {
  const featureList = [
    "🎭 Multiple Genres & Tones",
    "🎨 Creative Prompts & Story Starters",
    "🌍 Multilingual Storytelling",
    "💾 Save & Export Your Stories",
    "📝 Edit, Rewrite & Expand Features",
    "📱 Mobile-Friendly Interface",
    "🚀 Upcoming: Voice-to-Story Input",
    "✨ Upcoming: Collaborative Story Building"
  ];

  return (
    <Background>
      <BackArrow to="/">
        <FaArrowLeft />
      </BackArrow>
      <Title>🚀 Upcoming Features</Title>
      {featureList.map((item, index) => (
        <Feature key={index}>{item}</Feature>
      ))}
    </Background>
  );
};

export default Features;

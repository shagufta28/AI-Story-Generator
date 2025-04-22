import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import bgImage from '../assets/landing-bg.jpg'; // Add your image in assets folder

// 👇 Floating animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url(${bgImage}) no-repeat center center/cover;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  color: white;
  font-weight: bold;
  font-size: 20px;
`;

const NavLinks = styled.div`
  a {
    color: white;
    margin-left: 20px;
    text-decoration: none;
    font-size: 16px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 10px rgba(0,0,0,0.6);
  animation: ${fadeIn} 3s ease-in-out forwards;

`;

const SubTitle = styled.p`
  font-size: 24px;
  max-width: 600px;
  margin-bottom: 40px;
  text-shadow: 1px 1px 8px rgba(0,0,0,0.5);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const GlassButton = styled(Link)`
  padding: 14px 32px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-weight: bold;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
  text-decoration: none;
  transition: 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Landing = () => {
  return (
    <Container>
      <Navbar>
        <div>🌸 Blossom AI</div>
        <NavLinks>
          <Link to="/features">Features</Link>
        </NavLinks>
      </Navbar>

      <Content>
        <Title>Blossom AI</Title>
        <SubTitle>Create beautiful, genre-based stories with the power of AI. Spark your imagination in seconds.</SubTitle>
        <ButtonContainer>
          <GlassButton to="/login">Login</GlassButton>
          <GlassButton to="/signup">Signup</GlassButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
};

export default Landing;

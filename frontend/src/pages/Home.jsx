import { useState } from 'react';
import API from '../api/api';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

// Styled Components

const Navbar = styled.header`
padding: 20px;
box-shadow: none;
  display: flex;
  justify-content: space-between;
  color: black;
`;

const Container = styled.div`
  padding: 1px;
  position: relative;
  min-height: 87.2vh;
  background: ${(props) => `url(${props.bgImage})`} no-repeat center center fixed;
  background-size: cover;
  color: white;
  font-family: 'Segoe UI', sans-serif;
`;

const ChatArea = styled.div`
  position: absolute;
  top: 80px; /* below navbar */
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1000px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 20px;
  height: 65vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatBubble = styled.div`
  padding: 12px 16px;
  max-width: 70%;
  border-radius: 16px;
  background-color: ${(props) => (props.isUser ? '#ff69b4' : '#fff')};
  color: ${(props) => (props.isUser ? '#fff' : '#000')};
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const PromptContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  padding: 15px 20px;
  border-radius: 15px;
  width: 90%;
  max-width: 1000px;
  box-shadow: 0 0 20px #ffb6c1;
  z-index: 2;
`;

const Input = styled.input`
  padding: 12px;
  margin: 10px 0;
  border-radius: 6px;
  border: none;
  width: 60%;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 6px;
  border: none;
  width: 30%;
  font-size: 16px;
`;

const Button = styled.button`
  margin-top: 12px;
  padding: 12px 24px;
  background-color: #ff69b4;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ff85c1;
  }
`;

// Genre background URLs
const genreBackgrounds = {
  adventure: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  romance: 'https://images.unsplash.com/photo-1579591040860-5ff626017cfa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'sci-fi': 'https://images.unsplash.com/photo-1581090700227-1e8d40e8cda4',
  fantasy: 'https://images.unsplash.com/photo-1610878180933-d0fc75b6fd07',
  mystery: 'https://images.unsplash.com/photo-1531251445707-1f000e1e87d0',
  horror: 'https://images.unsplash.com/photo-1508779018996-6b24f2eebc03',
  comedy: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238',
  thriller: 'https://images.unsplash.com/photo-1504198266285-165a15a58f06',
  'fairy-tale': 'https://images.unsplash.com/photo-1549887534-57e3e9b0f875',
};

const Home = () => {
  const navigate = useNavigate();
  
    const logout = () => {
      localStorage.removeItem('token');
      navigate('/');
    };
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('adventure');
  const [story, setStory] = useState('');
  const [previousStories, setPreviousStories] = useState([]);

  const handleGenerate = async () => {
    const newUserMessage = { text: prompt, genre, isUser: true };
    setPreviousStories((prev) => [...prev, newUserMessage]);
  
    const res = await API.post('/stories/generate', { prompt, genre });
    const newStory = res.data.content;
  
    const newBotMessage = { text: newStory, genre, isUser: false };
    setPreviousStories((prev) => [...prev, newBotMessage]);
  
    setPrompt('');
  };

  return (
    <>
       <Navbar>

       <div>🌸 Blossom AI</div>
            <nav>
             <Button onClick={logout}>Logout</Button>
            </nav>
       </Navbar>
          
      <Container bgImage={genreBackgrounds[genre]}>
        <ChatArea>
          {previousStories.map((story, index) => (
            <ChatBubble key={index} isUser={story.isUser}>
              {story.text}
            </ChatBubble>
          ))}
        </ChatArea>

        <PromptContainer>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What's on your mind?"
          />
          <Select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="adventure">Adventure</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="fantasy">Fantasy</option>
            <option value="mystery">Mystery</option>
            <option value="horror">Horror</option>
            <option value="comedy">Comedy</option>
            <option value="thriller">Thriller</option>
            <option value="fairy-tale">Fairy Tale</option>
          </Select>
          <Button onClick={handleGenerate}>Generate</Button>
        </PromptContainer>
      </Container>
    </>
  );
};

export default Home;

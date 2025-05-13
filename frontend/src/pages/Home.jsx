import { useState, useEffect } from 'react';
import API from '../api/api';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';



// Styled Components
const Navbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: #1e1e2f;
  color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  font-size: 20px;
  font-weight: bold;
`;

const Logo = styled.div`
  font-family: 'Pacifico', cursive;
  font-size: 28px;
  color: #ff85c1;
`;

const LogoutBtn = styled.button`
  background: #ff69b4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #ff85c1;
  }
`;

const Container = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)),
              url(${(props) => props.bgImage}) no-repeat center center/cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  font-family: 'Segoe UI', sans-serif;
`;

const ChatArea = styled.div`
  flex: 1;
  max-height: 72vh;
  margin-top: -100px;
  overflow-y: auto;
  display: flex; /* Important */
  flex-direction: column; /* Important */
  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  backdrop-filter: blur(5px);
`;

const ChatBubble = styled.div`
  background-color: ${(props) => (props.isUser ? '#ff69b4' : 'white')};
  color: ${(props) => (props.isUser ? 'white' : 'black')};
  padding: 12px 20px;
  margin-bottom: 10px;
  border-radius: 20px;
  max-width: 75%;
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const PromptForm = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  padding: 15px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 6px;
  font-size: 16px;
  border: none;
`;

const Button = styled.button`
  background-color: #ff69b4;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ff85c1;
  }
`;

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
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('adventure');
  const [previousStories, setPreviousStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('prompt'); // Remove prompt from localStorage on logout
    navigate('/');
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await API.get('/stories');
        const stories = res.data;

        // Format for rendering (if needed)
        const formatted = stories.flatMap(story => ([
          { text: story.prompt, genre: story.genre, isUser: true, id: story._id },
          { text: story.content, genre: story.genre, isUser: false, id: story._id }
        ]));

        setPreviousStories(formatted);
      } catch (error) {
        console.error('Failed to load stories:', error);
      }
    };

    fetchStories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/stories/${id}`);

      const updated = previousStories.filter(story => story.id !== id);
      setPreviousStories(updated);
    } catch (error) {
      console.error('Failed to delete story:', error);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await API.post('/stories/generate', { prompt, genre });

      const { content, _id } = res.data;

      const formatted = [
        { text: prompt, genre, isUser: true, id: _id },
        { text: content, genre, isUser: false, id: _id }
      ];

      setPreviousStories(prev => [...prev, ...formatted]);
    } catch (error) {
      setPreviousStories(prev => [...prev, { text: '❌ Error generating story', isUser: false }]);
    }

    setPrompt('');
    setLoading(false);
  };



  return (
    <>
      <Navbar>
        <Logo>🌸 Blossom AI</Logo>
        <LogoutBtn onClick={logout}>Logout</LogoutBtn>
      </Navbar>

      <Container bgImage={genreBackgrounds[genre]}>
        <ChatArea>

          {previousStories.map((story, index) => (
            story.isUser ? (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '8px', // spacing between bubble and button
                  marginBottom: '10px'
                }}
              >
                <ChatBubble isUser={story.isUser}>
                  {story.text}
                </ChatBubble>
                <button
                  onClick={() => handleDelete(story.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                  title="Delete"
                >
                  <MdDelete size={22} />
                </button>
              </div>
            ) : (
              <ChatBubble key={index} isUser={story.isUser}>
                {story.text}
              </ChatBubble>
            )
          ))}


          {loading && (
            <div style={{ color: 'white', textAlign: 'center', marginBottom: '10px', fontStyle: 'italic' }}>
              🌸 Generating story, please wait...
            </div>
          )}
        </ChatArea>

        <PromptForm>
          <Input
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              localStorage.setItem('prompt', e.target.value); // Store the prompt in localStorage on change
            }}
            placeholder="Start your story..."
          />
          <Select value={genre} onChange={(e) => setGenre(e.target.value)}>
            {Object.keys(genreBackgrounds).map((g) => (
              <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
            ))}
          </Select>
          <Button onClick={handleGenerate}>Generate</Button>
        </PromptForm>
      </Container>
    </>
  );
};

export default Home;

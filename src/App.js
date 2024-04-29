import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>กดเพื่ออเข้าสู่หน้าล็อกอิน</Button>
    </div> 
  );
}

export default App;

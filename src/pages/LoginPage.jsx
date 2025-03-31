import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../features/auth/LoginForm';

const LoginPage = () => {
  const { token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to users page if already logged in
    if (token) {
      navigate('/users');
    }
  }, [token, navigate]);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

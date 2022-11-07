import { useEffect, useState } from 'react';
import axios from '../config/axios';

export default function useMessage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadFromApi = async () => {
      const { data } = await axios.get('/');
      setMessage(data.message);
    };

    loadFromApi();
  }, []);

  return message;
}

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CharacterPage = () => {
  const params = useParams();
  const username = params?.username;
  const [decodedUsername, setDecodedUsername] = useState('');
  console.log(params);

  useEffect(() => {
    if (typeof username === 'string') {
      setDecodedUsername(decodeURIComponent(username));
    }
  }, [username]);

  return (
    <div>
      <h1>Character Page</h1>
      <p>Username: {decodedUsername}</p>
    </div>
  );
};

export default CharacterPage;

import axios from 'axios';
import md5 from 'md5';

const PUBLIC_KEY = '05055e60346d1b1668ad50134bcbabd4';
const PRIVATE_KEY = '17f5d4f21719eb6d670b0db4cde5a61d6164dfe8';

const BASE_URL = 'https://gateway.marvel.com/v1/public';

const createHash = (timestamp: number) =>
  md5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`);

// export const fetchCharacterById = async (characterId: number) => {
//   const timestamp = new Date().getTime();
//   const hash = createHash(timestamp);
//
//   const response = await axios.get(`${BASE_URL}/characters/${characterId}`, {
//     params: {
//       ts: timestamp,
//       apikey: PUBLIC_KEY,
//       hash,
//     },
//   });
//   return response.data.data.results[0];
// };

export const fetchCharacters = async (offset: number = 0) => {
  const timestamp = new Date().getTime();
  const hash = createHash(timestamp);

  const response = await axios.get(`${BASE_URL}/characters`, {
    params: {
      ts: timestamp,
      apikey: PUBLIC_KEY,
      hash,
      offset,
    },
  });
  return response.data.data.results;
};

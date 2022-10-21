import axios from 'axios';

const BSAE_URL = 'https://pixabay.com/api/';
const API_KEY = '29456311-382a1305bbd043c4ca5789a17';

async function fetchPixabay(q, page) {
  try {
    return await axios.get(BSAE_URL, {
      params: {
        key: API_KEY,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: false,
        per_page: 12,
        page,
      },
    });
  } catch (e) {
    alert(`Oops, error ${e.message}, there is no img with that name`);
  }
}

export default fetchPixabay;

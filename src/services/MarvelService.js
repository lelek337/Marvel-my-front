

class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = '4f3a58ea382fe22665fa6024b1f29ffa';

  getResurce = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = () => {
    return this.getResurce(`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`);
  }

  getCharacter = (id) => {
    return this.getResurce(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
  }
}

export default MarvelService;
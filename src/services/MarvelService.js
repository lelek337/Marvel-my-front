

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

  getAllCharacters = async () => {
    const res = await this.getResurce(`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const res = await this.getResurce(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {
    const noInformation = 'There is no information about this character'
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : noInformation,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }
}

export default MarvelService;
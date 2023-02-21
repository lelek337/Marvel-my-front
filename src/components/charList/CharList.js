import { Component } from 'react';

import './charList.scss';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        characters: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    charactersItem = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
    }

    componentDidMount() {
        this.charactersItem();
    }

    onCharLoaded = (characters) => {
        this.setState({
            characters, 
            loading: false
        })
    }

    charItems(characters) {
        return characters.map(elem => {
            return(
                <li 
                    className="char__item char__item_selected" 
                    key={elem.id}
                    onClick={() => this.props.onCharSelected(elem.id)}>
                        <img 
                            src={elem.thumbnail} 
                            alt="abyss"
                            styles={{objectFit: elem.thumbnail ? 'cover' : 'contain'}}/>
                        <div className="char__name">{elem.name}</div>
                </li>
            )
        })
    }

    render() {
        const {characters, loading} = this.state;
        const carItems = loading ? <Spinner/> : this.charItems(characters)
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {carItems}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }  
}



export default CharList;
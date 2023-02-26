import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1560,
        charEnded: false,
    }

    marvelService = new MarvelService();

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharLoaded)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    componentDidMount() {
        this.onRequest();
    }

    onCharLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }

        this.setState(({characters, offset}) => ({
            characters: [...characters, ...newCharacters], 
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    myItemsRefs = []
    myRef = (ref) => {
        this.myItemsRefs.push(ref);
    }

    newShadow = (id) => {
        console.log('hi from newShadou', this.myItemsRefs[id]);
        this.myItemsRefs.forEach(elem => elem.classList.remove('char__item_selected'));
        this.myItemsRefs[id].classList.add('char__item_selected');
        this.myItemsRefs[id].focus();
    }

    charItems(characters) {
        return characters.map((elem, index) => {
            return(
                <li
                    tabIndex={0}
                    ref={this.myRef} 
                    className="char__item " 
                    key={elem.id}
                    onClick={() => {
                        this.props.onCharSelected(elem.id);
                        this.newShadow(index);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(elem.id);
                            this.newShadow(index);
                        }
                    }}>
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
        const {characters, loading, offset, newItemLoading, charEnded} = this.state;
        const carItems = loading ? <Spinner/> : this.charItems(characters)
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {carItems}
                </ul>
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : "block"}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }  
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}


export default CharList;
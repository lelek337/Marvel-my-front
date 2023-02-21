import { Component } from 'react';

import './charInfo.scss';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.updataChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updataChar();
        }
    }

    marveiService = new MarvelService();

    updataChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoding();

        this.marveiService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false
        })
    }

    onCharLoding = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({ 
            loading: false,
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    } 
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    const comicsRender = () => {
        return comics.slice(0, 10).map((item, i) => {
            return (
                <li className="char__comics-item" key={i}>
                    {item.name}
                </li>
            )
        })
    }

    return (
        <>
            <div className="char__basics">
                <img 
                    src={thumbnail} 
                    alt={name}
                    styles={{objectFit: thumbnail ? 'cover' : 'contain'}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length ? comicsRender() : 'This character has no comics'
                }
            </ul>
        </>
    )
}

export default CharInfo;
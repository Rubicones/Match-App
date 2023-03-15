import './movie.css'
import { Component } from 'react'
import TDMBService from '../services/TDMBService'

const tDMBService = new TDMBService()

const ResultBox = (props) => {
    return (
        <div className="resultBox">
            {props.array}
        </div>
    )
}

const SearchItem = (props) => {
    const posterUrl = () => {
        return "https://image.tmdb.org/t/p/original/" + props.posterPath
    }

    const crewRequest = async (movieId) => {
        let castMembers = []
        
        await tDMBService.crewRequest(movieId).then(res => {
            castMembers = res.cast.map(item => {
                let portrait = "https://www.pngfind.com/pngs/m/2-24590_question-mark-clipart-unknown-female-silhouette-question-mark.png    "  
                if (item.profile_path != null)
                    portrait = "https://image.tmdb.org/t/p/original" + item.profile_path              
                return {name: item.name, character: item.character, portraitUrl: portrait}
            })
        })

        return castMembers
    }
    
    return (
        <li onMouseDown={(e) => {
            e.preventDefault()
            props.setMovie(posterUrl(), props.movieTitle, crewRequest(props.movieId))
        }}> 
            {props.item} 
        </li>
    )
}

class Movie extends Component {
    constructor (props) {
        super(props)
        this.state = {
            visibleData: [],
            searchString: "",
            isSearchActive: false,
            posterPath: "",
            movieTitle: "",
            isMovieSelected: false
        }
    }

    focusChange = () => {
        this.setState(({isSearchActive}) => ({isSearchActive: !isSearchActive}))
    }

    setMovie = (posterUrl, movieTitle) => {
        let posterUrlString = "" + posterUrl + ""
        this.setState({
            posterPath: posterUrlString,
            movieTitle: movieTitle,
            searchString: "",
            visibleData: []
        }, () => {
            if (!this.state.isMovieSelected){
                this.setState({isMovieSelected: true})
                this.props.onMovieSelect()
            }
        })
    }

    updateVisibleDataSate = (results) => {
        let titles = []

        results.forEach(movie => {
            titles.push(movie)
            this.setState(({
                visibleData: titles.map((item, i) => {
                    return <SearchItem 
                    key={i}
                    item={item.original_title} 
                    posterPath={item.poster_path} 
                    movieTitle={item.original_title}
                    movieId={item.id}
                    setMovie={(posterUrl, movieTitle, crewList) => {
                        this.setMovie(posterUrl, movieTitle)
                        this.props.setActors(crewList)
                    }}/>
                })
            }))
        })
    }

    updateItems = (e) => {
        let value = e.target.value

        this.setState(() => ({
            visibleData: [],
            searchString: e.target.value
        }))

        if (value.length > 0) {
            tDMBService.searchRequest(value)
            .then(res => {this.updateVisibleDataSate(res.results)})
        }
    }
    
    render () {
        const {movieTitle, posterPath, isSearchActive, visibleData} = this.state
        let isSearchActiveClass = isSearchActive ? " active" : ""
        const setPosterStyle = {
            backgroundImage: posterPath,
        }

        return (
            <div className="movieWrapper">
                <div className="movieContainer">
                    <div className={"searchInput" + isSearchActiveClass}>
                        <input 
                        type="text" 
                        placeholder="Start typing" 
                        onChange={(e) => {this.updateItems(e)}}
                        onFocus={this.focusChange}
                        onBlur={this.focusChange}
                        value={this.state.searchString}
                        />
                        <ResultBox array={visibleData}/>
                    </div>
                </div>
                <div className="movieCoverWrapper">
                    <img src={posterPath} style={setPosterStyle}/>
                </div>
                <h3>{movieTitle}</h3>
            </div>
        )
    }
}

export default Movie
import './App.css';
import {Component} from 'react';
import MatchedActor from './matchedActor/matchedActor';
import Movie from './movie/movie';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      actors: [],
      left: [],
      right: [],
      isDiffed: false
    }
  }

  onBothFilmsSelected = () => {
    const {left, right} = this.state
    const newActors = []
    if (left.length > 0 && right.length > 0) {
      left.forEach((leftElem, i) => {
        right.forEach((rightElem, j) => {
          if (rightElem.name === leftElem.name) {
            newActors.push(
              <MatchedActor 
              name={leftElem.name} 
              characterLeft={leftElem.character} 
              characterRight={rightElem.character} 
              portraitUrl={leftElem.portraitUrl}
              key={i.toString() + j.toString()}/>
            )
          }
        })
      })

      if (newActors.length > 0){
        this.setState(({
          isDiffed: true
        }))
      } else {
        this.setState(({
          isDiffed: false
        }))
      }
      this.setState(({
        actors: newActors.map(item => item)
      }))
    }

  }

  setActors = (crewListPromise, side) => {
    crewListPromise.then(res => {
      this.setState({
        [side]: res.map((actor) => {
          return {name: actor.name, character: actor.character, portraitUrl: actor.portraitUrl}
        })
        }, () => {this.onBothFilmsSelected()})
    })
  }

  onMovieSelect = () => {
    this.setState(({selectedMoviesCount}) => ({
      selectedMoviesCount: selectedMoviesCount + 1
    }))
  }

  
  render () {
    const {actors, isDiffed} = this.state    

    return (
      <>
        <header>
          <h1 id='title' style={{marginBottom: 0, marginTop: 0}}>Match!</h1>
          <h5 id="subtitle" style={{marginBottom: "30px", color: "rgba(255, 255, 255, 0.583)", marginTop: 0}}>Find intersection of actors in your favorite films</h5>
        </header>
        
        <div className="main">
          <div className="container-fluid">
          <div className="row">
            <div className="col-xl-4">
              <div className="movieBlock" data-side="left">
                <Movie setActors={(crewListPromise) => this.setActors(crewListPromise, "left")} onMovieSelect={this.onMovieSelect} />
              </div>
            </div>
          
          {
            isDiffed ? 
              <div className="col-xl-4">
                <div className="actorsMatched">
                    {actors}
                </div> 
              </div>
            :
            <div className="col-xl-4" >
              <div className="mainMessageContainer">
                <h1 className='mainMessage'>These movies don't have intersection</h1>
              </div>
            </div>
          }
              <div className="col-xl-4">
                <div className="movieBlock" data-side="right">
                  <Movie setActors={(crewListPromise) => this.setActors(crewListPromise, "right")} onMovieSelect={this.onMovieSelect} />
                </div>
              </div>
          </div>
          </div>
        </div>

      </>
    );
  }
}

export default App;

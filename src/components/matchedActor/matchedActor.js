import './matchedActor.css'

const MatchedActor = (props) => {
    return (
        <div className="matchedActorsWrapper">
            <h5>{props.name}</h5>
            <div className="matchedActorInfoWrapper">
                <div className="actorInfo">
                    <h5 id='name'>Character</h5>
                    <h5 id='character'>{props.characterLeft.length > 50 ? props.characterLeft.slice(0, 50) + "..." : props.characterLeft}</h5>
                </div>
                <div className="actorPhotoWrapper">
                    <img className="actorPhoto" src={props.portraitUrl}/>
                </div>
                <div className="actorInfo">
                    <h5 id='name'>Character</h5>
                    <h5 id='character'>{props.characterRight}</h5>
                </div>
            </div>
        </div>
    )
}

export default MatchedActor
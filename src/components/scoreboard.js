import { yahtzee } from "../util/yahtzeeCalc"
import { bonus } from "../util/yahtzeeCalc"

export default function ScoreBoard(props)
{

    const selectedStyle = {
        backgroundColor : "#70F586"
    }

    const normalStyle = {
        backgroundColor : "#FFFFFF"
    }

    const lockedStyle = {
        backgroundColor : "#FF0000"
    }
    var scores = []
    const scoreSheet = props.data.map(dat => {
        const style = dat.lockedIn ? lockedStyle : dat.selected ? selectedStyle : normalStyle
        scores.push(dat.calc(props.diceData, props.data))
        return (
        <div className="scoreboard-section" onClick={() => props.select(dat.id)}>
            <div className="scoreboard-section-title">
                {dat.title}
            </div>
            <div 
                className="scoreboard-section-score" 
                style={style}
            >
                {dat.lockedIn ? dat.score : dat.calc(props.diceData, props.data)}
            </div>
        </div>
        )
    })

    const bonusVal = bonus(props.data)

    return (
        <div className="scoreboard">
            {scoreSheet}
            <div className="scoreboard-seperator">
                ----
            </div>
            <div className="scoreboard-section">
                <div className="scoreboard-section-title">
                    Bonus
                </div>
                <div className="scoreboard-section-score">
                    {bonusVal}
                </div>
            </div>
            <div className="scoreboard-section">
                <div className="scoreboard-section-title">
                    Total
                </div>
                <div className="scoreboard-section-score">
                    {props.total + bonusVal}
                </div>
            </div>
            <button onClick={() => props.lockIn(scores)} className="action-button-score">
                Lock In!
            </button>
            {
                /*yahtzee(props.diceData) === 50 && 
                props.data[11].score >= 50 && 
                <button className="action-button-score" onClick={props.double}>Double Yahtzee!</button>*/
            }
        </div>
    )
  }
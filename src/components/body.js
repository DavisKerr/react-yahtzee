import Dice from "./dice"
import React from "react"
import ScoreBoard from "./scoreboard"
import scoreData  from "../modelData/scoreData"
import { buildFreq } from "../util/yahtzeeCalc"
import { bonus } from "../util/yahtzeeCalc"

export default function Body()
{
    //Constant Vars
    const numRolls = 3
    const numDice = 5


    // State Declarations
    const [diceArr, updateDiceArr] = React.useState([])
    const [gameOver, updateGameOver] = React.useState(false)
    const [score, updateScore] = React.useState(scoreData)
    const [rollAnim, updateRollAnim] = React.useState(true)
    const [rolls, updateRolls] = React.useState(numRolls)
    const [freqMap, updateFreqMap] = React.useState(new Map())
    const [total, updateTotal] = React.useState(0)


    function doubleYahtzee()
    {
        updateScore(prev => {
            return prev.map(vals => {
                updateRolls(numRolls)
                resetDice()
                    
                return {
                    ...vals,
                    score : vals.id === 11 ? vals.score + 100 : vals.score,
                    selected : false
                }
            })
        })
    }

    function lockInSelection(newScore)
    {
        updateScore(prev => {
            return prev.map(vals => {
                if(vals.selected)
                {
                    updateRolls(numRolls)
                    resetDice()
                }
                    
                return {
                    ...vals,
                    lockedIn : vals.selected ? true : vals.lockedIn,
                    score : vals.selected ? newScore[vals.id] : vals.score,
                    selected : false
                }
            })
        }) 
    }

    function toggleScore(id)
    {
        updateScore(prev => {
            return prev.map(vals => {
                return {
                    ...vals,
                    selected : vals.id === id && !vals.lockedIn ? !vals.selected : false
                }
            })
        })
    }

    function resetDice()
    {
        var arr = []
        for(var i = 0; i < numDice; i++)
        {
            arr.push({
                id : i,
                num: Math.floor(Math.random() * 600) % 6 + 1,
                static : false,
                justClicked : false
            });
        }

        updateDiceArr(arr)
    }

    function resetGame()
    {
        updateScore(scoreData)
        var arr = []
        for(var i = 0; i < numDice; i++)
        {
            arr.push({
                id : i,
                num: Math.floor(Math.random() * 600) % 6 + 1,
                static : false,
                justClicked : false
            });
        }
            
        updateGameOver(false)
        updateDiceArr(arr)
    }

    function checkGameOver()
    {
        var newGameOver = true
        for(var i = 0; i < score.length; i++)
        {
            if(!score[i].lockedIn)
                newGameOver = false
        }
        updateGameOver(newGameOver)
        updateRollAnim(true)
    }

    function roll()
    {  
        if(rolls > 0 && !gameOver)
        {
            updateRolls(prev => prev - 1)
            updateRollAnim(false)
            updateDiceArr(prev => {
                return prev.map(val => {
                    return {
                        ...val,
                        num : val.static ? val.num : Math.floor(Math.random() * 600) % 6 + 1,
                        justClicked : false
                    }
                })
            })
        }

    }
    function freezeFunc(id)
    {
        updateDiceArr(prev => {
            return prev.map(vals => {
                return {
                    ...vals,
                    static : vals.id === id ? !vals.static : vals.static,
                    justClicked : true

                }
            })
        })
    }



    // Effects

    React.useEffect(function(){
        updateFreqMap(buildFreq(diceArr))
    }, [diceArr])

    React.useEffect(function(){
        resetGame()
    }, [])

    React.useEffect(function(){
        if(diceArr.length > 0)
        {
            checkGameOver()
        }
    }, [diceArr])

    React.useEffect(function() {
        var newTotal = 0
        for(var i = 0; i < score.length; i++)
        {
            if(score[i].lockedIn)
                newTotal += score[i].score
        }

        updateTotal(newTotal)
    }, [score])

    
    //Dice 
    var diceElem = diceArr.map(die => {
        return <Dice val={die} freeze={freezeFunc} key={die.id} rollAnimation={rollAnim}/>
    })

    return (
        <div className="body">
            <div className="game-window">
                <ScoreBoard 
                    data={score}
                    diceData={freqMap} 
                    select={toggleScore}
                    lockIn={lockInSelection}
                    total={total}
                    double={doubleYahtzee}
                />
                <div className="game-holder">
                    <div className="top-message">
                        <h1>{gameOver ? "GAME OVER" : " "}</h1>
                    </div>
                    <div className="score">{gameOver ? "Final Score: " + (total + bonus(score)): "Rolls Left:" + rolls}</div>
                    <div className="dice-holder">
                        {diceElem}
                    </div>
                    <button onClick={roll} className="action-button">Roll</button>
                    {gameOver && <button onClick={resetGame} className="action-button">Play Again</button>}
                </div>
            </div>
        </div>
    )
}

export function buildFreq(dice)
{
    var valMap = new Map([
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0]
    ])
    for(var i = 0; i < dice.length; i++)
    {
        var val = dice[i].num
        valMap.set(val, valMap.get(val) + 1)
    }

    return valMap
}

export function ones(dice, data)
{
    return dice.get(1) === 5 && data[11].score === 50 ? 100 : dice.get(1)
}

export function twos(dice, data)
{
    return dice.get(2) === 5 && data[11].score === 50 ? 100 : dice.get(2) * 2
}

export function threes(dice, data)
{
    return dice.get(3) === 5 && data[11].score === 50 ? 100 : dice.get(3) * 3
}

export function fours(dice, data)
{
    return dice.get(4) === 5 && data[11].score === 50 ? 100 : dice.get(4) * 4
}

export function fives(dice, data)
{
    return dice.get(5) === 5 && data[11].score === 50 ? 100 : dice.get(5) * 5
}

export function sixes(dice, data)
{
    return dice.get(6) === 5 && data[11].score === 50 ? 100 : dice.get(6) * 6
}

export function threeOfaKind(dice, data)
{
    var valid = false;
    var total = 0
    console.log(data)

    for(var i = 1; i <= 6; i++)
    {
        total += dice.get(i) * i
        if(dice.get(i) >= 3)
        {
            
            valid = true
        }

        if(dice.get(i) === 5 && data[i - 1].lockedIn && data[11].score === 50)
            return 100
    }

    return valid ? total : 0
}

export function fourOfaKind(dice, data)
{
    var valid = false;
    var total = 0

    for(var i = 1; i <= 6; i++)
    {
        total += dice.get(i) * i
        if(dice.get(i) >= 4)
        {
            valid = true
        }
        if(dice.get(i) === 5 && data[i - 1].lockedIn && data[11].score === 50)
            return 100
    }

    return valid ? total : 0
}

export function fullHouse(dice, data)
{
    var twoCount = 0
    var threeCount = 0
    for(var i = 1; i <= 6; i++)
    {
        if(dice.get(i) === 2)
            twoCount = 1
        else if(dice.get(i) === 3)
            threeCount = 1
        
        if(dice.get(i) === 5 && data[i - 1].lockedIn && data[11].score === 50)
            return 100
    }
    return (twoCount + threeCount) === 2 ? 25 : 0
}

export function smallStraight(dice, data)
{
    var counter = 0

    for(var i = 1; i <= 6; i++)
    {
        if(dice.get(i) > 0)
            counter += 1
        else if(counter < 4)
            counter = 0
        if(dice.get(i) === 5 && data[i - 1].lockedIn && data[11].score === 50)
            return 100
    }

    return counter >= 4 ? 30 : 0
}

export function largeStraight(dice, data)
{
    var counter = 0

    for(var i = 1; i <= 6; i++)
    {
        if(dice.get(i) > 0)
            counter += 1
        else if(counter < 5)
            counter = 0
        
        if(dice.get(i) === 5 && data[i - 1].lockedIn && data[11].score === 50)
            return 100
    }

    return counter >= 5 ? 40 : 0
}

export function yahtzee(dice, data)
{
    var valid = false;

    for(var i = 1; i <= 6; i++)
    {
        if(dice.get(i) >= 5)
        {
            valid = true
        }
    }

    return valid ? 50 : 0
}

export function bonus(score)
{
    var total = 0
    for(var i = 0; i < 6; i++)
    {
        total += score[i].score
    }
    return total >= 63 ? 35 : 0 
}

export function chance(dice, data)
{
    var total = 0

    for(var i = 1; i <= 6; i++)
    {
        total += dice.get(i) * i
    }

    return total
}

export function notImplemented(dice)
{
    return 0;
}
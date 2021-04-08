import { Button, Grid, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function AutoClickerTile({autoClicker, setClicksPerSecond, clicksPerSecond, setCash, cash}) {

    const [doublerCost, setDoublerCost] = useState(autoClicker.cost * 50)

    const [rank, setRank] = useState(1)

    const [thisClicker, setThisClicker] = useState({
        name: autoClicker.name,
        cost: autoClicker.cost,
        increment: autoClicker.increment,
        amount: autoClicker.amount
    })

    const handleBuy = () => {
        if (cash >= thisClicker.cost){
            setCash(cash - thisClicker.cost)
            setClicksPerSecond(clicksPerSecond + thisClicker.increment )
            setThisClicker({
                name: thisClicker.name,
                cost: Math.round(thisClicker.cost * 1.2),
                increment: thisClicker.increment,
                amount: thisClicker.amount + 1
            })

        }
    }
    const handleBuyDoubler = () => {
        if (cash >= doublerCost){
            setCash(cash - doublerCost)
            setClicksPerSecond(clicksPerSecond + (thisClicker.increment * thisClicker.amount))
            setThisClicker({
                name: thisClicker.name,
                cost: thisClicker.cost,
                increment: thisClicker.increment * 2,
                amount: thisClicker.amount
            })
            setDoublerCost(doublerCost * 3)
            setRank(rank + 1)

        }
    }

    return (
        <Grid>
            <Button 
                
                variant='contained'
                color='primary'
                onClick={handleBuy}>
                {thisClicker.name}
            </Button>
            <Typography>
                Cost: {thisClicker.cost}
            </Typography>
            <Typography>
                Amount: {thisClicker.amount}
            </Typography>
            <Typography>
                CPS: {thisClicker.increment * 50}
            </Typography>
            <Typography>
                Total CPS: {thisClicker.increment * 50 * thisClicker.amount}
            </Typography>
            <Toolbar/>
            <Grid>
                <Button 
                    variant='contained' 
                    onClick={handleBuyDoubler}
                    color='primary'>
                    Rank: {rank}
                </Button>
                <Typography>
                    Cost: {doublerCost}
                </Typography>
            </Grid>

            
        </Grid>
    );
}

export default AutoClickerTile;

import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import './App.css';
import AutoClickerTile from './AutoClickerTile';

function App() {

  
  const [cash,  setCash] = useState(0)
  const [clicksPerSecond, setClicksPerSecond] = useState(0)

  class AutoClicker{
    constructor(name, cost, increment){
      this.name = name;
      this.cost = cost;
      this.increment = increment;
      this.amount = 0
    }
  }
  const shortNumber = (number) => {
    number = Math.round(number)
    
    if (number.toString().length > 12){
        return Math.round(number / 1000000000000 * 100) / 100 + " Trillion"
    }
    if (number.toString().length > 9){
        return Math.round(number / 1000000000 * 100) / 100 + " Billion"
    }
    if (number.toString().length > 6){
        return Math.round(number / 1000000 * 100) / 100 + " Million"
    }
    if (number.toString().length > 3){
        return Math.round(number / 1000 * 100) / 100 + " Thousand"
    }
    return Math.round(number)
}

  const autoClicker1 = new AutoClicker('Lemonade Stand', 10, 0.02);
  const autoClicker2 = new AutoClicker('Dog Walker', 50, 0.1);
  const autoClicker3 = new AutoClicker('NewsPaper Stall', 250, 0.5)
  const autoClicker4 = new AutoClicker('Taxi', 1250, 2.5)

  const autoClickerArray = [autoClicker1, autoClicker2, autoClicker3, autoClicker4]

  const autoClickerNodes = autoClickerArray.map((autoClicker, index) => {
    return(
      <AutoClickerTile 
        setClicksPerSecond={setClicksPerSecond} 
        clicksPerSecond={clicksPerSecond}
        setCash={setCash}
        cash={cash}
        autoClicker={autoClicker}
        shortNumber={shortNumber}
        />
    )
  })



  useEffect(() => {
    const interval = setInterval(() => {
      setCash(cash => cash + clicksPerSecond)
      console.log('tick')
    }, 20);
    return () => clearInterval(interval);
  }, [cash]);

  const handleManualClick = () => {
    setCash(cash + 1) 
  }

  




  return (
   <>
    <AppBar>
      <Grid container justify='center'>
        <Typography variant='h3'>
          Money Tycoon
        </Typography>
      </Grid>
        

    </AppBar>
    <Toolbar/>
    <Grid class='App'>
      <h2>
        Cash: {shortNumber(cash)}
      </h2>
      <h3>
        Clicks per second: {shortNumber(clicksPerSecond * 50)}
      </h3>
      <Button onClick={handleManualClick} variant='contained'  color='primary'>
        Click Me
      </Button>
      <Toolbar/>
        <Grid 
          container
          justify='space-around' 
          >
          {autoClickerNodes}
        </Grid>
 
    </Grid>
   </>
  );
}

export default App;

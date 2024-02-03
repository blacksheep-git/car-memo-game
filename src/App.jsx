import React, { useState, useEffect} from 'react';
import './App.css';
import shuffle from './utilitites/shuffle';
import Card from './components/Card'
import Header from './components/Header'
import useAppBadge from './hooks/useAppBadge';

function App() {

  const [cards, setCards] = useState(shuffle);
  const [firstPick, setFirstPick] = useState(null); // Second card selected
  const [secondPick, setSecondPick] = useState(null); // First card selected
  const [disabled, setDisabled] = useState(false); // Delay between selections
  const [wins, setWins] = useState(0); // Number of wins  
  const [setBadge, clearBadge] = useAppBadge(); //Hook to handle app wins badge


  const handleClick = (card) => {
    if (!disabled){ // after enough delay  between plays
      firstPick? setSecondPick(card) : setFirstPick(card); //has the player made a first pick? if so, they just selected the second card, else this card is first selection
    }
  };

  const handleTurn = () => {
    setFirstPick(null);
    setSecondPick(null);
    setDisabled(false);
  };

  const handleNewGame = () => {
    setWins(0);
    clearBadge();
    handleTurn();
    setCards(shuffle);
  }

  useEffect(() => { // will run when first mounted and when 'cards', 'firstPick' or 'secondPick' change
    let pickTimer;

    if(firstPick && secondPick){ // two cards have been picked
      if(firstPick.image === secondPick.image) { // do these cards match?
        setCards((prevCards) => { 

          return prevCards.map((card) => { // go through the list of cards and set the cards matched to matched: true

            if(card.image === firstPick.image){
              return {...card, matched: true }; //return cards matching the first pick with the matched property set to true

            } else {

              return card;
            }
          });
        });
        handleTurn();
      } else { //cards picked do not match
        setDisabled(true);
        pickTimer = setTimeout(() => { //disable picks for a delay
          handleTurn(); // after delay, set both picks to null, and re-enable play
        }, 1000);
      }
    }

    return () => { //clear timout so there are no cnflicting timeouts between renders
      clearTimeout(pickTimer);
    };

  }, [cards, firstPick, secondPick]);



  useEffect(() => {
    const won = cards.filter((card) => !card.matched);

    if (cards.length && won.length < 1){ // if won
      console.log('You Won! x ' + wins );
      setWins(wins+1); // ++ number of wins
      setBadge();
      setCards(shuffle); // re-shuffle cards
    }
  }, [cards, wins])



  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />

      <div className='grid'>
        {cards.map((card) => {
          const {id, name, image, matched} = card;
          return <Card
                    key={id}
                    image={image}
                    name={name}
                    selected={card === firstPick || card === secondPick || matched}
                    onClick={() => handleClick(card)} 
                    matched={matched}
                  />
        })}
      </div>
    </>
  );
}



export default App;

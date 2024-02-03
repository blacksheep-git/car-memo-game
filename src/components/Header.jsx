import React, { useEffect } from 'react'

export default function Header( { handleNewGame, wins}) {

    useEffect(() => { // update document title with num wins when the num wins changes
        document.title = `${wins} wins`;
    },[wins]);

    return (
        <header>
            <h4>{wins} wins</h4>
            <h3>Memory Game</h3>
            <button onClick={handleNewGame}> New Game</button>
        </header>
    )
}

import React from 'react'

function Card( { name, image, selected, onClick }) {

  return (
    <div className='card'>
      <div className={selected && 'selected'}>
        <img alt="" src={image} className={name + ' card-face'} />
        <img
            alt=""
            className="card-back"
            src={'/assets/logo.png'}
            onClick={onClick}
            />
      </div>
    </div>
  )
};

export default Card;

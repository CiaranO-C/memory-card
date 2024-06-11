import { useState } from 'react';

export default function Card({ url }) {
    const [clicked, setClicked] = useState(false);

    function toggleClicked(){
        setClicked(!clicked);
    }

  return (
    <button className="card" onClick={toggleClicked}>
      <img src={url} />
    </button>
  );
}

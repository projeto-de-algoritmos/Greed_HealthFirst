import React, { useState } from "react";

import { Link } from "react-router-dom";
import { compare } from "../services/huffman";

const Laudos = () => {
  const [laudos, setLaudos] = useState([]);
  const [senha, setSenha] = useState("");

  return (
    <div>
      <h1>laudos</h1>
      <Link to="/">Home</Link>
      <input onChange={(event) => setSenha(event.target.value)}></input>
      {/* <span>{senha}</span> */}
      <button onClick={() => compare(senha, 'kevin123')}>Enviar</button>
    </div>
  );
};

export default Laudos;

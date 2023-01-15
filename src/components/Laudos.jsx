import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { compare } from "../services/huffman";
import { useNavigate } from "react-router-dom";


const Laudos = () => {
  const [laudos, setLaudos] = useState([]);
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  return (
    <div>
      <div className="header">
        <h3>UnB - FGA</h3>
        <h3>Projeto de Algoritmos - Greed</h3>
        <button className="header-btn" onClick={()=> navigate("/")}>Home</button>
      </div>
      <h1>laudos</h1>
      <Link to="/">Home</Link>
      <input onChange={(event) => setSenha(event.target.value)}></input>
      {/* <span>{senha}</span> */}
      <button onClick={() => compare(senha, 'kevin123')}>Enviar</button>
    </div>
  );
};

export default Laudos;

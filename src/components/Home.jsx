import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="header">
        <h3>UnB - FGA</h3>
        <h3>Projeto de Algoritmos - Greed</h3>
        <button className="header-btn">Health First</button>
      </div>
      <div className="home-container">
        <div className="box">
          <h1>Instituto Health First</h1>

          <div className="flex-column" onClick={() => navigate("/mochila")}>
            <li>Mochila</li>
            <span style={{ fontSize: "10pt" }}>
              Veja a melhor distribuição dos itens para sua mochila de acordo
              com seu peso.{" "}
            </span>
          </div>

          <div className="flex-column" onClick={() => navigate("/laudos")}>
            <li>Laudos</li>
            <span style={{ fontSize: "10pt" }}>
              Acesse os laudos do Instituto Health First com suas credenciais.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import "../App.css";
import { login } from "../services/huffman";
import { useNavigate } from "react-router-dom";
import { laudosMedicos } from "../mocks";

const Laudos = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mode, setMode] = useState(1);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const params = { email: email, senha: senha };
    const res = login(params);

    if (res === 404) {
      alert("Email ou senha incorretos");
    }
    if (res === 200) {
      setMode(2);
    }
  };

  return (
    <div>
      <div className="header">
        <h3>UnB - FGA</h3>
        <h3>Projeto de Algoritmos - Greed</h3>
        <button className="header-btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
      <div className="home-container" style={{}} >
        {mode === 1 && (
          <div className="box" >
            <h1>Digite suas credenciais</h1>
            <input
              style={{ height: "33px", width: "200px", padding: "5px" }}
              placeholder="Digite seu email"
              onChange={(event) => setEmail(event.target.value)}
            ></input>
            <input
              style={{ height: "33px", width: "200px", padding: "5px" }}
              placeholder="Digite sua senha"
              onChange={(event) => setSenha(event.target.value)}
            ></input>
            <button className="primary-btn" onClick={handleSubmit}>
              Entrar
            </button>
          </div>
        )}
        {mode === 2 && (
          <div className="box" style={{width: "900px",margin: "50px"}}>
            <h1>Seus laudos</h1>
            <div style={{ height: "300px", overflow: "scroll", width: "500px" }}>
              {laudosMedicos.map((laudo) => (
                <div className="flex-column" style={{marginBottom:"10px"}}>
                  <li>{laudo.paciente}</li>
                  <span style={{ fontSize: "10pt" }}>{laudo.laudo}</span>
                </div>
              ))}
            </div>

            <button className="header-btn" onClick={() => setMode(1)}>
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Laudos;

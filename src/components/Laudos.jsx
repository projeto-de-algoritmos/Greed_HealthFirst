import React, { useState } from "react";
import "../App.css";
import {
  decompress,
  getEncodedPass,
  login,
  secureKey,
} from "../services/huffman";
import { useNavigate } from "react-router-dom";
import { laudosMedicos, usuarios } from "../mocks";

const Laudos = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mode, setMode] = useState(1);
  const [encodedPass, setEncondedPass] = useState("");
  const [decodedPass, setDecodedPass] = useState("");
  const [decodeBtn, setDecodeBtn] = useState(false);
  const [key, setKey] = useState("");
  const [showMails, setShowMails] = useState(false);
  const [mails, setMails] = useState([]);

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

  const handleRecovery = () => {
    const res = getEncodedPass(email);

    if (res === 404) {
      alert("Email não cadastrado");
      return;
    }

    setEncondedPass(res);
    setDecodeBtn(true);
  };

  const handleShowPassword = () => {
    if (key === secureKey) {
      const res = decompress(encodedPass);
      setDecodedPass(res);
    }
  };

  const handleGoBack = () => {
    setMode(1);
    setDecodeBtn(false);
    setDecodedPass("");
    setEncondedPass("");
    setKey("");
    setShowMails(false);
  };

  const handleShowMails = () => {
    setShowMails(true);
    setMails(usuarios.map((usuario) => usuario.email));
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
      <div className="home-container" style={{}}>
        {mode === 1 && (
          <div className="box">
            <h1>Digite suas credenciais</h1>
            <input
              style={{ height: "33px", width: "200px", padding: "5px" }}
              placeholder="Digite seu email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></input>
            <input
              type="password"
              style={{ height: "33px", width: "200px", padding: "5px" }}
              placeholder="Digite sua senha"
              onChange={(event) => setSenha(event.target.value)}
            ></input>
            <div className="btns-div">
              <button className="header-btn" onClick={() => setMode(3)}>
                Recuperar
              </button>
              <button className="primary-btn" onClick={handleSubmit}>
                Entrar
              </button>
            </div>
          </div>
        )}
        {mode === 2 && (
          <div className="box" style={{ width: "900px", margin: "50px" }}>
            <h1>Seus laudos</h1>
            <div
              style={{ height: "300px", overflow: "scroll", width: "500px" }}
            >
              {laudosMedicos.map((laudo) => (
                <div className="flex-column" style={{ marginBottom: "10px" }}>
                  <li>{laudo.paciente}</li>
                  <span style={{ fontSize: "10pt" }}>{laudo.laudo}</span>
                </div>
              ))}
            </div>

            <button className="header-btn" onClick={handleGoBack}>
              Voltar
            </button>
          </div>
        )}
        {mode === 3 && (
          <>
            <div className="box" style={{ width: "900px", margin: "50px" }}>
              {!showMails && (
                <button onClick={handleShowMails}>Mostrar emails</button>
              )}
              <h1>Recupere sua senha</h1>

              <input
                style={{ height: "33px", width: "200px", padding: "5px" }}
                placeholder="Digite seu email"
                onChange={(event) => setEmail(event.target.value)}
              ></input>
              {!decodeBtn && (
                <div className={"btns-div"}>
                  <button className="header-btn" onClick={handleGoBack}>
                    Voltar
                  </button>

                  <button className="primary-btn" onClick={handleRecovery}>
                    Mostrar
                  </button>
                </div>
              )}
              {encodedPass && <p>Sua senha codificada: {encodedPass}</p>}
              {decodeBtn && (
                <>
                  <input
                    style={{ height: "33px", width: "200px", padding: "5px" }}
                    placeholder="Digite a chave secreta do sistema"
                    onChange={(event) => setKey(event.target.value)}
                  ></input>
                  <div className="btns-div">
                    <button className="header-btn" onClick={handleGoBack}>
                      Voltar
                    </button>
                    <button
                      className="primary-btn"
                      onClick={handleShowPassword}
                    >
                      Decodificar
                    </button>
                  </div>
                  {decodedPass && <p>Sua senha decodificada: {decodedPass}</p>}
                </>
              )}
            </div>
            {showMails && (
              <div className="box" style={{ width: "400px", margin: "50px" }}>
                <button onClick={() => setShowMails(false)}>Fechar</button>
                <div
                  style={{
                    height: "300px",
                    overflow: "scroll",
                    width: "300px",
                    padding: "15px",
                  }}
                >
                  {mails.map((mail) => (
                    <div
                      className="flex-column"
                      style={{ marginBottom: "10px" }}
                    >
                      <li>{mail}</li>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Laudos;

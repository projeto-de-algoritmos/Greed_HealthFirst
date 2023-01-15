import "../mochila.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
var peso_recomendado = 0;
let q_item = [];
function Mochilas() {
  useEffect(() => {
    console.log("useEffect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q_item]);

  const navigate = useNavigate()

  const [items, setItems] = useState([
    {
      id: 0,
      qty: 1,
      used_qty: 0,
      name: "Mouse",
      peso: 100,
      priority: 1,
      icon: "🖱",
    },
    {
      id: 1,
      qty: 2,
      used_qty: 0,
      name: "Caderno",
      peso: 200,
      priority: 2,
      icon: "📔",
    },
    {
      id: 2,
      qty: 3,
      used_qty: 0,
      name: "Garrafa",
      peso: 300,
      priority: 3,
      icon: "🧴",
    },
    {
      id: 3,
      qty: 4,
      used_qty: 0,
      name: "Jaleco",
      peso: 400,
      priority: 4,
      icon: "🥼",
    },
    {
      id: 4,
      qty: 5,
      used_qty: 0,
      name: "Notebook",
      peso: 500,
      priority: 5,
      icon: "💻",
    },
  ]);
  const [result, setResult] = useState();
  // const [pesoRestante, setPesoRestante] = useState();

  const findPeso = () => {
    var user = document.getElementById("peso_user").value;
    peso_recomendado = user * 0.1 * 1000;
    console.log("peso_recomendado", peso_recomendado);
    console.log(items);
    for (let i = 0; i < items.length; i++) {
      const newItems = [...items];
      newItems[i].used_qty = 0;
      setItems(newItems);
    }
    console.log("items", items);
    const sortedItems = items.sort((a, b) => a.priority - b.priority);

    console.log("sortedItems,", sortedItems);
    setResult(sortedItems);
    for (let i = sortedItems.length - 1; i >= 0; i--) {
      var a = document.getElementById(`qty_${i}`).value;
      var b = document.getElementById(`peso_${i}`).value;
      var c = document.getElementById(`priority_${i}`).value;
      if (a === "" || b === "" || c === "" || user === "") {
        document.getElementById("result").innerHTML =
          "Todos os campos devem ser preenchidos";
        return;
      }
      q_item[i] = sortedItems[i].qty;
    }

    let peso_max = [];
    for (let i = 0; i < sortedItems.length; i++) {
      while (peso_recomendado >= sortedItems[i].peso && q_item[i] > 0) {
        peso_recomendado -= sortedItems[i].peso;
        q_item[i]--;

        const newItems = [...sortedItems];
        newItems[i].used_qty += 1;
        setResult(newItems);

        peso_max.push(sortedItems[i]);
        console.log("peso_recomendado", peso_recomendado);
      }
    }
    // setResult(peso_max);
    console.log("peso_max", result);
  };

  return (
    <>
      <div className="header">
        <h3>UnB - FGA</h3>
        <h3>Projeto de Algoritmos - Greed</h3>
        <button className="header-btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
      <div className="main">
        <div className="container">
          <p>Itens</p>
          {items.map((item, index) => {
            return (
              <div key={item.id}>
                <form>
                  <div class="input">
                    <label for="R$2">
                      {item.name}
                      <input
                        min={0}
                        class="css_label"
                        id={`qty_${item.id}`}
                        placeholder="Quantidade"
                        type="number"
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[item.id].qty = Number(e.target.value);
                          setItems(newItems);
                          setResult(null);
                        }}
                        defaultValue={q_item[index] ? q_item[index] : item.qty}
                      />
                    </label>
                    <label for="R$2">
                      Peso (g)
                      <input
                        min={1}
                        class="css_label"
                        id={`peso_${item.id}`}
                        placeholder="200"
                        type="number"
                        defaultValue={item.peso}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[item.id].peso = Number(e.target.value);
                          setItems(newItems);
                          setResult(null);
                        }}
                      />
                    </label>

                    <label for="R$2">
                      Priority
                      <input
                        class="css_label"
                        id={`priority_${item.id}`}
                        placeholder="1"
                        type="number"
                        defaultValue={item.priority}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[item.id].priority = Number(e.target.value);
                          setItems(newItems);
                          setResult(null);
                        }}
                      />
                    </label>
                  </div>
                </form>
              </div>
            );
          })}
          <form class="input_container">
            <input
              placeholder="Seu peso em KG"
              type="number"
              id="peso_user"
              class="your_weight"
              min={40}
            />
          </form>

          <input
            type="button"
            class="btn"
            value="Calcular"
            onClick={findPeso}
          />
          <div class="result">
            <p id="result"></p>
          </div>
        </div>
        {result && (
          <div className="container">
            <p>Resultado</p>
            <div className="result">
              <div>
                <p style={{ fontSize: "20px" }}>
                  Item - Ícone - Peso - Quantidade
                </p>
              </div>
              {result.map((item, index) => {
                return (
                  <div key={index}>
                    <p style={{ fontSize: "20px" }}>
                      {item.name} - {item.icon} - {item.peso}g - {item.used_qty}
                    </p>
                  </div>
                );
              })}
            </div>
            <div>
              <p style={{ fontSize: "20px" }}>
                Peso total:{" "}
                {result.reduce((acc, item) => {
                  return acc + item.peso * item.used_qty;
                }, 0)}
                g
              </p>

              <p style={{ fontSize: "20px" }}>
                Peso restante: {peso_recomendado.toFixed(2)}g
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Mochilas;

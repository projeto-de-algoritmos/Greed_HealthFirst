import "../mochila.css";
import { useEffect, useState } from "react";
var peso_recomendado = 0;
let q_item = [];
function Mochilas() {
  useEffect(() => {
    console.log("useEffect");
  }, [q_item]);

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
  const [pesoRestante, setPesoRestante] = useState();



  return(
  <div className="main">
    <div className="container">
      <p>Itens</p>
      {items.map((item, index) => {
        return (
          <div key={item.id}>
            <form class="">
              <div class="q_div">
                <label for="R$2">
                  {item.name}
                  <input
                    min={0}
                    class="q_inp"
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
                    class="q_inp"
                    id={`peso_${item.id}`}
                    placeholder="R$2"
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
                    class="q_inp"
                    id={`priority_${item.id}`}
                    placeholder="R$2"
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
      <form class="inp-container">
        <input
          placeholder="Seu peso em KG"
          type="number"
          id="peso_user"
          class="inp"
          min={40}
        />
      </form>

      <input type="button" class="btn" value="Calcular" onClick={findPeso} />
      <div class="result">
        <p id="result"></p>
      </div>
    </div>
    {result && (
      <div className="container">
        <p>Resultado</p>
        <div className="result">
          <div>
            <p style={{ fontSize: "20px" }}>Item - Ícone - Peso - Quantidade</p>
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

          <p style={{ fontSize: "20px" }}>Peso restante: {peso_recomendado}g</p>
        </div>
      </div>
    )}
  </div>);
}

export default Mochilas;

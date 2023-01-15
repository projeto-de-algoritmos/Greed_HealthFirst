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
  
  </div>);
}

export default Mochilas;

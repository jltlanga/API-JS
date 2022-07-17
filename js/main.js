const baseUrl = "https://api.coinranking.com/v2/coins";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "coinranking333265911084143955adeaaf5d0b0c0f05e1156ef3a9ebd2";

const coinList = document.getElementById("data");
const filtroInput = document.getElementById("filter");

let dadosMoeda = [];
let moedaFiltrada = [];

/* ---------------------------------Converte e fixa os preços e cotações em dois dígitos monetários------------ */
var conversaoMonetaria = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e4) return +(n / 1e9).toFixed(2) + "billion ETC";
};

/* -----------------------Pega o nome digitado pelo usuário na busca ----------------------------------- */
filtroInput.addEventListener("keyup", (e) => {
  const inputValue = e.target.value;
/* ----------------------- Filtra pelo nome ou símbolo ---------------------- */
  moedaFiltrada = dadosMoeda.filter((coin) => {
    return coin.name.toLowerCase().includes(inputValue);
  });
  exibirMoedas(moedaFiltrada);
});

/* ---------------------- Acessa a base de dados original  da api através das credenciais --------------------- */
var apiUrl = `${proxyUrl}${baseUrl}`;
console.log(apiUrl);
/* ------------------ Faz a requisição de dados necessários ----------------- */

const carregaMoedas = async () => {
  try {
    const res = await fetch(apiUrl);
    const retornoDados = await res.json();
    dadosMoeda = retornoDados.data.coins;
    console.log(retornoDados);
    exibirMoedas(retornoDados.data.coins);
  } catch (error) {
    console.log(error);
  }
};

/* --- Exibe dados requisitados e preenche-as em uma tabela em javascript --- */
const exibirMoedas = (coins) => {
  const htmlString = coins
    .map((coin) => {
      return `
      <tr>
        <td>${coin.name}</td>
        <td>${coin.rank}</td>
        <td>${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(coin.price)}</td>
        <td>${conversaoMonetaria(coin.marketCap)}</td>
        <td>${coin.symbol}</td>
        <td><img src="${coin.iconUrl}" height="25" width="25" /></td>
        <td>
        <a href="${coin.coinrankingUrl}" target="_blank">
        <i class="fas fa-chart-line"></i>
        </a>
        </td>
      </tr>
      `;
    })
    .join("");
  coinList.innerHTML = htmlString;
};
carregaMoedas();

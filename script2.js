const option = {
  method: "GET",
  mode: "cors",
  cache: "default",
};

fetch(
  `https://raw.githubusercontent.com/veggiepriceapi/veggiepriceapi.github.io/master/data.txt`,
  option
).then((response) => {
  response.json().then((data) => {
    mainFunction(data, "Italiano - atacado", "Campinas");
  });
});

const mainFunction = (data, produto, regiao) => {
  console.log(data);
  for (let index in data) {
    let seriesName = index;
    let seriesData = [];
    let filteredData = data[index].filter(
      (dado) => dado.Produto === produto && dado.Região === regiao
    );
    filteredData.forEach((filtrado) =>
      seriesData.push(parseFloat(filtrado.Preço))
    );
    createDayChart(seriesName, seriesData)
  }
};

function createDayChart(name, data) {
  options2.series.push({
    name: name,
    data: data,
  });
  chart2.update();
  console.log(options6)
}

//chart defaults
const lineChart = {
  type: "line",
  height: 350,
  foreColor: "#000",
  zoom: {
    enabled: false,
  },
  toolbar: {
    show: false,
  },
  animations: {
    enabled: false,
  },
};

const colors = [
  "rgb(210, 33, 41)",
  "rgb(40, 163, 73)",
  "rgb(249, 239, 30)",
  "rgb(35, 61, 148)",
  "rgb(246, 127, 33)",
  "rgb(255, 255, 255)",
  "rgb(245, 36, 156)",
  "rgb(151, 145, 141)",
  "rgb(89, 160, 198)",
  "rgb(143, 25, 179)",
  "rgb(87, 123, 97)",
  "rgb(92, 57, 35)",
  "rgb(118, 119, 30)",
  "rgb(141, 18, 39)",
  "rgb(35, 223, 156)",
  "rgb(35, 168, 187)",
];
const lineChartLegend = {
  position: "top",
  horizontalAlign: "center",
  offsetX: 40,
  labels: {
    colors: "#000",
  },
};
const lineChartTooltipCases = {
  y: {
    formatter: function (val) {
      return 'R$' + val ;
    },
  },
};

const lineChartTooltipDeaths = {
  y: {
    formatter: function (val) {
      return val + " deaths";
    },
  },
};

const lineChartStroke = {
  curve: "smooth",
};
//end of chart defaults

//total cases chart
let options2 = {
  chart: lineChart,
  colors: colors,
  stroke: lineChartStroke,
  series: [],
  xaxis: {
    type: "category",
    categories: [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ],
    tickAmount: 12,
    title: {
      text: "Meses",
      offsetY: 10,
    },
  },
  yaxis: {
    title: {
      text: "R$",
    },
  },
  legend: lineChartLegend,
  tooltip: lineChartTooltipCases,
  title: {
    text: "PreÃ§o do produto selecionado",
    align: "center",
  },
};
let chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render();
//end of new cases chart

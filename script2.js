const option1 = {
  method: "GET",
  mode: "cors",
  cache: "default",
};

fetch(
  `https://raw.githubusercontent.com/veggiepriceapi/veggiepriceapi.github.io/master/datadiaria.txt`,
  option1
).then((response) => {
  response.json().then((data) => {
    mainFunction1(data, "Italiano - atacado", "São Paulo (capital)");
  });
});
const dayPrecision = {
  "1": 0,
  "2": 31,
  "3": 59,
  "4": 90,
  "5": 120,
  "6": 151,
  "7": 181,
  "8": 212,
  "9": 243,
  "10": 273,
  "11": 304,
  "12": 334,
};

const YearDayFinder = (day, month) => {
  for (let i in dayPrecision) {
    if (month === i) {
      return dayPrecision[i] + parseInt(day);
    }
  }
};

let contador = 0;
const dataFill = () => {
  let nullArr = [];
  for (let i = 1; i <= 365; i += 1) {
    nullArr.push(null);
  }
  return nullArr;
};

const nullFixer = (arr, year) => {
  let firstValid = arr.find((element) => element !== null);
  arr[0] = firstValid;
  for (let i = 0; i < 365; i += 1) {
    if (year === "2020") {
      arr[i + 1] === null && i < 180 ? (arr[i + 1] = arr[i]) : arr[i + 1];
    } else {
      arr[i + 1] === null ? (arr[i + 1] = arr[i]) : arr[i + 1];
    }
  }
};

const categoryBuilder = () => {
  let arr = []
  for (let i = 1; i <= 365; i += 1) {
    if (i <= dayPrecision['2']) arr.push(`${i}/jan`)
    else if (i <= dayPrecision['3']) arr.push(`${i - dayPrecision['2']}/fev`)
    else if (i <= dayPrecision['4']) arr.push(`${i - dayPrecision['3']}/mar`)
    else if (i <= dayPrecision['5']) arr.push(`${i - dayPrecision['4']}/abr`)
    else if (i <= dayPrecision['6']) arr.push(`${i - dayPrecision['5']}/mai`)
    else if (i <= dayPrecision['7']) arr.push(`${i - dayPrecision['6']}/jun`)
    else if (i <= dayPrecision['8']) arr.push(`${i - dayPrecision['7']}/jul`)
    else if (i <= dayPrecision['9']) arr.push(`${i - dayPrecision['8']}/ago`)
    else if (i <= dayPrecision['10']) arr.push(`${i - dayPrecision['9']}/set`)
    else if (i <= dayPrecision['11']) arr.push(`${i - dayPrecision['10']}/out`)
    else if (i <= dayPrecision['12']) arr.push(`${i - dayPrecision['11']}/nov`)
    else if (i > dayPrecision['12']) arr.push(`${i - dayPrecision['12']}/dez`)
  }
  console.log(arr);
  return arr
};
console.log(categoryBuilder())
const mainFunction1 = (data, produto, regiao) => {
  for (let index in data) {
    let seriesName = index + " " + regiao;
    let seriesData = dataFill();

    let filteredData = data[index].filter(
      (dado) => dado.produto === produto && dado.regiao === regiao
    );
    filteredData.forEach((filtrado) => {
      position = YearDayFinder(filtrado.dia, filtrado.mes) - 1;
      seriesData[position] = parseFloat(filtrado.preco);
    });
    nullFixer(seriesData, index);
    contador += 1;
    createDayChart(seriesName, seriesData);
  }
};

function createDayChart(name, data) {
  options2.series.push({
    name: name,
    data: data,
  });
  chart2.update();
}

//chart defaults
const lineChart1 = {
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

const colors1 = [
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
const lineChartLegend1 = {
  position: "top",
  horizontalAlign: "center",
  offsetX: 40,
  labels: {
    colors: "#000",
  },
};
const lineChartTooltipCases1 = {
  y: {
    formatter: function (val) {
      return "R$" + val;
    },
  },
};

const lineChartTooltipDeaths1 = {
  y: {
    formatter: function (val) {
      return val + " deaths";
    },
  },
};

const lineChartStroke1 = {
  curve: "smooth",
  width: 2,
};
//end of chart defaults

//total cases chart
let options2 = {
  chart: lineChart1,
  colors: colors1,
  stroke: lineChartStroke1,
  series: [],
  xaxis: {
    type: "category",
    categories: categoryBuilder(),
    tickAmount: 12,
    title: {
      text: "dias",
      offsetY: 10,
    },
    labels: {
      show: false,
    }
  },
  yaxis: {
    title: {
      text: "R$",
    },
  },
  legend: lineChartLegend1,
  tooltip: lineChartTooltipCases1,
  title: {
    text: "PreÃ§o do produto selecionado",
    align: "center",
  },
};
let chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render();
//end of new cases chart

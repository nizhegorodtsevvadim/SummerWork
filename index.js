import _ from 'lodash';

const showInfo = (content) => {
  const data = content.trim().split('\n').slice(1).map((row) => row.split(','));

  // or
  //    export default (string) => {
  //     const data = string.split('\n');
  //     const rows = data.slice(1, data.length -1).map((row) => row.split(',');)
  //    }

  // step 1
  console.log(`Count: ${data.length}`);

  // step 2
  const cities = data.map((el) => el[7]);
  const uniques = _.uniq(cities);
  console.log(`Cities: ${uniques.sort().join(', ')}`);

  // step 3
  // const humidities = data.map((el) => Number(el[3]));
  // const minHumidities = humidities.reduce((acc, curr) => (curr < acc ? curr : acc));
  // const maxHumidities = humidities.reduce((acc, curr) => (curr > acc ? curr : acc));
  // console.log(minHumidities)
  // console.log(maxHumidities)
  const humidities = data.map((el) => Number(el[3]));
  const minHumidities = _.min(humidities);
  const maxHumidities = _.max(humidities);
  console.log(`Humidity: Min: ${minHumidities}, Max: ${maxHumidities}`);

  // step 4
  const dates = data.map((el) => el[0]);
  const maxTemps = data.map((el) => Number(el[1]));
  const maxTempIndex = maxTemps.indexOf(Math.max(...maxTemps));
  console.log(`HottestDay: ${dates[maxTempIndex]} ${cities[maxTempIndex]}`);

  // вывем дату самой жаркой погоды среди всех записей для Сиэтла

  // const seattleRows = data.filter((el) => el[7] === 'Seattle');
  // const seattleDates = seattleRows.map((el) => el[0])
  // const maxTempSeattle = seattleRows.map((el) => Number(el[1]));
  // const maxTempSeattleIndex = maxTempSeattle.indexOf(Math.max(...maxTempSeattle));
  // console.log(`HottestDaySeattle: ${seattleDates[maxTempSeattleIndex]}`)

  // step 5
  // Средняя температура
  const getAverageTemp = (temps) => Math.floor(temps
    .reduce((acc, elem) => Number(acc) + Number(elem), 0) / temps.length);
  console.log(getAverageTemp(maxTemps));

  const cititesAverageTemps = {};
  // Решение через цикл
  for (let i = 0; i < uniques.length; i += 1) {
    cititesAverageTemps[uniques[i]] = [];
  }

  for (let i = 0; i < cities.length; i += 1) {
    cititesAverageTemps[cities[i]].push(Number(data[i][1]));
  }

  // eslint-desable-next-line
  for (const city in cititesAverageTemps) {
    cititesAverageTemps[city] = getAverageTemp(cititesAverageTemps[city]);
  }

  const maxTempCity = Object.entries(cititesAverageTemps).reduce((acc, elem) => {
    if (elem[1] > acc[1]) {
      return elem;
    } return acc;
  });
  console.log(`HottestCity: ${maxTempCity[0]}`);
};

export default showInfo;

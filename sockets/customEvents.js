const fetch = require('node-fetch');
const env = require('../config');
const randomizer = require('../randomizer/randomizer');
const checkConnectionStatus = require('../db/useful-middleware').checkStatus;
const tableManager = require('../db/tableManager');

const getDate = (params) => {
  let baseURL = env.time.base;
  const delimiter = '/';
  const region = params.region || '';
  const country = params.country || '';
  const city = params.city || '';

  if (region.length > 0) {
    baseURL += `${region}${delimiter}`;
  }
  if (country.length > 0) {
    baseURL += `${country}${delimiter}`;
  }
  baseURL = `${baseURL}${city}`;

  return fetch(baseURL, { method: 'GET' })
    .then(checkConnectionStatus)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

module.exports = (socket) => {
  // Get Date
  socket.on('getDate', (params) => {
    const date = getDate(params);
    date
      .then((response) => {
        socket.emit('dateReturned', response);
      })
      .catch((err) => console.log('Date:', err));
  });

  // Randomize List
  socket.on('randomizeList', (data) => {
    let { rollNumber } = data;
    let { raffleList } = data;
    const rollResults = [];

    while (rollNumber > 0) {
      // deep copy
      raffleList = JSON.parse(JSON.stringify(randomizer.shuffle(raffleList)));
      rollResults.push({
        result: raffleList,
        rollNumber,
      });

      // database operation
      tableManager.saveToTable({
        table: 'roll-result',
        raffleid: '22',
        data: raffleList.join(';'),
      });
      rollNumber -= 1;
    }

    socket.emit('listReturned', { rollResults });
  });

  socket.on('getTrueRandomNumber', (min = 2, max = 12, size = 1) => {
    const result = {
      randomNumbers: randomizer.getRandomNumbers(min, max, size),
    };
    socket.emit('trueRandomNumberReturned', result);
  });
};

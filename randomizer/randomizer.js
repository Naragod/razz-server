module.exports = {
  getRandomNumbers(min = 0, max = 1, size = 1) {
    const result = [];
    let counter = size;
    while (counter !== 0) {
      result.push(Math.floor(Math.random() * (max - min) + min));
      counter -= 1;
    }
    return result;
  },

  shuffle: (array) => {
    const result = array;
    let end = array.length;
    if (end === 0) {
      return false;
    }
    while (end !== 0) {
      end -= 1;

      const i = Math.floor(Math.random() * result.length);
      const temp = result[end];
      result[end] = result[i];
      result[i] = temp;
    }
    return result;
  },
};

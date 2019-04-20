

module.exports = {
    getRandomNumbers: function(min=0, max=1, size=1){
        let result = [];
        while(size !== 0){
            result.push(Math.floor(Math.random() * (max - min) + min));
            size --;
        }
        return result;
    },

    shuffle: (array) => {
        let end = array.length;
        if(end === 0){
            return false;
        }
        while(end !== 0){
            end --;

            let i = Math.floor(Math.random() * array.length);
            let temp = array[end];
            array[end] = array[i];
            array[i] = temp;
        }
        return array;
    }
};
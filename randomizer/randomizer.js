

module.exports = {
    getRandomNumbers: function(min=0, max=1, size=1){
        let result = [];
        while(size != 0){
            result.push(Math.random() * (max - min) + min);
            size --;
        }
        return result;
    }
};
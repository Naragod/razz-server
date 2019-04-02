

module.exports = {
    trim: function(str){
        console.log("str:", str);
        return str.replace(/(^,)|(,$)/g, "");
    }
}
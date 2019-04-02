

module.exports = {
    checkStatus: (res) => {
        if(res.ok)
            return res;
        else{
            throw {
                error: "Error: Request Failed.",
                response: res
            };
        }
    }
}
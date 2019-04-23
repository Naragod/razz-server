
module.exports = (success=false, message= "Authorization Failed.", token = null) => {
    console.log(message, "Token:", token);
    return {
        success: success,
        message: message,
        token: token
    };
};
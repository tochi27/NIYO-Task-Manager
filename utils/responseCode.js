
const ResponseCode = {
    successful: 200, //calling right endpint with right endpoint and datafound
    badRequest: 400, //when accessing wrong url or using wrong method or not passing needed parameters
    noData:201, //calling right url with right method but data requested does not exist e.g trying sign up with wrong username and password
    internalServerError: 500, //whenever the issues are from within
    dataDuplication: 230, //duplicated data
    unAuthorized: 401 , //unatorized user trying to use protected routes
    invalidToken: 403,  //when wrong token is passed
    requestUnavailable: 209,  //Data requested not available
}
exports.ResponseCode = ResponseCode
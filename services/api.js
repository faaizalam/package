const Headers = require("../utils");
const axios = require("axios");
const GetData = async ({
  headersName,
  event,
  _proxyAgent,
  _cookieData

}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { url, ...headerArgs } = new Headers(headersName, { event, _cookieData }).getHeaders();
      let abortController = new AbortController();
      const timeout = setTimeout(() => {
        abortController.abort();
      }, 10000);

      const response = await axios
        .get(
          url,
          {
            method: "GET",
            httpsAgent: _proxyAgent,

            headers: headerArgs,
            signal:abortController.signal 
          },
          
        )
        .then((x) => {
          clearTimeout(timeout);
          return x;
        })
        .catch((e) => {
          return e;
        });



      if (
        response?.response?.status === 403 ||
        response?.response?.status === 400
      ) {


        return resolve(response);
      }



      if (response.status) {
        if (response.status == 200) {
          return resolve(response.data);
        } else if (response.status == 403 || response.status == 400) {
           return resolve(false);
        }
      }



    } catch (e) {

      return reject(e);
    }
  });
};


module.exports = GetData
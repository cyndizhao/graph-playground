const Axios = require ('axios')

const axios = Axios.create({
    baseURL: 'http://localhost:8000',
    headers: {'X-Custom-Header': 'playground'}

})

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    //   console.error(JSON.stringify(error, null, 4))
      const message = error.message && error.response.data & error.response.data.error && error.response.data.error.message
    alert(`Error: ${message || error}`)
  });


module.exports = axios
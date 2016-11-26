import request from "request";

class HttpRequestService {
  static post(url, body) {
    request.post({
      url: url,
      body: JSON.stringify(body)
    },
      (error, response, body) => {
        if (response.statusCode == 200) {
          console.log("ok");
        } else {
          console.log("error: " + response.statusCode);
          console.log(body);
        }
      }
    );
  }
}

export default HttpRequestService;

const backendApi = "http://localhost:5000";

async function request(route, method, body) {
  let headers = {
    token: window.localStorage.getItem("token"),
  };

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  let res = await fetch(backendApi + route, {
    method,
    headers,
    body: body instanceof FormData ? body : JSON.stringify(body),
  });
  if (!(res.status === 200 || res.status === 201)) {
    res = await res.json();
    throw new Error(res.message);
  }
  res = await res.json();
  return res;
}

function createElements(...array) {
  return array.map((el) => document.createElement(el));
}

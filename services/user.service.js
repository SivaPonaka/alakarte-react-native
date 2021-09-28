export const userService = {
  registerUser,
  getUserDetails,
};

async function registerUser(requestObject) {
  const requestOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestObject),
  };
  return fetch(
    `https://alakarte-dev-api.azurewebsites.net/customer`,
    requestOptions
  ).then(handleResponse);
}

async function getUserDetails(id) {
  const requestOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return fetch(
    `https://alakarte-dev-api.azurewebsites.net/customer/${id}`,
    requestOptions
  ).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 404) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject({ error: error, status: response.status });
      }
      if (response.status === 400) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject({ error: error, status: response.status });
      }
      if (response.status === 500) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject({ error: error, status: response.status });
      }
      if (response.status === 401) {
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject({ error: error, status: response.status });
    }

    if (response.status === 201) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject({ response: data, status: response.status });
    }

    if (response.status === 202) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject({ error: error, status: response.status });
    }

    return data;
  });
}

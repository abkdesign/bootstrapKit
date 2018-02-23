let Api = {};
const rootUrl ='http://localhost:8080';
const data = null;
// old way only with fetch and promises
const getFetchRequest = (url, method, data) => {
  const settings = {
    method: method,
    headers: {
      'content-type': 'application/json'
    }
  }
  if (data) {
    settings.body = JSON.stringify(data);
  }
  return fetch(`${rootUrl}/${url}`, settings).then((response) => response.json());
}

// new and better way with generator and promises
Api.runFetch = (_url, _method, _postBody) => {
  const settings = {
    method: _method,
    headers: {
      'content-type': 'application/json'
    }
  }
  if (_postBody) {
    settings.body = JSON.stringify(_postBody);
  }
  function run(generator) {
    const iterator = generator.call(this, arguments);
    const iteration = iterator.next();
    function iterate(iteration) {
      if (iteration.done) { return iteration.value }
      else {
        const promise = iteration.value;
        return promise.then(x => iterate(iterator.next(x)))
      }
    }
    return iterate(iteration);
  }
  return run(function* () {
    const url =  `${rootUrl}/${_url}`;
    const response = yield fetch(url, settings);
    const responseJson = yield response.json();
    return responseJson;
  })
}
// run generator
Api.run = (generator) => {
  const iterator = generator();
  const iteration = iterator.next();
  function iterate(iteration) {
    if (iteration.done) { return iteration.value }
    else {
      const promise = iteration.value;
      return promise.then(x => iterate(iterator.next(x)))
    }
  }
  return iterate(iteration);
}
export default Api;

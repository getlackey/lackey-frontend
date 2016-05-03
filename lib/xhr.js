/* jslint node:true */
'use strict';
/*
    Copyright 2016 Enigma Marketing Services Limited

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

var XHR = {
  ajax: function (path, method, data, raw) {

    return new Promise(function (resolve, reject) {

      var xhr = new XMLHttpRequest(),
        httpMethod = method.toLowerCase();

      xhr.open(httpMethod, path);
      if (httpMethod === 'post' || httpMethod === 'put') {
        xhr.setRequestHeader('Content-type', 'application/json');
      }

      xhr.onreadystatechange = function () {
        var DONE = 4, // readyState 4 means the request is done.
          OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            resolve(xhr.responseText); // 'This is the returned text.'
          } else if (xhr.status === '204') {
            resolve(null);
          } else {
            reject(new Error('Error: ' + xhr.status)); // An error occurred during the request.
          }
        }
      };

      xhr.send(data ? (raw ? data : JSON.stringify(data)) : null);

    });
  },
  get: function (path, raw) {
    return XHR.ajax(path, 'get', null, raw);
  },
  post: function (path, data, raw) {
    return XHR.ajax(path, 'post', data, raw);
  },
  put: function (path, data, raw) {
    return XHR.ajax(path, 'put', data, raw);
  },
  delete: function (path, raw) {
    return XHR.ajax(path, 'delete', null, raw);
  }
};

module.exports = XHR;

/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const PROTO_PATH = __dirname + '/helloworld.proto';
const tutorials = require("../app/controllers/controller");


const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * Implements the SayHello RPC method.
 */

const db = require("../app/models/index");
db.sequelize.sync();
function sayHello(call, callback) {
  let data = tutorials.create(call.request,call.response)
  console.log(JSON.stringify(data))
  callback(null, {message: 'data is inserted'});
}


function bookList(call, callback) {
  let data = tutorials.findAll(call.request,call.response);
  console.log("in service of booklist")
  console.log(data)
  callback(null, {list: data});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
exports.main = ()=> {
  let server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello,bookList: bookList});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}



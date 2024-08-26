// import dotenv from 'dotenv';
// dotenv.config();
// import amqplib from 'amqplib';

const express = require('express');
require('dotenv').config();

const amqplib = require('amqplib/callback_api');

const {PORT,SERVER_RABBITMQ,RABBITQM_HOST} = process.env;

// Crea una instancia de una aplicación Express
const app = express();

// Define la ruta de inicio
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// RABBITQM
let channel = null;
const queue = 'neo-email-resend';
console.log({SERVER_RABBITMQ,RABBITQM_HOST});

const Start = async () => {
  console.log('RabbitMQ', SERVER_RABBITMQ,RABBITQM_HOST);
  //  const conn = await amqplib.connect(SERVER_RABBITMQ);
  // console.log({conn})
  // channel = await conn.createChannel();


// Conectar a RabbitMQ
amqplib.connect(SERVER_RABBITMQ, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, function(msg) {
      console.log(`[x] Received ${msg.content.toString()}`);
    }, {
      noAck: true
    });
  });
});

};

// Start();


const rabbitmqHost = SERVER_RABBITMQ || 'rabbitmq_container';
console.log({rabbitmqHost})
amqplib.connect(rabbitmqHost, function(error0, connection) {
  if (error0) {
    console.error('Failed to connect to RabbitMQ:', error0.message);
  } else {
    console.log('Successfully connected to RabbitMQ');
    connection.close();
  }
});

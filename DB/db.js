const { Client } = require("pg");
const client = new Client({
  connectionString:
    "postgres://rpzqbqvsjvisui:148c36e31957bda703766289e0d109395301accf6612b61ebfae1c701e4e6090@ec2-52-49-120-150.eu-west-1.compute.amazonaws.com:5432/d4r0amahro3hvb",
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

module.exports = {
  client: client,
};

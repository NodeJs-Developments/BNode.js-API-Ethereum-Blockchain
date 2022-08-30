require('dotenv').config();
const express= require('express')
const app =express()
const routes = require('./routes')
var Web3 = require('web3');
const mongodb = require('mongodb').MongoClient
const contract = require('truffle-contract');
const artifacts = require('./build/Inbox.json');

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({status:200, message:"Server working"})
})

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
  } else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://0.0.0.0:7545'))
}
const LMS = contract(artifacts)
LMS.setProvider(web3.currentProvider)
// Database Connect
const DB = "mongodb://localhost:27017/blockchainNODEJS";
mongodb.connect(DB,{ useNewUrlParser: true,useUnifiedTopology: true },async(err,client)=>{
    
    const db =client.db('Cluster0')
    const accounts = await web3.eth.getAccounts();
    const lms = await LMS.deployed();
    //const lms = LMS.at(contract_address) for remote nodes deployed on ropsten or rinkeby
    routes(app,db, lms, accounts)

    //home
    console.log('Database Connected');
    app.listen(process.env.PORT || 8082, () => {
        console.log('Server listening on port 8082');
    })
})


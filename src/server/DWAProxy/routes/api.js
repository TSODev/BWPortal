var express = require('express');
var router = express.Router();
var _ = require('underscore');
var superagent = require('superagent');
var storage = require('node-localstorage').LocalStorage;
var app = require('../app');

// API to Digital Workplace Advanced

var config_timeout = 10000;
var agent = superagent.agent();             //IMPORTANT agent object will remember the cookies between requests.
var localStorage = new storage('./config');

var callAPIPost = function(url,values,next) {
  agent.post(url)
    .type('application/json')
    .timeout(config_timeout)                                                // 10s timeout
    .set('Content-Type', 'application/json;charset=UTF-8')
//    .set('default-bundle-scope', 'myit-sb')
    .set('X-Requested-By', 'XMLHttpRequest')
    .send(values)
    .end(function(e,response){
      next(e,response);
    });
};

var callAPIGet = function(url, next) {
  agent.get(url)
    .type('application/json')
    .timeout(config_timeout)
//    .set('Content-Type', 'application/json')
    .set('default-bundle-scope', 'myit-sb')
    .set('X-Requested-By', 'DWAProxy')
    .end(function(e, response){
      next(e, response);
    });
};

var callAPIGetImage = function(url, next) {
  agent.get(url)
    .type('application/octet-stream')
    .timeout(config_timeout)
    //    .set('Content-Type', 'application/json')
    .set('default-bundle-scope', 'myit-sb')
    .set('X-Requested-By', 'DWAProxy')
    .set('Content-Disposition', 'Attachment')
    .end(function(e, response){
      next(e, response);
    });
};


//------------------------------------------------------

/* GET API version. */
router.get('/version', function(req, res, next) {
  res.send('0.2');
  res.status(200);
  res.end();
//  next();
});

//------------------------------------------------------

router.get('/about', function(req, res, next) {
  res.send('DWAProxy (C)2018 TSODev');
  res.status(200);
  res.end();
//  next();
});

router.get('/recordInstance/:recordDefinitionName/:recordId', function(req, res, next) {

  recordDefinitionName = req.params['recordDefinitionName'];
  recordId = req.params['recordId'];

  console.log('Get Record Instance', recordDefinitionName , " - ", recordId);

  const url = localStorage.getItem('urlbase') + '/api/rx/application/record/recordinstance/' + recordDefinitionName + '/' + recordId;
  callAPIGet(url, function(e, response){
    if (e === null){
      if (response.status === 200){
        res.send(response.text);
        res.status(response.status);
        res.end();
      }
    } else {
      res.send(e.Error);
      res.status(500);
      res.end();
    }
  })
})

router.post('/recordInstance' , function(req, res, next) {

  // recordDefinitionName = req.params['recordDefinitionName'];
  // console.log('Post Record Instance', recordDefinitionName );
  const url = localStorage.getItem('urlbase') + '/api/rx/application/record/recordinstance/';
  callAPIPost(url, req.body, function(e, response){
    console.log(e);
    if (e === null){
      console.log(response);
      if (response.status === 201){
        res.send(response.text);
        res.status(response.status);
        res.end();
      }
    } else {
      res.send(e.Error.text);
      res.status(e.Error.status);
      res.end();
    }
  })
})


// URL	http://mobility219-bis.trybmc.com/api/rx/application/datapage?dataPageType=com.bmc.arsys.rx.application.namedlist.datapage.NamedListDataPageQuery&namedlistdefinition=com.bmc.dsm.ticketing-lib:Operating+Companies&pageSize=-1&startIndex=0

router.get('/datapage', function(req,res, next){
  dataPageType = req.query.datapageType;
  namedlistdefinition = req.query.namedlistdefinition;
  pageSize = req.query.pageSize;
  startIndex = req.query.startIndex;
  const url = localStorage.getItem('urlbase') + '/api/rx/application/datapage';
  callAPIGet(url + '?dataPageType=' + dataPageType 
                  + '&namedlistdefinition=' + namedlistdefinition 
                  + '&pageSize=' + pageSize 
                  + '&startIndex=' + startIndex, function(e, response){
    if (e === null){
      if (response.status === 200){
        res.send(response.text);
        res.status(response.status);
        res.end();
      }
    } else {
      res.send(e.Error);
      res.status(500);
      res.end()
    }
  })
})

//------------------------------------------------------

router.post('/config', function(req, res, next) {

  var connection = {
    protocol: '',
    port: '',
    server: '',
    user: '',
    pwd: ''
  };

  connection.protocol = req.body.protocol;
  connection.port = req.body.port;
  connection.server = req.body.server;
  connection.user = req.body.adminuser;
  connection.pwd = req.body.adminpwd;

  var config_error = false;
  if (!connection.protocol) { connection.protocol = 'http'};
  if (!connection.port) { connection.port = '80'};
  if (!connection.server) { config_error = true };
  if (!connection.user) { config_error = true};

  if (config_error) {
    res.send("Invalid configuration, please verify server and adminuser information");
    res.status(500);
    res.end();
  }
  else
    {
    // store connection info
    console.log('Connection Info : ', connection);
    var urlbase = connection.protocol + '//' + connection.server + ':' + connection.port;
    var url = urlbase + '/api/rx/application/command';
    var values = {
      resourceType: 'com.bmc.arsys.rx.application.user.command.LoginCommand',
      username: connection.user,
      password: connection.pwd
    };
  console.log("Accessing : ", url);
    callAPIPost(url,values, function(e, response){
      if (e === null){
        if (response.status === 200){
          // console.log("text : " , response.text);
          // console.log("Headers : ", response.headers);
          // Save the connection Info
          localStorage.setItem('urlbase', urlbase);
          res.set(response.headers);
          res.send(response.text);
          res.status(response.status);
          res.end()
        }
      }
      else {
        res.send(e.Error);
        res.status(500);
        res.end()
      }
    } )
  }
});

//-------------------------------------------------------

router.post('/case', function(req, res, next) {
  console.log("Post Case");
  const url = localStorage.getItem('urlbase') + '/api/com.bmc.dsm.hrcm-lib/cases';
  console.log(url);
  const body = req.body;
  console.log('body : ', body);
  callAPIPost(url, body, function(e,response){
    if (e === null){
      if (response.status === 201){
//        console.log(response);
        console.log("Calling : ",response.headers.location);
        callAPIGet(response.headers.location, function(e, result){
          if (e === null) {
            if (result.status === 200){
              console.log("Result : ", result.text);
              res.set(response.headers);
              res.send(result.text);
              res.status(response.status);
              res.end();
            }
          } else {
            console.log(e);
          }
        })
//         res.set(response.headers);
// //        res.send(response.text);        // Seems that response.text is empty with with call
//         res.send(response.headers.location);
//         res.status(response.status);
//         res.end();
      }
    } else {
      console.log(e);
      res.send(e.Error);
      res.status(500);
      res.end()
    }
  })
});

module.exports = router;

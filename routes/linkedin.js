var express = require('express');
var router = express.Router();

var Linkedin = require('node-linkedin')('75jw1r9fhu2nkq', 'TCZOVEDVnAF7yuqB', 'https%3A%2F%2Fwww.example.com%2Fauth%2Flinkedin');
var scope = ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages'];
var linkedin = Linkedin.init('AQWBrhnnhGcrGZ8OXVsUctKFyVV3RAYAcHLLk5w2DO3XAUW3OsAnd0P_eEmNhRsV06xDqYC6cKEus95qodUhu_V41PoPmAuzBJIFtsOQUvZzH_X7omQE_xPBYHvRiykmuJEo99JMQeACnpo_jeA6cKncw1FvFRd4Vg9qIz08_H4s3z1CokE');
var auth_url = Linkedin.auth.authorize(scope);


router.get('/', function(req,res){

  
  var result = "test";
  linkedin.people.me(function(err, $in) {
    //console.log($in.industry); 
    res.send($in.industry);  
  });

	
  //res.render('index', {title:result});

  
});

// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('test', { title: 'Express' });
// });

module.exports = router;

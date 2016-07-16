var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var keyword_extractor = require("keyword-extractor");
var pos = require('pos');

var client = new Twitter({
  consumer_key: 'H1ZP99aDJCUU56n5tPaDarZL6',
  consumer_secret: '2Cn3yk8o2l91yuBOEIUjZqT1ohqStTbflTdVuacsDujfbiXWJZ',
  access_token_key: '2731039830-OuFgnENbiogd5SCSBFWNMaPIBi7pCkkDhN1w4UN',
  access_token_secret: 'fatMfvVAOF4nNffFdqDhyki3i36FWs7CwsBBRnRnc9Xqn'
});

router.get('/:screenName', function(req, res, next) {
  var params = {screen_name: req.params.screenName, count: "40"};
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      var keywords = getTweetsWithLibrary(tweets);
      res.send(getFirstFourNouns(sortByFrequency(keywords)));
    }
  });
});

router.get('/profile/:screenName', function(req, res, next) {
  var params = {screen_name: req.params.screenName};
  client.get('users/lookup', params, function(error, tweets, response){
    if (!error) {
      var keywords = getProfileWithLibrary(tweets);
      res.send(getFirstFourNouns(keywords));
    }
  });
});

function getTweetsWithLibrary(tweets) {
  keywords = [];
  for (var id in tweets) {
    if(tweets[id].retweeted == false && tweets[id].in_reply_to_status_id == null) {
      var extraction_result = keyword_extractor.extract(tweets[id].text, {
                              language:"english",
                              remove_digits: true,
                              return_changed_case:true,
                              remove_duplicates: false
                         });
      var final = [];
      for (var count in extraction_result) {
        if (isValid(extraction_result[count])) {
          final.push(extraction_result[count]);
        }
      }
      keywords = keywords.concat(final);
    }
  }
  return keywords;
}

function getProfileWithLibrary(tweets) {
  var extraction_result = keyword_extractor.extract(tweets[0].description, {
                          language:"english",
                          remove_digits: true,
                          return_changed_case:true,
                          remove_duplicates: false
                     });
  var final = [];
  for (var count in extraction_result) {
    if (isValid(extraction_result[count])) {
      final.push(extraction_result[count]);
    }
  }
  return final;
}

function isValid(str) {
  return /^\w+$/.test(str);
}

function getSortedKeys(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}

function sortByFrequency(validWords) {
  var sortedValidWords = validWords.sort();
  repeatedWords = [];
  for (var count in sortedValidWords) {
    if (count == 1) continue;
    if (sortedValidWords[count] == sortedValidWords[count-1])
      repeatedWords.push(sortedValidWords[count]);
  }

  result = {};
  for (var count in repeatedWords) {
    if(!result[repeatedWords[count]])
      result[repeatedWords[count]] = 0;
    ++result[repeatedWords[count]];
  }
  sortedWordsByFrequency = getSortedKeys(result);
  return sortedWordsByFrequency;
}

function getFirstFourNouns(words) {
  var max = 0;
  var finalWordsNeeded = [];
  var tagger = new pos.Tagger();
  var taggedWords = tagger.tag(words);
  for (i in taggedWords) {
    if(max >= 4) break;
    var taggedWord = taggedWords[i];
    var word = taggedWord[0];
    var tag = taggedWord[1];
    if (tag == "NN" && word.length > 3 && word != "twitter") {
      finalWordsNeeded.push(word);
      max += 1;
    }
  }
  return finalWordsNeeded;
}


module.exports = router;

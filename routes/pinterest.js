var express = require('express');
var router = express.Router();
var pinterestAPI = require('pinterest-api');
var keyword_extractor = require("keyword-extractor");
var pos = require('pos');

/* GET home page. */
router.post('/second', function(req, res, next) {
  var pinterest = pinterestAPI(req.body.username);
    pinterest.getPins(function (pins) {
      var pinString = "";
      for (var id in pins.data) {
        pinString = pinString + pins.data[id].description + " ";
      }
      res.send(sortWordsAccordingToFrequency(pinString));
    });
});

/* Method two */
router.post('/', function(req, res, next) {
  var pinterest = pinterestAPI(req.body.username);
    pinterest.getPins(function (pins) {
      var keywords = getKeywordsWithLibrary(pins);

      res.send(getFirstFourNouns(sortByFrequency(keywords)));
    });
});

function sortWordsAccordingToFrequency(str) {
  var words = new pos.Lexer().lex(str);
  validWords = [];
  for (var count in words) {
    if (isValid(words[count])) validWords.push(words[count].toLowerCase());
  }
  var sortedWordsByFrequency = sortByFrequency(validWords);
  return getFirstFourNouns(sortedWordsByFrequency);
}

function getKeywordsWithLibrary(pins) {
  keywords = [];
  for (var id in pins.data) {
    var extraction_result = keyword_extractor.extract(pins.data[id].description, {
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
  return keywords;
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
    if (tag == "NN") {
      finalWordsNeeded.push(word);
      max += 1;
    }
  }
  return finalWordsNeeded;
}

module.exports = router;

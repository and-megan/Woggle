Woggle is a single-player browser game based on the famous Boggle.
#Rules
1. Click on a letter and drag to add to a word.
2. Release mouse to submit word.
3. If word is valid, word count and score will be updated.

#Scoring
1. 1 point for words shorter than five letters.
2. 2 points for five-letter words.
3. 3 points for six-letter words.
4. 5 points for seven-letter words.
5. 11 points for words longer than eight letters.

#Technology
Woggle was built using Javascript and jQuery. Woggle implements a binary search to look up words in O(log n) time.
``` javascript
Level.prototype.bsearch = function (dictionary, checkWord) {

  if (dictionary.length === 0) {
  return false;
	}

  var probeIdx = Math.floor(dictionary.length / 2);
  var probe = dictionary[probeIdx];
  if (checkWord.localeCompare(probe) === 0) {
    return true;
  } else if (checkWord.localeCompare(probe) === -1) {
    var left = dictionary.slice(0, probeIdx);
    return this.bsearch(left, checkWord);
  } else {
    var right = dictionary.slice(probeIdx + 1);
		return this.bsearch(right, checkWord);
	}
};
```

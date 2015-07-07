var TrieDispatcher = require('../dispatcher/TrieDispatcher');
var TrieConstants = require('../constants/TrieConstants');

var TrieActions = {
  insert: function (text) {
    TrieDispatcher.dispatch({
      actionType: TrieConstants.TRIE_INSERT_WORD,
      word: text
    });
  },

  search: function (phrase) {
    TrieDispatcher.dispatch({
      actionType: TrieConstants.TRIE_SEARCH_PHRASE,
      phrase: phrase
    });
  },

  clear: function() {
    TrieDispatcher.dispatch({
      actionType: TrieConstants.TRIE_CLEAR
    });
  }
};

module.exports = TrieActions;

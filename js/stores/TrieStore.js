var TrieDispatcher = require('../dispatcher/TrieDispatcher');
var EventEmitter = require('events').EventEmitter;
var TrieConstants = require('../constants/TrieConstants');
var Trie = require('../adt/trie');
var assign = require('object-assign');



var CHANGE_EVENT = 'change';


var _trie = new Trie();
var _path = [];

var TrieStore = assign({}, EventEmitter.prototype, {

  searchPhrase: function (phrase) {
    return _trie.search(phrase);
  },

  getTrie: function() {
    return _trie;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

TrieDispatcher.register(function (action) {

  switch (action.actionType) {
    case TrieConstants.TRIE_INSERT_WORD:
      _trie.insert(action.word);
      TrieStore.emitChange();
      break;
    case TrieConstants.TRIE_SEARCH_PHRASE:
      _path = _trie.pathTo(action.phrase);
      TrieStore.emitChange();
      break;
  }

});

module.exports = TrieStore;

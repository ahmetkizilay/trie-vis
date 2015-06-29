jest.dontMock('../TrieStore');
jest.dontMock('object-assign');

describe('TrieStore', function() {
  var TrieDispatcher;
  var TrieStore;
  var callback;

  beforeEach(function() {
    TrieDispatcher = require('../../dispatcher/TrieDispatcher');
    TrieStore = require('../TrieStore');
    callback = TrieDispatcher.register.mock.calls[0][0];
  });

  it('should register a callback with the dispatcher', function() {
    expect(TrieDispatcher.register.mock.calls.length).toBe(1);
  });

});

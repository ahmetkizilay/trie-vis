jest.dontMock('../trie.js');

describe('trie', function() {
  it('inserts ahmet into the trie', function() {
    var Trie = require('../trie.js');
    var trie = new Trie();

    var testString = 'bob';
    trie.insert(testString);

    var crawl = trie.start;
    var count = 0;

    while (crawl.children.length === 1) {
      expect(crawl.children.length).toBe(1);
      expect(crawl.children[0].val).toEqual(testString[count]);

      crawl = crawl.children[0];
      count += 1;
    }

    expect(count).toBe(3);
  });

  it('it should create a new branch at the top', function() {
    var Trie = require('../trie.js');
    var trie = new Trie();

    trie.start = {
      val: '',
      parent: null,
      children: [{
        val: 'a',
        parent: null,
        children: [{
          val: 'l',
          parent: null,
          children: [{
            val: 'i',
            children: [],
            parent: null
          }]
        }]
      }]
    };

    var testString = 'bob';
    trie.insert(testString);

    expect(trie.start.children.length).toBe(2);
    expect(trie.start.children[1].val).toEqual('b');
    var crawl = trie.start.children[1];
    var count = 1;

    while (crawl.children.length === 1) {
      expect(crawl.children.length).toBe(1);
      expect(crawl.children[0].val).toEqual(testString[count]);

      crawl = crawl.children[0];
      count += 1;
    }

    expect(count).toBe(3);
  });

  it('should create a new branch when new phrease diverges', function() {
    var Trie = require('../trie.js');
    var trie = new Trie();

    trie.start = {
      val: '',
      children: [{
        val: 'a',
        children: [{
          val: 'l',
          children: [{
            val: 'i',
            children: [],
          }]
        }]
      }]
    };

    var testString = 'all';
    trie.insert(testString);

    expect(trie.start).toEqual({
      val: '',
      children: [{
        val: 'a',
        children: [{
          val: 'l',
          children: [{
            val: 'i',
            children: []
          }, {
            val: 'l',
            children: []
          }]
        }]
      }]
    });
  });

  it('should return the remaining trie on matching phrase', function() {
    var Trie = require('../trie.js');
    var trie = new Trie();

    trie.start = {
      val: '',
      children: [{
        val: 'a',
        children: [{
          val: 'l',
          children: [{
            val: 'i',
            children: []
          }, {
            val: 'l',
            children: []
          }]
        }]
      }]
    };

    var testString = 'al';
    expect(trie.search(testString)).toEqual({
        val: 'l',
        children: [{
          val: 'i',
          children: []
        }, {
          val: 'l',
          children: []
        }]
    });
  });

  it('should return the the path for the phrase', function() {
    var Trie = require('../trie.js');
    var trie = new Trie();

    trie.start = {
      val: '',
      children: [{
        val: 'a',
        children: [{
          val: 'l',
          children: [{
            val: 'i',
            children: []
          }, {
            val: 'l',
            children: []
          }]
        }]
      }]
    };

    var testString = 'all';
    expect(trie.pathTo(testString)).toEqual([0, 0, 1]);
  });
});

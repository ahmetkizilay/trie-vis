var node = {
  val: '',
  next: null
}

var Trie = function() {
  this.start = {
    val: '',
    children: []
  }
};

Trie.prototype.insert = function (word) {
  var crawl = this.start;
  var i, j, inserted;
  for (i = 0; i < word.length; i += 1) {
    inserted = false;

    for (j = 0; j < crawl.children.length; j += 1) {
      if (crawl.children[j].val === word[i]) {
        crawl = crawl.children[j];
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      crawl.children.push({
        val: word[i],
        children: []
      });

      crawl = crawl.children[crawl.children.length - 1];
    }
  }
};

Trie.prototype.search = function (phrase) {
  var crawler = this.start;
  var i, j, found;
  for (i = 0; i < phrase.length; i += 1) {
    found = false;
    for (j = 0; j < crawler.children.length; j += 1) {
      if (crawler.children[j].val === phrase[i]) {
        found = true;
        crawler = crawler.children[j];
        break;
      }
    }
    if (!found) {
      return null;
    }
  }

  return crawler;
};

Trie.prototype.pathTo = function (phrase) {
  var path = [];

  var crawler = this.start;
  var i, j, found;
  for (i = 0; i < phrase.length; i += 1) {
    found = false;
    for (j = 0; j < crawler.children.length; j += 1) {
      if (crawler.children[j].val === phrase[i]) {
        found = true;
        crawler = crawler.children[j];
        path.push(j);
        break;
      }
    }
    if (!found) {
      return [];
    }
  }

  return path;
};

module.exports = Trie;

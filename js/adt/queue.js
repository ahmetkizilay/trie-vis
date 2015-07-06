var Queue = function() {
  this.head = {
    next: null
  };
  this.tail = null;
};

Queue.prototype.enqueue = function (val) {
  var newItem = {
    val: val,
    next: null
  };

  if (this.head.next === null) {
    this.head.next = newItem;
  }

  if (this.tail) {
    this.tail.next = newItem
  }
  this.tail = newItem;
};

Queue.prototype.dequeue = function() {
  var item = this.head.next;
  this.head.next = item.next;

  return item.val;
};

Queue.prototype.isEmpty = function() {
  return this.head.next === null;
};

module.exports = Queue;

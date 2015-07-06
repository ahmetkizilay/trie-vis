var Stack = function() {
  this.head = {
    next: null
  };
};

Stack.prototype.pop = function() {
  var item = this.head.next;

  this.head.next = item && item.next ? item.next : null;

  return item.val;
};

Stack.prototype.isEmpty = function() {
  return this.head.next === null;
};

Stack.prototype.push = function (val) {
  var newItem = {
    val: val,
    next: null
  };

  newItem.next = this.head.next;
  this.head.next = newItem;
};

module.exports = Stack;

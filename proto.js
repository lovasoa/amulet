'use strict'; /*jslint node: true, es5: true, indent: 2 */
var base_proto = ({}).__proto__;
// base_proto.__proto__ === null

exports.push = function(object, new_proto) {
  // measure how deep the object goes if it doesn't have a __depth indicator
  if (!object.__depth) {
    var current = object.__proto__;
    for (var i = 0; i < 8; i++) {
      if (current === base_proto) {
        object.__depth = i;
        break;
      }
      current = current.__proto__;
    }
  }
  // don't store the object(.__proto__)+ that gets replaced, since we're assuming it === base_proto
  switch (object.__depth) {
    case 0: object.__proto__ = new_proto; break;
    case 1: object.__proto__.__proto__ = new_proto; break;
    case 2: object.__proto__.__proto__.__proto__ = new_proto; break;
    case 3: object.__proto__.__proto__.__proto__.__proto__ = new_proto; break;
    case 4: object.__proto__.__proto__.__proto__.__proto__.__proto__ = new_proto; break;
    case 5: object.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__ = new_proto; break;
    case 6: object.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__ = new_proto; break;
    case 7: object.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__ = new_proto; break;
    default: console.error("pushProto doesn't handle protos that deep. Sry!"); break;
  }
  object.__depth++;
};

exports.pop = function(object) {
  switch (object.__depth) {
    case 0: console.error("Cannot popProto an object with __depth == 0"); break;
    case 1: object.__proto__ = base_proto; break;
    case 2: object.__proto__.__proto__ = base_proto; break;
    case 3: object.__proto__.__proto__.__proto__ = base_proto; break;
    case 4: object.__proto__.__proto__.__proto__.__proto__ = base_proto; break;
    case 5: object.__proto__.__proto__.__proto__.__proto__.__proto__ = base_proto; break;
    case 6: object.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__ = base_proto; break;
    case 7: object.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__ = base_proto; break;
    case 8: object.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__ = base_proto; break;
    default: console.log("popProto doesn't handle protos that deep."); break;
  }
  object.__depth--;
};
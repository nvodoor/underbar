(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.

  _.identity = function(val) {
    return val
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
   if (n < array.length || n === undefined) {
    return n === undefined ? array[array.length-1] : array.slice(array.length-n,array.length); }
    else {
      return array.slice(0, n);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
      var value = ''
      var key = 0;

      if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
          value = collection[i];
          key = i
          iterator(value,key,collection)
        };
      } else {
        for (var key in collection) {
          value = collection[key];
          key = key;
          iterator(value, key, collection)
        }
      }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {



   return _.reduce(collection, function(memo,item) {
      if (test(item) === true) {
        memo.push(item)
       }
       return memo;
     }, [])


  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var result = [];

    _.each(collection, function(item) {
      if (test(item) === false) {
        result.push(item)
       };
     });

    return result
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {

    var uniqueobject = {};
    var result = [];

    for (var i = 0; i < array.length; i++) {
      if (uniqueobject[array[i]] === undefined) {
        result.push(array[i])
        uniqueobject[array[i]] = 1;
      } else {
        uniqueobject[array[i]] += 1;
      }
    }

    return result
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    return _.reduce(collection, function (value,lock) {
          value.push(iterator(lock));
          return value;
      }, [])


// reduce should be returning an array to be used in map's iterator.
  //  var result = [];
   //
  //  for (var i = 0; i < ans.length; i++) {
  //    result.push(iterator(ans[i]))
  //  }
   //
  //   return result

  };


  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {

    var flag = arguments.length > 2 ? true : false

    _.each(collection,function (item) {
      if (!flag) {
        accumulator = item;
        flag = true
      } else {
        accumulator = iterator(accumulator,item)
      }
    });
      return accumulator
  }


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    var result = true

    for (var i = 0; i < collection.length; i++) {
      if (typeof iterator === 'function') {
        if (iterator(collection[i]) === null || iterator(collection[i]) === false || iterator(collection[i]) === undefined || iterator(collection[i]) === 0) {
          result = false;
        }
      }
      if (typeof iterator === 'undefined') {
        if (collection[i] === null || collection[i] === false || collection[i] === undefined || collection[i] === 0) {
          result = false;
        }
      }
    }

    return result
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (typeof iterator === 'undefined') {
      iterator = _.identity
    }
    var result = false;

    for (var i = 0; i < collection.length; i++) {
        if (iterator(collection[i]) === true || typeof iterator(collection[i]) === 'number' && collection[i] !== 0 || typeof iterator(collection[i]) === 'string') {
          result = true;
          break;
        }
      }


    return result
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {

     // use each
     // create new keys

     // _.each(source1, function (value, key) {
     //    obj[key] = value;
     // })

     // _.each(source2, function (value, key) {
     //    obj[key] = value;
     // })

     // return obj

         _.each(arguments, function (argument) {
        _.each(argument, function (value, key) {
          obj[key] = value;
        })
    })

    return obj

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function (argument) {
      _.each(argument, function (value, key) {
        if (obj[key] === undefined) {
          obj[key] = value;
        }

      })
    })
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {


    // create object, store arguments as keys and values as results
    // if key already exists, return value
    // if key does not exist, create new key with new value
    // where the object is created
    // what this function is returnin
    // reference once

    var result = {};

    return function () {
      var mummify = JSON.stringify(arguments)

      if (mummify in result) {
        return result[mummify]
      }

      var value = func.apply(this, arguments)

      if (result[mummify] === undefined) {
        result[mummify] = value;
      }
      return result[mummify]
    }

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    return setTimeout.apply(this,arguments);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {

    var shuffled = [];

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    while (shuffled.length < array.length) {
      var randomNum = getRandomIntInclusive(0, array.length-1)
      if (shuffled.includes(array[randomNum])) {
        continue;
      }
      shuffled.push(array[randomNum]);
    }

    return shuffled
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    if (typeof functionOrKey === 'function') {
      return _.map(collection, function(x) {
        return functionOrKey.apply(x, arguments)
      })
    };
    return _.map(collection, function(x) {
      return x[functionOrKey](arguments)
     })
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

    if (typeof iterator === 'string') {
      return collection.sort(function (a, b) {
        return a[iterator] - b[iterator]
      })
    } else {
    return collection.sort(function (a, b) {
      return iterator(a) - iterator(b);
      })
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
       // something something arguments
    // pair arrays up by index
    // if no pair exists, then undefined
    // returns giant array -> push arrays in giant array

    // var args = Array.prototype.slice.call(arguments);
    // var sortedArgs = args.sort(args, function(a, b){
    //   return b.length - a.length;
    // });

    var results = [];
    // use two nested for loops.
    for (var i = 0; i < arguments[0].length; i++) {
      var holder = [];
      for (var j = 0; j < arguments.length; j++) {
        holder.push(arguments[j][i]);
      }
      results.push(holder)
    }

    return results
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

    result = [];
    for (var i = 0; i<nestedArray.length; i++) {
      if (Array.isArray(nestedArray[i])) {
        result = result.concat(_.flatten(nestedArray[i], result));
      } else {
        result.push(nestedArray[i]);
      }
    }
    return result;




  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments);
    var results = [];
    for (var i = 0; i < args[0].length; i++) {
     if (_.contains(args[i], args[0][i]) === true) {
       results.push(args[0][i])
     }
    };

    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {

    var args = Array.prototype.slice.call(arguments);
    var results = [];
    for (var i = 0; i < args[0].length; i++) {
      if (args[0][i] === args[0][0] && arguments.length <= 2) {
          if (args[1][0] !== args[0][0]) {
            results.push(args[0][0])
          }
      }
     if (_.contains(args[i], args[0][i]) === false) {
       results.push(args[0][i])
     }
    };

    return results;

    //     for (var i = 1; i<args.length; i++) {
    //   for (var j = 0; j<args[i].length; j++)
    //     if (_.contains(args[i], args[0][j])) {
    //       sameElements.push(args[0][j]);
    //   }
    // }
    // var result = args[0];
    // for (var i = 0; i<sameElements.length; i++) {
    //   var deleteIndex=0;
    //   deleteIndex = _.indexOf(args[0], sameElements[i]);
    //   result.splice(deleteIndex, 1);
    // }
    // return result;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
   // use setTimeout to wait
    // need a boolean to run when it's false, and when it runs once set true.
    // if statement to check that boolean
    var waiting = false;
    return function() {
      if (!waiting) {
        func();
        waiting = true;
        setTimeout(function() {waiting = false;}, wait);
      }
    }


  };
}());

const fn = array => {
  var res = Math.max.apply(
    Math,
    array.map(function(o) {
      return o.confidence;
    })
  );

  var obj = array.find(function(o) {
    return o.confidence == res;
  });

  return JSON.stringify(obj);
};

module.exports = fn;

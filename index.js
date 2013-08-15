'use strict';
var slice = [].slice
  , SourceMapConsumer = require('source-map').SourceMapConsumer
  , SourceMapGenerator = require('source-map').SourceMapGenerator
module.exports = function() {
  var args = slice.call(arguments).filter(Boolean).map(convert)
    , last = args.pop()
  if (!args.length) return last
  var compoundMap = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(last))
  args.reverse().forEach(function(map) {
    compoundMap.applySourceMap(new SourceMapConsumer(map))
  })
  return compoundMap
}

function convert(obj) {
  return typeof obj == 'string'
    ? JSON.parse(obj)
    : typeof obj.sourcemap == 'object'
      ? obj.sourcemap
      : obj
}

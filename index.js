var attr = require('utilise.attr')
  , split = require('utilise.split')
  , replace = require('utilise.replace')
  , prepend = require('utilise.prepend')

module.exports = function el(selector){
  var attrs = []
    , css = selector.replace(/\[(.+?)=(.*?)\]/g, function($1, $2, $3){ attrs.push([$2, $3]); return '' }).split('.')
    , tag  = css.shift()
    , elem = document.createElement(tag)

  attrs.forEach(function(d){ attr(elem, d[0], d[1]) })
  css.forEach(function(d){ elem.classList.add(d)})
  elem.toString = function(){ return tag + css.map(prepend('.')).join('') }

  return elem
}
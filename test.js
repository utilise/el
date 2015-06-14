var expect = require('chai').expect
  , client = require('client')
  , shim = !client && polyfill()
  , attr = require('attr')
  , el = require('./')

describe('el', function() {

  it('should append only one div by default', function() {
    var node = el('foo-bar.classA.classB[attr1=value1][attr2=value2]')
    expect(node.className).to.be.eql('classA classB')
    expect(attr(node, 'attr1')).to.be.eql('value1')
    expect(attr(node, 'attr2')).to.be.eql('value2')
  })

  it('should output selector as toString', function() {
    var node = el('foo-bar.classA.classB[attr1=value1][attr2=value2]')
    expect(node.toString()).to.be.eql('foo-bar.classA.classB')
  })

})

function polyfill(){
  window = require("jsdom").jsdom('<div>').defaultView
  global.document = window.document
  document.createElement = createElement()
}

function createElement(){
  var proxy = document.createElement
  return function(){
    var created = proxy.apply(this, arguments)
    created.classList = { add: add(created) }
    return created
  }
}

function add(element){
  return function(d){
    /* istanbul ignore next */
    if (~element.className.indexOf(d)) return;
    element.className += ' ' + d
    element.className = element.className.trim()
  }
}
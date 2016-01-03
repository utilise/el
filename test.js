var expect = require('chai').expect
  , client = require('utilise.client')
  , shim = !client && polyfill()
  , attr = require('utilise.attr')
  , el = require('./')

describe('el', function() {

  it('should create element from selector string', function() {
    var node = el('foo-bar.classA.classB[attr1=value1][attr2=value2]')
    expect(node.nodeName).to.be.eql('FOO-BAR')
    expect(node.className).to.be.eql('classA classB')
    expect(attr(node, 'attr1')).to.be.eql('value1')
    expect(attr(node, 'attr2')).to.be.eql('value2')
  })

  it('should output selector as toString', function() {
    var node = el('foo-bar.classA.classB[attr1=value1][attr2=value2]')
    expect(node.toString()).to.be.eql('foo-bar.classA.classB')
  })

  it('should allow arbitrary attr placement', function() {
    var node = el('foo-bar[attr1=value1][attr2=value2].classA.classB')
    expect(node.nodeName).to.be.eql('FOO-BAR')
    expect(node.className).to.be.eql('classA classB')
    expect(attr(node, 'attr1')).to.be.eql('value1')
    expect(attr(node, 'attr2')).to.be.eql('value2')
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
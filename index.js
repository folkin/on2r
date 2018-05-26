function Card(state, name, region, id) {
  this.state = state;
  this.name = name;
  this.region = region;
  this.id = id || state
}

function Deck() {
  this.cards = [];
  this.discards = [];
  this.initialize();
}

Deck.prototype = function() {
  function initialize() {
    this.cards = [
      new Card("AL", "Alabama", "South"),
      new Card("AR", "Arkansas", "Central"),
      new Card("AZ", "Arizona", "South"),
      new Card("CA", "California", "West"),
      new Card("CO", "Colorado", "South"),
      new Card("FL", "Florida", "East"),
      new Card("GA", "Georgia", "South"),
      new Card("IA", "Iowa", "Central"),
      new Card("ID", "Idaho", "West"),
      new Card("IL", "Illinois", "North"),
      new Card("IN", "Indiana", "Central"),
      new Card("KS", "Kansas", "Central"),
      new Card("KY", "Kentucky", "South"),
      new Card("LA", "Louisiana", "Central"),
      new Card("NE", "New England", "East", "MA"),
      new Card("MC", "Mid Coastal", "East"),
      new Card("MI", "Michigan", "North"),
      new Card("MN", "Minnisota", "North"),
      new Card("MO", "Missouri", "South"),
      new Card("MS", "Mississippi", "East"),
      new Card("MT", "Montana", "North"),
      new Card("NC", "North Carolina", "East"),
      new Card("ND", "North Dakota", "North"),
      new Card("NE", "Nebraska", "North"),
      new Card("NM", "New Mexico", "West"),
      new Card("NV", "Nevada", "South"),
      new Card("NY", "New York", "North"),
      new Card("OH", "Ohio", "North"),
      new Card("OK", "Oklahoma", "South"),
      new Card("OR", "Oregon", "North"),
      new Card("PA", "Pennsylvania", "East"),
      new Card("SC", "South Carolina", "East"),
      new Card("SD", "South Dakota", "Central"),
      new Card("TN", "Tennessee", "South"),
      new Card("TX", "Texas", "South"),
      new Card("UT", "Utah", "West"),
      new Card("VA", "Viginia", "East"),
      new Card("WA", "Washington", "West"),
      new Card("WI", "Wisconsin", "Central"),
      new Card("WV", "West Virginia", "North"),
      new Card("WY", "Wyoming", "West")
    ];
    this.shuffle();
  }

  function draw() {
    if (this.cards.length === 0) {
      this.shuffle();
    }
    return this.cards.shift();
  }

  function discard(card) {
    this.discards.push(card);
  }

  function shuffle() {
    var index = this.cards.length;
    var random = 0;
    var temp = 0;
    var loop = 0;

    while (this.discards.length) {
      this.cards.push(this.discards.pop());
    }
    for (loop = 0; loop < 5; loop++) {
      index = this.cards.length;
      while (0 !== index) {
        random = Math.floor(Math.random() * index);
        index -= 1;
        temp = this.cards[index];
        this.cards[index] = this.cards[random];
        this.cards[random] = temp;
      }
    }
  };
  
  return {
    initialize: initialize,
    draw: draw,
    discard: discard,
    shuffle: shuffle
  };
}();

function Game() {
  this.deck = new Deck();
  this.cards = [];
  this.d1 = 0;
  this.d2 = 0;
  this.tick = 0;
  this.next();
}

Game.prototype = function() {
  function next() {
    if (this.tick <= 2) {
      this.cards.length = 0;
    }
    if (this.tick < 2) {
      this.cards.push(this.deck.draw());
      this.cards.push(this.deck.draw());
    }
    else {
      while (this.cards.length > 0) {
        this.deck.discard(this.cards.pop());
      }
      for (var i = 0; i < 3; i++) {
        this.cards.push(this.deck.draw());
      }
    }
    this.d1 = Math.floor(Math.random() * 10);
    this.d2 = Math.floor(Math.random() * 10);
    this.tick++;
  }

  return {
    next: next
  };
}();


(function() {
  var template = document.getElementById("template").innerHTML;
  var map = document.getElementById("map").innerHTML;
  Vue.component('us-map', {
    template: map
  });
  var app = new Vue({
    el: '#app',
    template: template,
    data: {
      game: new Game()
    },
    methods: {
      next: function() {
        this.game.next();
      },
      cardClass: function(card) {
        return [ 'card', 'mt-2', card.region.toLowerCase(), card.id ]; 
      }
    }
  })
})();
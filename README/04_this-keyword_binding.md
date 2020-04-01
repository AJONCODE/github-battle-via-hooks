/*
    Implicit Binding
    Explicit Binding
    new Binding
    window Binding
*/

// Implicit Binding
// Where is this function invoked?
var sayName = function(name){
 console.log('Hello, ' + name);
}

sayName('Nainggolan');
/*
    #OUTPUT :
    Hello, Nainggolan
*/

// Implicit Binding
// - look at left of the dot at the call time
// -- this keyword is referencing to the left of the dot

var me = {
 name: 'Nainggolan',
 club: 'Manchester United',
 sayName: function(){
   console.log(this.name);

 }
};

me.sayName();
/*
    #OUTPUT :
    Nainggolan
*/

var sayNameMixin = function(obj){
 obj.sayName = function(){
   console.log(this.name + ":" + this.club)
 };
}

var meObj = {
 name: 'Nainggolan',
 club: 'Manchester United'
};

var youObj = {
 name: 'Sneijder',
 club: 'Manchester United'
};

sayNameMixin(meObj);
sayNameMixin(youObj);

meObj.sayName();


/*
    #OUTPUT :
    Nainggolan:Manchester United
*/

youObj.sayName();

/*
    #OUTPUT :
    Sneijder:Manchester United
*/

var Person = function(name, club) {
 return {
   name,
   club,
   sayName: function(){
     console.log(this.name + ":" + this.club)
   },
   manager: {
     name: 'Simone',
     club: 'Atletico Madrid',
     sayName: function(){
       console.log(this.name + ":" + this.club);
     }
   }
 };
}

var nainggolan = Person('Nainggolan', 'Manchester United');
var sneijder = Person('Sneijder', 'Manchester United');

nainggolan.sayName();
/*
    #OUTPUT :
    Nainggolan:Manchester United
*/
sneijder.sayName();
/*
    #OUTPUT :
    Sneijder:Manchester United
*/
sneijder.manager.sayName();
/*
    #OUTPUT :
    Simone:Atletico Madrid
*/



// Explicit Binding
// call, apply, bind

/*
  call
    -- “call” is a method on every function that allows you to invoke the
    function specifying in what context the function will be invoked.
    -- in order to pass arguments to a function being invoked with ".call", you
    pass them in one by one after you specify the first argument which is the
    context
*/
var sayName = function(){
  console.log(this.name + ":" + this.club);
}

var sayInfo = function(club1, club2){
  console.log(this.name + ":" + this.club + ". Former clubs include : " + club1
  + ", " + club2 + ".");
}

var player = {
  name: 'Nainggolan',
  club: 'Manchester United'
};

sayName.call(player);
/*
    #OUTPUT :
    Nainggolan:Manchester United
*/

let formerClubs = ['AS Roma', 'Inter Milan'];
sayInfo.call(player, formerClubs[0], formerClubs[1]);
/*
    #OUTPUT :
    Nainggolan:Manchester United. Former clubs include : AS Roma, Inter Milan.
*/


// apply
/*
  apply
    -- ".apply" is the exact same thing as ".call", but instead of passing in
    arguments one by one, you can pass in a single array and it will spread
    each element in the array out for you as arguments to the function.
*/
sayInfo.apply(player, formerClubs);
/*
    #OUTPUT :
    Nainggolan:Manchester United. Former clubs include : AS Roma, Inter Milan.
*/

// bind
var infoFunc = sayInfo.bind(player, formerClubs[0], formerClubs[1]);
infoFunc();
/*
    #OUTPUT :
    Nainggolan:Manchester United. Former clubs include : AS Roma, Inter Milan.
*/

/*
  - `.call` as well as `.apply` allows us to invoke a function, specifying what
  the this keyword is going to be referencing inside of that function.
  - `.apply` is the exact same thing as `.call`, but instead of passing in
  arguments one by one, we can pass in a single array and it will spread each
  element in the array out for us as arguments to the function.
  - `.bind` is the exact same as `.call` but instead of immediately invoking the
  function, it’ll return a new function that we can invoke at a later time.
*/


// new binding
/*
  whenever we invoke a function with the `new` keyword, under the hood, the
  JavaScript interpretor will create a brand new object for us and call it
  `this`. So, naturally, if a function was called with `new`, the `this`
  keyword is referencing that new object that the interpretor created.
*/
var Player = function(club, position, jersey) {
  this.club = club;
  this.position = position;
  this.jersey = jersey;

  console.log('Nainggolan ' + this.position + ':' + this.jersey + ':' +
  this.club);
}

var nainggolan = new Player('Manchester United', 'CMF', 14);
/*
  #OUTPUT
  Nainggolan CMF:14:Manchester United
*/

// window binding
/*
  window binding
    -- if none of the other binding rules are met, then JavaScript will default
    the "this" keyword to reference the window object.
*/
var sayPlayerName = function() {
  console.log(this.name);
};

var playerName = {
  name: 'Radga Nainggolan'
};

sayPlayerName();
/*
  #OUTPUT
  undefined
*/
window.name = 'Radga Nainggolan';
sayPlayerName();
/*
  #OUTPUT
  Radga Nainggolan
*/

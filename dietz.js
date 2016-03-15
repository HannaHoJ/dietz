

//items = new Mongo.Collection("items");


if (Meteor.isClient) {
  /*// This code only runs on the client
  Template.body.helpers({
    items: function () {
      return items.find({});
    }
  });
}
*/


  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


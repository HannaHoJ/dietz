var Items = new Mongo.Collection("items");


if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
        items: function() {
            return [{
                title: 'Bauernbrot',
                price: '3,50',
                image: 'http://www.baecker-baier.de/wp-content/uploads/2014/05/1315-SaatenQuark.jpg',
                ingredients1: '70% Roggenmehl Type 1150',
                ingredients2: '30% Weizenmehl Type 1050',
                Triebmittel: 'Sauerteig',
            }, {
                title: 'Dinkelbrot',
                price: '4,50',
                image: 'http://www.baecker-baier.de/wp-content/uploads/2010/03/12-DinkelFerment-1.jpg',
                ingredients1: '100% Dinkelmehl Type 1050',
                Triebmittel: 'Sauerteig'
            }]; //Items.find({});
        }
    });





    Template.hello.helpers({
        counter: function() {
            return Session.get('counter');
        }
    });

    Template.hello.events({
        'click button': function() {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}

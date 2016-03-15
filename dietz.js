var Items = new Mongo.Collection("items");


if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
        items: function() {
        // Show newest tasks at the top
        return Items.find({}, {sort: {createdAt: -1}});
            
/*            [{
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
            }]; */
        }
    });


  Template.body.events({
    "submit .new-item": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      //Get value from form element
      var title = event.target.title.value;
      var price = event.target.price.value;
      var image = event.target.image.value;
      var ingredients1 = event.target.ingredients1.value;
      var triebmittel = event.target.triebmittel.value;
      // Insert a task into the collection
      console.log("asdf");
      Items.insert({
        title: title,
        price: price,
        image: image,
        ingredients1: ingredients1,
        triebmittel: triebmittel,
        createdAt: new Date() // current time
      });
      // Clear form
      event.target.title.value = "";
    }
  });
    Template.item.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Items.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Items.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}

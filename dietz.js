var Items = new Mongo.Collection("items");
var Carts = new Mongo.Collection("carts");


if (Meteor.isClient) {
    //define subtotal outside of helper and call it in helpers
    //since you dont have access to the helpers in the helers functions.


    var subtotal = function() {
        var subtotalPrice = 0;
        var cart = Carts.findOne({});
        cart.items(function(item) {
            subtotalPrice += subtotal(item)
        })
        return subtotalPrice
    }


    // This code only runs on the client
    Template.body.helpers({
        items: function() {
            // Show newest tasks at the top
            return Items.find({}, { sort: { createdAt: -1 } });
        },
        cartItems: function() {
            return Carts.find({}, { sort: { createdAt: -1 } });
        },
        cart: function() {
            return Carts.findOne({});
        },
        subtotal: subtotal,
        total: function() {
            var totalPrice = 0;
            var cart = Carts.findOne({});
            cart.items(function(item) {
                totalPrice += subtotal(item)
            })
            return totalPrice
        }
    });

    // .insert in Mongo Collection
    //   {item:[{
    //       productId: 12345,
    //       price: 4.50,
    //       qty: 2
    //   }]}


    Template.body.events({
        "submit .new-item": function(event) {
            // Prevent default browser form submit
            event.preventDefault();
            //Get value from form element
            var title = event.target.title.value;
            var price = event.target.price.value;
            var image = event.target.image.value;
            var ingredients = event.target.ingredients.value;
            var triebmittel = event.target.triebmittel.value;

            // Insert a task into the collection
            console.log("asdf");
            Items.insert({
                title: title,
                price: price,
                image: image,
                ingredients: ingredients,
                triebmittel: triebmittel,
                createdAt: new Date() // current time
            });
            // Clear form
            event.target.title.value = "";
            event.target.price.value = "";
            event.target.image.value = "";
            event.target.ingredients.value = "";
            event.target.triebmittel.value = "";


        },
        "click .menu": function() {
            $('#mainmenue').slideToggle();
        },

        "click #mainmenue a": function(event) {
            var sectionName = $(event.currentTarget).data('category');
            $('.section').slideUp();
            $('#' + sectionName).slideDown();
        }
    });

    Template.item.events({
        "click .toggle-checked": function() {
            // Set the checked property to the opposite of its current value
            Items.update(this._id, {
                $set: { checked: !this.checked }
            });
        },
        "click .addToCart": function(event) {
            var form = $(event.target).parent('.item');
            var title = form.find('.title').html();
            var userId = form.find('.userId').html();
            var qty = form.find('.qty').val();
            var price = form.find('.price').html();
            var productId = form.find('.productId').html();
            //var subtotal = form.find('.subtotal').val();
            //TODO: correctly insert into carts (put the bread in the cart)
            Carts.insert({
                    title: title,
                    productId: productId,
                    userId: userId,
                    price: price,
                    qty: qty,
                    //subtotal: subtotal
            });
            Carts.insert(this);
        },
        "click .delete": function() {
            Items.remove(this._id);
        }
    });

    Template.cart.events({
        "click .toggle-checked": function() {
            // Set the checked property to the opposite of its current value
            Carts.update(this._id, {
                $set: { checked: !this.checked }
            });
        },
        "click .delete": function() {
            Carts.remove(this._id);
        }
    });
}




if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}

// Business Logic for ToDoList ----
function ToDoList() {
  this.items = []
  this.currentId = 0 //each time a new ToDoList is created, it will have a currentId property that begins at 0
}

ToDoList.prototype.addItem = function(item) {
  item.id = this.assignId(); //calls new assignId method whenever a new item is added to the ToDoList
  this.items.push(item);
}

ToDoList.prototype.assignId = function() { //uses currentId iteration number as ref creates unique ID for each new item
  this.currentId += 1;
  return this.currentId;
}

ToDoList.prototype.findItem = function(id) {
  for (var i=0; i < this.items.length; i++) {
    if (this.items[i]) {
      if (this.items[i].id == id) {
        return this.items[i];
      }
    }
  };
  return false;
}

ToDoList.prototype.deleteItem = function(id) {
  for (var i=0; i< this.items.length; i++) {
    if (this.items[i]) {
      if (this.items[i].id == id) {
        delete this.items[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for items ---

function Item(itemName) {
  this.itemName = itemName
}


//UI Logic -----
var ToDoList= new ToDoList();

function displayItemDetails(ToDoListToDisplay) {
  var itemsList = $("ul#list-items"); //saves jQuery ul#items element in a variable to prevent it from later querying the DOM again if we use the selector again
  var htmlForItemInfo = "";
  ToDoListToDisplay.items.forEach(function(item) {
    htmlForItemInfo += "<li id=" + item.id + ">" + item.itemName + "</li>";
  });
  itemsList.html(htmlForItemInfo);

};

function showItem(itemId) {
  var item = ToDoList.findItem(itemId);
  $("#itemsList").show();
  $(".show-list-item").html(item.itemName);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='crossoff' id=" + + item.id + ">Complete</button>");
}

function attachItemListeners() {
  $("ul#list-items").on("click", "li", function() {
    showItem(this.id);
  });
  $("buttons").on(".deleteButton", function () {
    ToDoList.deleteItem(this.id);
    $("#list-items").show();
    displayItemDetails(ToDoList);
  });

};

$(document).ready(function() {
  attachItemListeners ();
  $("form#new-item").submit(function(event) {
    event.preventDefault();
    var inputtedListItem = $("input#new-item").val();

    $("input#new-item").val("");

    var newitem = new Item(inputtedListItem);
    ToDoList.addItem(newitem);
    //console.log(ToDoList.items);
    displayItemDetails(ToDoList); //replaces console.log above
  })
})

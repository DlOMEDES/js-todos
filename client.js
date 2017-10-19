// THE MODEL
var todoList ={
 todos: [],
// displayTodos: function() {
//     if(this.todos.length === 0) {
//       console.log('Todo List is empty!');
//     } else {
//       console.log('my todos: ');
//       for(var i = 0; i<this.todos.length; i++) {
//         //  check if completed
//         if(this.todos[i].completed) {
//           // display (x)  
//           console.log('(x)', this.todos[i].todoText);
//         } else {
//         // or () 
//         console.log('( )', this.todos[i].todoText);
//         }
//       }
//     }
//   },
  
  addTodos: function(todoTxt) {
    this.todos.push({
     todoText: todoTxt,
     completed: false
    });
    // this.displayTodos();
  },
 
  changeTodos: function(position, todoText) {
  // this.todos[position] = newTodo;
  this.todos[position].todoText = todoText;
  // this.displayTodos();
 },
 
  deleteTodos: function(position) {
    this.todos.splice(position, 1);
    // this.displayTodos();
  },
  
  toggleCompleted: function(position) {
    // this.todos[position].completed = !this.todos[position].completed;
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    // this.displayTodos();
  },
  
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // get number of completed todos
    // for(var i = 0; i < totalTodos; i++) {
    //   if(this.todos[i].completed === true) {
    //     completedTodos++;
    //   }
    // }
    
    // using forEach for loops, forEach is only for arrays
    // forEach takes one parameter function
    this.todos.forEach(function(todo) {
      if(todo.completed) {
        completedTodos++;
      }
    });

    // toggle all if everything is true to make everything false
//     if(completedTodos === totalTodos) {
//       // make everything false
//       // for(i = 0; i < totalTodos; i++) {
//       //   this.todos[i].completed = false;
//       // }
      
//       this.todos.forEach(function(tod) {
//         tod.completed = false;
//       });
      
//     } else {
//       // for(i = 0; i < totalTodos; i++) {
//       //   this.todos[i].completed = true;
//       // }
      
//       this.todos.forEach(function(todoo) {
//         todoo.completed = true;
//       });
      
//     }
    // this.displayTodos();
    
    this.todos.forEach(function(todo) {
      if(todo.completed === totalTodos ) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
};

// grab DOM button elements
// var displayTodos = document.getElementById('displayBtn');
// var toggleAll = document.getElementById('toggleBtn');

// // run methods when button is clicked 
// displayTodos.addEventListener('click', function() {
//   todoList.displayTodos();
// });

// displayTodos.addEventListener('click', function() {
//   todoList.displayTodos();
// });


// THE CONTROLLER
var handlers = {
  // displayTodos: function() {
  //   todoList.displayTodos();
  // },
  addTodo: function() {
    var addInput = document.getElementById('addInput');
    todoList.addTodos(addInput.value);
    addInput.value = '';
    view.displayTodos();
  },
  changeTodos: function() {
    var changePositionInput = document.getElementById('changePositionInput');
    var changeTextInput = document.getElementById('changeTextInput');
    todoList.changeTodos(changePositionInput.valueAsNumber, changeTextInput.value)
    changePositionInput.value = '';
    changeTextInput.value = '';
    view.displayTodos();
  },
  toggle: function() {
    var toggleItem = document.getElementById('toggleItem');
    todoList.toggleCompleted(toggleItem.valueAsNumber);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  delete: function(position) {
    todoList.deleteTodos(position);
    view.displayTodos();
  }
};

// THE VIEW
var view = {
  displayTodos: function() {
    var listUl = document.getElementById('list');
    listUl.innerHTML = '';
    for(var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoWithX = '';
      
      if(todo.completed) {
        todoWithX = '(x) ' + todo.todoText;
      } else {
        todoWithX = '( ) ' + todo.todoText;
      }
      // find the id of targeted item for delete button
      todoLi.id = i;
      
      todoLi.textContent = todoWithX;
      todoLi.appendChild(this.deleteButton());
      listUl.appendChild(todoLi);
    }
  },
  deleteButton: function() {
    // create delete button
    var deleteBtn = document.createElement('button');
    // add text to delete button
    deleteBtn.textContent = 'Delete';
    // add a class to the button
    deleteBtn.className = 'deleteButton';
    return deleteBtn;
  },
  setEventListeners: function() {
    // delete buttons should have acceess to todo id
    var todoUl = document.querySelector('ul');

    todoUl.addEventListener('click', function(event) {
      // console.log(event.target.parentNode.id);
      // get element that was clicked
      var elClicked = event.target;

      // check if element clicked is a delete button
      if(elClicked.className === 'deleteButton') {
        // run handlers delete todo
        handlers.delete(parseInt(elClicked.parentNode.id));

      }
    });    
  }
};

view.setEventListeners();



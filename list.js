$ = function(_id) {
  return document.getElementById(_id);
}
_bind = function(func, that) {
  return function() {
    func.call(that)
  }
}

class TodoView {
  constructor(myList, finishedListView) {
    this.myList = myList;
    this.todoListView = $("list-content");
    this.finishedListView = $("finished-list-content");
    this.todoView = $("todo-view");
    this.finishedView = $("finished-view");
    this.todoInput = $("input-content");

    for (var i = 0; i < myList.list.length; i++) {
      var item = myList.list[i];
      if (item.pending) {
        this.todoListView.appendChild(todoDomItem(item));
      }
      else {
        this.finishedListView.appendChild(finishedDomItem(item));
      }
    }
    this.toggleView();
    this.bind()
  }
  
  bind() {
    console.log(document.getElementById('button-add-item'));
    console.log(document.getElementById('input-content'));
    $("#button-add-item").addEventListener('click', this.addBtnListner.bind(this));
    $("#button-return").addEventListener('click', this.toggleView.bind(this));
    $("#button-view-finished").addEventListener('click', this.toggleView.bind(this));
    
    $("#input-content").addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            this.addBtnListner();  // You don't need to rebind inside here
        }
    });
}

  toggleView() {
    if (this._state == "todo") {
      this.todoView.className = "hidden";
      this.finishedView.className = "";
      this._state = "finished";
    }
    else {
      this.todoView.className = "";
      this.finishedView.className = "hidden";
      this._state = "todo";
    }
  }

  addBtnListner() {
    var content = this.todoInput.value;
    if (content.length == 0)
      alert('NOTHING TO ADD.');
    else{
      var item = new TodoItem(content);
      this.myList.addTask(item);

      var domItem = todoDomItem(item);
      this.todoListView.appendChild(domItem);
      this.todoInput.value = "";
    }
  }
}

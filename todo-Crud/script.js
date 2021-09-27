var app = new function() {
    this.el = document.getElementById('tasks'); //pega tasks do table body
  
    this.tasks = []; //tasks = array vazio
  
    
    
    this.FetchAll = function() { //a tarefa desta função é fazer o display dos items a fazer (to do) = READ
      var data = ''; // data é o que vai ser demonstrado na linha do item
  
      if (this.tasks.length > 0) { // só fazer o display dos itens se os mesmos existirem na array da to-do list
        for (i = 0; i < this.tasks.length; i++) {
          data += '<tr>'; // data = um novo table row
          data += '<td>'+(i+1)+". " + this.tasks[i] + '</td>'; //data = uma nova célula com uma count list e a task em seguida
          data += '<td><button onclick="app.Edit(' + i + ')"  class="btn btn-warning">Edit</button></td>';
          data += '<td><button onclick="app.Delete(' + i + ')"  class="btn btn-danger">Delete</button></td>';
          data += '</tr>';
        }
      }
  
      this.Count(this.tasks.length);
      return this.el.innerHTML = data;
    };
  
    this.Add = function () { //adicionar elementos na lista = CREATE
      el = document.getElementById('add-todo'); // add-todo = botão
      var task = el.value; // o valor contido dentro do input
  
      if (task) { // se houver uma task dentro do input, ela será colocada dentro do array
        this.tasks.push(task.trim()); //trim remove espaços em branco
        
        el.value = ''; // o input retorna a ficar vazio após o push
       
        this.FetchAll(); // chamada da FecthAll para fazer o display
      }
    };
  
    this.Edit = function (item) { //edita os itens existentes = UPDATE
      var el = document.getElementById('edit-todo');
      
      el.value = this.tasks[item];
      
      document.getElementById('edit-box').style.display = 'block'; // display da edit box (antes era none, agora é block)
      self = this;
      
      //agora é necessária uma função para quando o save button na submit box é clicado
      document.getElementById('save-edit').onsubmit = function() {
        
        var task = el.value;
  
        if (task) { //se existir uma task 
          
          self.tasks.splice(item, 1, task.trim()); // pega o item, deleta um item no array e add a new task
          
          self.FetchAll();
          
          CloseInput(); // fechar a box
        }
      }
    };
  
    this.Delete = function (item) {
      
      this.tasks.splice(item, 1);
     
      this.FetchAll();
    };
  
    this.Count = function(data) {
      var el   = document.getElementById('counter');
      var name = 'Tasks';
  
      if (data) {
          if(data ==1){ // se data é igual a um 
              name = 'Task' // nome no singular
          }
        el.innerHTML = data + ' ' + name ;
      } 
      else {
        el.innerHTML = 'No ' + name;
      }
    };
    
  }
  
  app.FetchAll(); //chamada da FetchAll para sempre ocorrer o update da lista
  
  function CloseInput() { // para fechar o edit-box
    document.getElementById('edit-box').style.display = 'none';
  }
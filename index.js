Object.defineProperty(Object.prototype, Symbol.iterator, {
    enumerable: false,
    value: function * (){
        for(let key in this){
            if(this.hasOwnProperty(key)){
                yield [key, this[key]];
            }
        }
    }
});


function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/api/v1/meetings");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.response);
        var trHTML = ''; 
        var json = JSON.parse(xhttp.responseText);
var objects = json.reuniones; // or json["Data"]
        for (let object of objects) {
          trHTML += '<tr>'; 
          trHTML += '<td>'+object['_id']+'</td>';
           trHTML += '<td>'+object['titulo']+'</td>';
          trHTML += '<td>'+object['descripcion']+'</td>';
          //trHTML += '<td>'+object['username']+'</td>';
          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['_id']+')">Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['_id']+')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();

  function showUserCreateBox() {
    Swal.fire({
      title: 'Crear reunion',
      html:
        '<input id="id" type="hidden">' +
        '<input id="titulo" class="swal2-input" placeholder="titulo">' +
        '<input id="descripcion" class="swal2-input" placeholder="descripcion">',
        //'<input id="username" class="swal2-input" placeholder="Username">',
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
  }
  
  function userCreate() {
    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    //const username = document.getElementById("username").value;
    //const email = document.getElementById("email").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/api/v1/meetings");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "titulo": titulo, "descripcion": descripcion, 
    
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['reuniones']);
        loadTable();
      }
    };
  }

  function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/api/v1/meetings/"+id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const user = objects['reuniones'];
        console.log(user);
        Swal.fire({
          title: 'Editar reunion',
          html:
            '<input id="id" type="hidden" value='+user['_id']+'>' +
            '<input id="titulo" class="swal2-input" placeholder="Titulo" value="'+user['titulo']+'">' +
            '<input id="descripcion" class="swal2-input" placeholder="Descripcion" value="'+user['descripcion']+'">' ,
            //'<input id="username" class="swal2-input" placeholder="Username" value="'+user['username']+'">' +
            //'<input id="email" class="swal2-input" placeholder="Email" value="'+user['email']+'">',
          focusConfirm: false,
          preConfirm: () => {
            userEdit();
          }
        })
      }
    };
  }
  
  function userEdit() {
    const id = document.getElementById("id").value;
    const fname = document.getElementById("titulo").value;
    const lname = document.getElementById("descripcion").value;
    //const username = document.getElementById("username").value;
    //const email = document.getElementById("email").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:3000/api/v1/meetings");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "_id": id, "titulo": fname, "descripcion": lname,  
   
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['reuniones']);
        loadTable();
      }
    };
  }
  function userDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/api/v1/meetings");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "_id": id
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['reuniones']);
        loadTable();
      } 
    };
  }
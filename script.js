// UI vars

// eleman tanımlama işlemini burada yapıyoruz.

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;
// load items
loadItems();

// call event listener.

eventListeners(); // bunu burada çağırmamızın sebebi uygulama başladığında gelsin

function eventListeners() {
  // submit event
  form.addEventListener("submit", addNewItem);

  // delete an item.
  taskList.addEventListener("click", deleteItem);

  // delete all items
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems(){

    items = getItemsFromLS();
    items.forEach(function(item){
        createItem(item);
    });
}

// get items from Local Storage
function getItemsFromLS(){
    if(localStorage.getItem('items') === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    return items;
}

// set item to Local Storage
 function setItemToLS(text){
     items = getItemsFromLS();
     items.push(text);
     localStorage.setItem('items', JSON.stringify(items));
 }

 // delete item from LS
 function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
          items.splice(index,1);
        }
    });

    localStorage.setItem('items', JSON.stringify(items));
 }

function createItem(text){
    // create li

  const li = document.createElement("li"); // Boş değilse liste elemanımızı oluşturuyoruz.
  li.className = "list-group-item list-group-item-secendary";
  li.appendChild(document.createTextNode(input.value));

  // create a
  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-plus"></i>';

  // add a to li ///// a ve li elementlerini ilişkilendiriyoruz.
  li.appendChild(a);

  // add li to ul //// li ve ul elementlerini ilişkilendiriyoruz.
  taskList.appendChild(li);
}

// add new item.
function addNewItem(e) {
  if (input.value === '') {
    alert('add new item'); // input boş ise alert ile uyar. Bu bir kontrol.
  }

  // create item
  createItem(input.value);

  // save to Local Storage
  setItemToLS(input.value);

  // clear input //// değeri ekledikten sonra inputu temizliyoruz.
  input.value = '';

  e.preventDefault(); // new item olayı gerçekleşiyor.
}

// delete an item
function deleteItem(e) {

   
        if (e.target.className === "fas fa-plus") {
            if (confirm('are you sure ?')){
            e.target.parentElement.parentElement.remove();
            // ikonu kontrol ettik ve ikona basarak eklenen yeni elementi sildik.


            // delete item from LS

            deleteItemFromLS(e.target.parentElement.parentElement.textContent);

          
          }
        }

  e.preventDefault(); // scrollbar manipüle edildi.
}

// delete all items
function deleteAllItems(e) {
  // taskList.innerHTML = '' // bir yöntem.

  if (confirm("are you sure ? ")) {
      while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
      }
      localStorage.clear();
  }
  
  e.preventDefault();
}

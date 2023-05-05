function loadTable(FoodName= '') {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/food?FoodName_like=${FoodName}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML +=
          '<td><img width="70px" src="' +
          object["image"] +
          '" class="image"></td>';
        trHTML += "<td>" + object["FoodName"] + "</td>";
        trHTML += "<td>" + object["FoodType"] + "</td>";
        trHTML += "<td>" + object["Category"] + "</td>";
        trHTML += "<td>" + object["AvailableTime"] + "</td>";       
        trHTML += "<td>" + object["Cost"] + "</td>";
        trHTML +=
          '<td><button type="button" class="btn btn-outline-primary me-2" onclick="showUserEditBox(' +
          object["id"] +
          ')"><i class="fa-regular fa-pen-to-square"></i></button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
          object["id"] +
          ')"><i class="fa-solid fa-trash"></i></button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();
// searching
function search() {
  const FoodName = document.getElementById("searchvalue").value;
  loadTable(FoodName);
}

//Create box 
function showUserCreateBox() {
  Swal.fire({
    title: "Add Food",
    html:
      '<input id="id" type="hidden">' +
      '<label>FoodName</label><input id="FoodName" class="col-xs-2" placeholder=""><br><br>' + 
      '<label>FoodType</label><select name="country" id="FoodType" style="width:160px"><option value="Veg">Veg</option><option value="Non-Veg">Non-Veg</option><option value="IceCreams">IceCreams</option><option value="Snacks">Snacks</option><option value="other">other</option></select><br><br>'+
      '<label>Category</label><select name="country" id="Category" style="width:160px"><option value="SouthIndian">SouthIndian</option><option value="NorthIndian">NorthIndian</option><option value="Chinesh">Chinesh</option><option value="French">French</option><option value="other">other</option></select><br>'+
      '<br><label>AvailableTime</label><br><input id="AvailableTime" class="swal2-input" type="time">' +      
      '<br><br><label>Cost</label><input id="Cost" class="col-xs-2" placeholder="">',
    preConfirm: () => {
        userCreate();
    },
  });
}

function userCreate() {
  const FoodName = document.getElementById("FoodName").value;
  const FoodType = document.getElementById("FoodType").value;
  const Category = document.getElementById("Category").value;
  const AvailableTime = document.getElementById("AvailableTime").value;  
  const Cost = document.getElementById("Cost").value;

  if(validate()==true){
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/food");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      FoodName: FoodName,
      FoodType: FoodType,
      Category: Category,
      AvailableTime: AvailableTime,      
      Cost:Cost,
      image: "https://logitrustvoyages.com/logitrustblog/wp-content/uploads/2020/07/street_food.jpeg",
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      loadTable();
    }
  };
}
}
//Edit box
function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/food/${id}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      Swal.fire({
        title: "Edit Menu",
        html:
          '<input id="id" type="hidden" value="' +
          objects[`${id}`] +
          '">' +
          '<label>FoodName</label><input id="FoodName" class="col-xs-2" placeholder="" value="' +
          objects["FoodName"] +
          '"><br><br>' +
          '<label>FoodType</label><select name="country" id="FoodType" style="width:160px"><option value="Veg">Veg</option><option value="Non-Veg">Non-Veg</option><option value="IceCreams">IceCreams</option><option value="Snacks">Snacks</option><option value="other">other</option>' +
          objects["FoodType"] +
          '"</select><br><br>' +
          '<label>Category</label><select name="country" id="Category" style="width:160px"><option value="SouthIndian">SouthIndian</option><option value="NorthIndian">NorthIndian</option><option value="Chinesh">Chinesh</option><option value="French">French</option><option value="other">other</option>'+
          objects["Category"] +
          '"</select><br>'+
          '<br><label>AvailableTime</label><br><input id="AvailableTime" type=time class="swal2-input" value="' +
          objects["AvailableTime"] +
          '">' +
          
          '<br><br><label>Cost</label><input id="Cost" class="col-xs-2" placeholder="" value="' +
          objects["Cost"] +
          '">',
        preConfirm: () => {
          
          userEdit(id);
        },
      });
    }
  };
}

function userEdit(id) {
  const FoodName = document.getElementById("FoodName").value;
  const FoodType = document.getElementById("FoodType").value;
  const Category = document.getElementById("Category").value;
  const AvailableTime = document.getElementById("AvailableTime").value;  
  const Cost = document.getElementById("Cost").value;
  if(validate()==true){
    const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `http://localhost:3000/food/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      FoodName: FoodName,
      FoodType: FoodType,
      Category: Category,
      AvailableTime: AvailableTime,      
      Cost:Cost,
      image: "https://logitrustvoyages.com/logitrustblog/wp-content/uploads/2020/07/street_food.jpeg",
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      loadTable();
    }
  };
}
}
//Delete box
function userDelete(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open(`DELETE`, `http://localhost:3000/food/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
          xhttp.send(
              JSON.stringify({
                id: id,
              })
            );
            xhttp.onreadystatechange = function () {
              if (this.readyState == 4) {
               loadTable();
        }
      };
  }
    });
    }
//validate function
    function validate(){
  const FoodName = document.getElementById("FoodName").value;
  const FoodType = document.getElementById("FoodType").value;
  const AvailableTime = document.getElementById("AvailableTime").value;
  const Category = document.getElementById("Category").value;
  const Cost = document.getElementById("Cost").value;
  //regular expression
  const nameCheck=/^[a-zA-Z\s]{2,32}$/;
const costCheck=/^\d{0,8}[.]?\d{1,4}$/;
//condition

if (FoodName == "" || FoodType == "" || AvailableTime == "" || Category == "" || Cost == "") {
  Swal.fire({
      title: "Fields should not be empty",
      showConfirmButton: true,
      icon: "error"
  })
  return false;
}

if (!FoodName.match(nameCheck)) {

  Swal.fire({
      title: "Invalid Input",
      text: "Food name should only contain alphabetical letters",
      icon: "error",
      showConfirmButton: true,

  })
  return false;

}
if (!Cost.match(costCheck)) {

  Swal.fire({
      title: "Invalid Input",
      text: "Cost should only contain numbers",
      icon: "error",
      showConfirmButton: true,

  })
  return false;

}
if (FoodName.match(nameCheck) && Cost.match(costCheck)) {
  Swal.fire({
      title: "Successfully Created",
      icon: "success",
      showConfirmButton: true

  })
  return true;
}
  }
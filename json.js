function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/food");
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
        trHTML += "<td>" + object["AvailableTime"] + "</td>";
        trHTML += "<td>" + object["PersonNo"] + "</td>";
        trHTML += "<td>" + object["Cost"] + "</td>";
        trHTML +=
          '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
          object["id"] +
          ')">Edit</button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
          object["id"] +
          ')">Del</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();
//Create box 
function showUserCreateBox() {
  Swal.fire({
    title: "Food Create",
    html:
      '<input id="id" type="hidden">' +
      '<input id="FoodName" class="swal2-input" placeholder="Name"><br><br>' + 
      '<label>FoodType</label><select name="country" id="FoodType" style="width:160px"><option value="Veg">Veg</option><option value="Non-Veg">Non-Veg</option><option value="Chinesh">Chinesh</option><option value="Snacks">Snacks</option><option value="other">other</option></select><br>'+
      '<label>AvailableTime</label><input id="AvailableTime" class="swal2-input" type="time">' +
      '<input id="PersonNo" class="swal2-input" placeholder="Number">'+
      '<input id="Cost" class="swal2-input" placeholder="Cost">',
    preConfirm: () => {
  
      userCreate();
    },
  });
}

function userCreate() {
  const FoodName = document.getElementById("FoodName").value;
  const FoodType = document.getElementById("FoodType").value;
  const AvailableTime = document.getElementById("AvailableTime").value;
  const PersonNo = document.getElementById("PersonNo").value;
  const Cost = document.getElementById("Cost").value;

  if(validate()==true){
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/food");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      FoodName: FoodName,
      FoodType: FoodType,
      AvailableTime: AvailableTime,
      PersonNo: PersonNo,
      Cost:Cost,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fidli&psig=AOvVaw1BWZK5XRhw0ageD9yV7bj1&ust=1683178436725000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNC-tri22P4CFQAAAAAdAAAAABAE",
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
        title: "Edit User",
        html:
          '<input id="id" type="hidden" value="' +
          objects[`${id}`] +
          '">' +
          '<input id="FoodName" class="swal2-input" placeholder="Name" value="' +
          objects["FoodName"] +
          '">' +
          '<input id="FoodType" class="swal2-input" placeholder="Type" value="' +
          objects["FoodType"] +
          '">' +
          '<label>AvailableTime</label><input id="AvailableTime" type=time class="swal2-input" placeholder="Time" value="' +
          objects["AvailableTime"] +
          '">' +
          '<input id="PersonNo" class="swal2-input" placeholder="Number" value="' +
          objects["PersonNo"] +
          '">'+
          '<input id="Cost" class="swal2-input" placeholder="Cost" value="' +
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
  const AvailableTime = document.getElementById("AvailableTime").value;
  const PersonNo = document.getElementById("PersonNo").value;
  const Cost = document.getElementById("Cost").value;
  if(validate()==true){
  console.log(id);
  console.log(FoodName);
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `http://localhost:3000/food/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      FoodName: FoodName,
      FoodType: FoodType,
      AvailableTime: AvailableTime,
      PersonNo: PersonNo,
      Cost:Cost,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fidli&psig=AOvVaw1BWZK5XRhw0ageD9yV7bj1&ust=1683178436725000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNC-tri22P4CFQAAAAAdAAAAABAE",
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
  const PersonNo = document.getElementById("PersonNo").value;
  const Cost = document.getElementById("Cost").value;
  //regular expression
  const nameCheck=/^[a-zA-Z\s]{2,32}$/;
  const numCheck=/^[0-9]{10}$/;
const costCheck=/^\d{0,8}[.]?\d{1,4}$/;
//condition

if (FoodName == "" || FoodType == "" || AvailableTime == "" || PersonNo == "" || Cost == "") {
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
if (!PersonNo.match(numCheck)) {

  Swal.fire({
      title: "Invalid Input",
      text: "Person number should only contain ten numbers",
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
if (FoodName.match(nameCheck)&& PersonNo.match(numCheck)&& Cost.match(costCheck)) {
  Swal.fire({
      title: "Successfully Created",
      icon: "success",
      showConfirmButton: true

  })
  return true;
}
  }
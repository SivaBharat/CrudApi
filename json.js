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
            '<td><img width="50px" src="' +
            object["avatar"] +
            '" class="avatar"></td>';
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

  function showUserCreateBox() {
    Swal.fire({
      title: "Create user",
      html:
        '<input id="id" type="hidden">' +
        '<input id="FoodName" class="swal2-input" placeholder="Name">' +
        '<input id="FoodType" class="swal2-input" placeholder="Type">' +
        '<input id="AvailableTime" class="swal2-input" placeholder="Time">' +
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
        avatar: "https://www.melivecode.com/users/1.png",
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
            '<input id="AvailableTime" class="swal2-input" placeholder="Time" value="' +
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
        avatar: "https://www.melivecode.com/users/1.png",
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
      
    
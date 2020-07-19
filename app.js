function uploadUser(event) {
  event.preventDefault();

  let useremail = document.getElementById("exampleInputEmail1").value;
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let wallet = document.getElementById("exampleInputWallet").value;

  console.log(useremail, firstname, lastname, wallet);

  if (useremail == "" || firstname == "" || lastname == "" || wallet == "") {
    swal({
      title: "Error Authenticating",
      text: "Please provide the required credentials",
      icon: "warning",
      timer: 2100,
    });
    return false;
  }

  function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  if (IsEmail(useremail) == false) {
    swal({
      title: "Error Authenticating",
      text: "Please provide a valid email address",
      icon: "warning",
      timer: 3100,
    });
    return false;
  }

  //     swal('Please wait...');

  const url = "https://backend-tests1.herokuapp.com/api/users/single";

  const user = {
    firstName: firstname,
    lastName: lastname,
    email: useremail,
    wallet: wallet,
  };

  var request = new Request(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  fetch(request)
    .then(async (res) => {
      var resp = await res.json();
      console.log(resp);
      if (resp.status == 200) {
        swal({
          title: "User Created Succesfully",
          text: `User Registration`,
          icon: "info",
          timer: 3500,
        });
      }
    })
    .catch((e) => {
      swal.close();
      console.log(e);
    });
  //     document.getElementById('exampleInputEmail1').value = "";
  //     document.getElementById('InputPassword1').value = "";
  //     document.getElementById('InputPasswordConfrim').value = "";
}

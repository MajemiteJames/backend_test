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

  swal("Please wait...");

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
      if (resp.status == 201) {
        swal({
          title: "User Created Succesfully",
          text: `User Registration`,
          icon: "info",
          timer: 3500,
        });
        document.getElementById("user_id").innerHTML = resp.user._id;
        document.getElementById("user_first").innerHTML = resp.user.firstName;
        document.getElementById("user_last").innerHTML = resp.user.lastName;
        document.getElementById("user_email").innerHTML = resp.user.email;
        document.getElementById("user_wallet").innerHTML = resp.user.wallet;
      }
    })
    .catch((e) => {
      swal.close();
      console.log(e);
    });
}

function creditUser(event) {
  event.preventDefault();
  let amount = document.getElementById("creditInputAmount").value;
  let user_id = document.getElementById("user_id").innerHTML;
  console.log(amount, user_id);
  if (amount == "") {
    swal({
      title: "Error Authenticating",
      text: "Please provide the required credentials",
      icon: "warning",
      timer: 3100,
    });
    return false;
  }

  // swal("Please wait...");

  const url =
    "https://backend-tests1.herokuapp.com/api/users/credit/amount/" + user_id;

  let credit = amount;
  var request = new Request(url, {
    method: "PATCH",
    body: JSON.stringify(credit),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  fetch(request)
    .then(async (res) => {
      var resp = await res.json();
      console.log(resp);
      if (resp.status == 201) {
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
}

function debitUser(event) {
  event.preventDefault();
  let debitAmount = document.getElementById("debitAmountBtn").value;
  let user_id = document.getElementById("user_id").innerHTML;
  console.log(debitAmount, user_id);
  if (debitAmount == "") {
    swal({
      title: "Error Authenticating",
      text: "Please provide the required credentials",
      icon: "warning",
      timer: 3100,
    });
    return false;
  }

  swal("Please wait...");

  const url =
    "https://backend-tests1.herokuapp.com/api/users/debit/amount/" + user_id;
}

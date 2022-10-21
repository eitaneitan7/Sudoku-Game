function login() {
  let username = document.getElementById("user").value;
  let password = document.getElementById("pass").value;
  let hiddenUser = (document.getElementById("hidden-user"));
  let hiddenPass = (document.getElementById("hidden-pass"));

  if (username == "abcd" && password == '1234' ) {
    window.location.href = "choice.html"
      }
      else if ( username !== "abcd"){
          hiddenUser.style.display = 'block'

      }
      if(password !== '1234'){
          hiddenPass.style.display = 'block'
      }
     
    
  }


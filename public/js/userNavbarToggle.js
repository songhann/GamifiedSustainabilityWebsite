document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const profileButton = document.getElementById("profileButton");
    const logoutButton = document.getElementById("logoutButton");
    const currentCoins = document.getElementById("currentCoins");
  
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus != 200) {
            alert(responseData.message || responseData.error)
        } else {
            currentCoins.innerHTML =`
            <img src="./images/coin.svg"> ${responseData.coins}
            `

        }

    }
      // Token exists, show profile button and hide login and register buttons
      currentCoins.classList.remove("d-none")
      loginButton.classList.add("d-none");
      registerButton.classList.add("d-none");
      profileButton.classList.remove("d-none");
      logoutButton.classList.remove("d-none");
      fetchMethod(currentUrl + `/api/players/byauthorization`, callback, "GET", null, localStorage.getItem("token"));
    } else {
      // Token does not exist, show login and register buttons and hide profile and logout buttons
      currentCoins.classList.add("d-none")
      loginButton.classList.remove("d-none");
      registerButton.classList.remove("d-none");
      profileButton.classList.add("d-none");
      logoutButton.classList.add("d-none");
    }
  
    logoutButton.addEventListener("click", function () {
      // Remove the token from local storage and redirect to index.html
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });

  });

  

url = new URL(document.URL);
var urlParams = url.searchParams;
var playerId = urlParams.get("player_id");

document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    var playerId = urlParams.get("player_id");
    const profile = document.getElementById('profile');

    if (playerId != undefined) {
        const callback1 = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            localUserId = responseData.player_id


            const callback2 = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                responseData.forEach((player, i) => {
                    if (playerId == player.user_id) { // if the user clicked is the local user
                        if (localUserId == player.user_id) {
                            profile.innerHTML = `<div class="container d-flex justify-content-center align-items-center">
        
                    <div class="cardProfile">
                    
                        <div class="upper">
                    
                            <img src="https://i.imgur.com/Qtrsrk5.jpg" class="img-fluid">
                    
                        </div>
                    
                        <div class="user text-center">
                    
                            <div class="profile">
                    
                                <img src="./images/profilepic.png" class="rounded-circle" width="80">
                    
                            </div>
                    
                        </div>
                        <div class="mt-5 text-center">
                    
                            <div class="mb-0 h4">${player.username}</div>
        
                            <div class="row row-cols-3 mt-3">
                                <div class="col">
                                    <div class="stats">
                                        <h6 class="mb-0">Planet Level</h6>
                                        <span>${player.planet_level}</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="stats">
                                        <h6 class="mb-0">Lifetime Points</h6>
                                        <span>${player.total_points}</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="stats">
                                        <h6 class="mb-0">Rank</h6>
                                        <span>${i + 1}</span>
                                    </div>
                                </div>
                            </div>
                                
                        </div>
                    
                    </div>
                    
                    </div> `;
                        }
                        else {
                            profile.innerHTML = `<div class="container d-flex justify-content-center align-items-center">
        
                    <div class="cardProfile">
                    
                        <div class="upper">
                    
                            <img src="https://i.imgur.com/Qtrsrk5.jpg" class="img-fluid">
                    
                        </div>
                    
                        <div class="user text-center">
                    
                            <div class="profile">
                    
                                <img src="./images/profilepic.png" class="rounded-circle" width="80">
                    
                            </div>
                    
                        </div>
                        <div class="mt-5 text-center">
                    
                            <div class="mb-0 h4">${player.username}</div>
                            <div><a href="gift.html?player_id=${player.user_id}"><button class="btn btn-primary">Gift</button></a></div>

        
                            <div class="row row-cols-3 mt-3">
                                <div class="col">
                                    <div class="stats">
                                        <h6 class="mb-0">Planet Level</h6>
                                        <span>${player.planet_level}</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="stats">
                                        <h6 class="mb-0">Lifetime Points</h6>
                                        <span>${player.total_points}</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="stats">
                                        <h6 class="mb-0">Rank</h6>
                                        <span>${i + 1}</span>
                                    </div>
                                </div>
                            </div>
                                
                        </div>
                    
                    </div>
                    
                    </div> `;
                        }
                    }

                });

            }

            fetchMethod(currentUrl + "/api/users/leaderboard", callback2);

        }
        fetchMethod(currentUrl + `/api/players/byauthorization`, callback1, "GET", null, localStorage.getItem("token"));

    }
    else {
        const callback1 = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            playerId = responseData.player_id


            const callback2 = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                responseData.forEach((player, i) => {
                    if (playerId == player.user_id) {
                        profile.innerHTML = `<div class="container d-flex justify-content-center align-items-center">
        
                    <div class="cardProfile">
                    
                        <div class="upper">
                    
                            <img src="https://i.imgur.com/Qtrsrk5.jpg" class="img-fluid">
                    
                        </div>
                    
                        <div class="user text-center">
                    
                            <div class="profile">
                    
                                <img src="./images/profilepic.png" class="rounded-circle" width="80">
                    
                            </div>
                    
                        </div>
                        <div class="mt-5 text-center">
                    
                            <div class="mb-0 h4">${player.username}</div>

        
                            <div class="row row-cols-3 mt-3">
                                <div class="col">
                                    <div class="stats">
                                        <h6 class="mb-0">Planet Level</h6>
                                        <span>${player.planet_level}</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="stats">
                                        <h6 class="mb-0">Lifetime Points</h6>
                                        <span>${player.total_points}</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="stats">
                                        <h6 class="mb-0">Rank</h6>
                                        <span>${i + 1}</span>
                                    </div>
                                </div>
                            </div>
                                
                        </div>
                    
                    </div>
                    
                    </div> `;
                    }

                });

            }

            fetchMethod(currentUrl + "/api/users/leaderboard", callback2);

        }
        fetchMethod(currentUrl + `/api/players/byauthorization`, callback1, "GET", null, localStorage.getItem("token"));


    }


});
document.addEventListener("DOMContentLoaded", function () {
    getAllOwnedItems();
});

function equipItem(itemId) {
    const data = {
        item_id: itemId
    }
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        const warningCard = document.getElementById("warningCard");
        const warningText = document.getElementById("warningText");

        if (responseStatus == 401) {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message || responseData.error;
            return;
        }

        if (responseStatus == 404) {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message || responseData.error;
            return;
        }

        if (responseStatus == 200) {
            const toastLiveExample = document.getElementById('liveToast')
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            const equipmessage = document.getElementById('equipmessage')
            equipmessage.innerHTML = responseData.message
            toastBootstrap.show()
            getAllOwnedItems();
        }


    };
    fetchMethod(currentUrl + `/api/players/equip`, callback, "PUT", data, localStorage.getItem("token"));

}

function unequipItem(itemId) {
    const data = {
        item_id: itemId
    }
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        const warningCard = document.getElementById("warningCard");
        const warningText = document.getElementById("warningText");

        if (responseStatus == 401) {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message || responseData.error;
            return;
        }

        if (responseStatus == 404) {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message || responseData.error;
            return;
        }

        if (responseStatus == 200) {
            const toastLiveExample = document.getElementById('liveToast')
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            const equipmessage = document.getElementById('equipmessage')
            equipmessage.innerHTML = responseData.message
            toastBootstrap.show()
            getAllOwnedItems(); 
            
        }


    };
    fetchMethod(currentUrl + `/api/players/unequip`, callback, "PUT", data, localStorage.getItem("token"));

}
function getAllOwnedItems(){
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    var playerId = urlParams.get("player_id");
    const owneditemList = document.getElementById('owneditemList');
    const callback1 = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const owneditemList = document.getElementById("owneditemList");
        const warningCard = document.getElementById("warningCard1");
        const warningText = document.getElementById("warningText1");
        if (responseStatus == 401) {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message || responseData.error;
            return;
        }
        if (responseStatus == 404) {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message || responseData.error;
            return;
        }

        responseData.forEach((item) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "col p-3";
            displayItem.innerHTML = `
          <div class="card h-100">
              <div class="card-body">
              <img src="https://raw.githubusercontent.com/songhann/images/main/CA2/${item.item_name}.jpg" class="card-img-top" alt="Item Image">
              <div class="card-body">
                  <h5 class="card-title">${item.item_name}</h5>
                  <p class="card-text">
                      Rarity: ${item.rarity}<br>
                  </p>
              </div>
          </div>
          `;
            owneditemList.appendChild(displayItem);
        });
    };

    const callback2 = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const owneditemList = document.getElementById("owneditemList");
        const warningCard = document.getElementById("warningCard1");
        const warningText = document.getElementById("warningText1");
        if (responseStatus == 401) {
            
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message || responseData.error;
            return;
        }
        if (responseStatus == 404) {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message || responseData.error;
            return;
        }
        owneditemList.innerHTML = '';

        responseData.forEach((item) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "col p-3";
            displayItem.innerHTML = `
          <div class="card h-100">
              <div class="card-body">
              <img src="https://raw.githubusercontent.com/songhann/images/main/CA2/${item.item_name}.jpg" class="card-img-top" alt="Item Image">
              <div class="card-body">
                  <h5 class="card-title">${item.item_name}</h5>
                  <p class="card-text">
                      Rarity: ${item.rarity}<br>
                  </p>
                  <button class="btn btn-primary" id="equipButton${item.item_id}" onclick="equipItem(${item.item_id})">Equip</button>
              </div>
          </div>
          `;
            owneditemList.appendChild(displayItem);
        });
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            console.log(responseData)
            for (const [key, value] of Object.entries(responseData[0])) {
                if(value!=0){
                    var equipButton = document.getElementById(`equipButton${value}`)
                    equipButton.innerHTML = `Unequip
                    `;
                    equipButton.setAttribute("onclick", `unequipItem(${value})`)    
                }
            }
        };
        fetchMethod(currentUrl + `/api/players/preset`, callback, "GET", null, localStorage.getItem("token"));
    };



    if (playerId != undefined) {
        fetchMethod(currentUrl + `/api/players/${playerId}/items`, callback1);
    }
    else {
        fetchMethod(currentUrl + `/api/players/byauthorization/items`, callback2, "GET", null, localStorage.getItem("token"));

    }
}
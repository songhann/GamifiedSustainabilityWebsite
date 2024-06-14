document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const itemList = document.getElementById("itemList");
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
                      Planet Level: ${item.planet_id}<br>
                      Rarity: ${item.rarity}<br>
                      Cost: ${item.cost}<br>
                  </p>
                  <a class="btn btn-primary" onclick="confirmPurchase('${item.item_id}')">Buy</a>
              </div>
          </div>
          `;
            itemList.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + "/api/items/", callback);
});

function confirmPurchase(itemid) {
    if (!confirm("Confirm Purchase? ")) {
        return;
    }

    const data = {
        item_id: itemid,
        date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus != 201) {
            alert(responseData.message || responseData.error)
        } else {
            const toastLiveExample = document.getElementById('liveToast')
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            const purchasemessage = document.getElementById('purchasemessage')
            purchasemessage.innerHTML = responseData.message
            toastBootstrap.show()
            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                if (responseStatus != 200) {
                    alert(responseData.message || responseData.error)
                } else {
                    currentCoins.innerHTML = `
                    <img src="./images/coin.svg"> ${responseData.coins}
                    `

                }

            }
            fetchMethod(currentUrl + `/api/players/byauthorization`, callback, "GET", null, localStorage.getItem("token"));

        }
    };


    fetchMethod(currentUrl + "/api/items/player", callback, "POST", data, localStorage.getItem("token"));
}
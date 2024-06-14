var urlParams ;
var playerId;

document.addEventListener("DOMContentLoaded", function () {
    getOwnedItems()
});

function getOwnedItems(){
    url = new URL(document.URL);
    urlParams = url.searchParams;
    playerId = urlParams.get("player_id");
  
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const owneditemList = document.getElementById("owneditemList");
        owneditemList.innerHTML = ''
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
                  <button class="btn btn-primary" onclick='giftItem(${item.item_id})'>Gift</button>
              </div>
          </div>
          `;
          owneditemList.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + `/api/players/byauthorization/items`, callback, "GET", null, localStorage.getItem("token"));

}
function giftItem(itemId) {
    const data = {
        item_id : itemId,
        player_id : playerId,
        date : new Date().toISOString().slice(0, 19).replace('T', ' ')
    }

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const warningCard = document.getElementById("warningCard");
        const warningText = document.getElementById("warningText");
        if (responseStatus == 403) {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message || responseData.error;
            alert(responseData.message || responseData.error)
          return;
        }
        if (responseStatus == 404) {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message || responseData.error;
            alert(responseData.message || responseData.error)
          return;
        }
        if (responseStatus == 201){
            warningCard.classList.add("d-none");
            alert(responseData.message)
            setTimeout(getOwnedItems , 100);

        }
    
       
    };

    fetchMethod(currentUrl + `/api/players/trade`, callback, "PUT", data, localStorage.getItem("token"));
}
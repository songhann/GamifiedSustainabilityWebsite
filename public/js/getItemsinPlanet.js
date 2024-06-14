document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const planetId = urlParams.get("planet_id");
  
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const itemList = document.getElementById("itemList");
    
        if (responseStatus == 404) {
            itemList.innerHTML = `${responseData.message}`;
          return;
        }
    
        responseData.forEach((item) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "col p-3";
            displayItem.innerHTML = `
          <div class="card h-100">
              <div class="card-body ">
              <img src="https://raw.githubusercontent.com/songhann/images/main/CA2/${item.item_name}.jpg" class="card-img-top" alt="Item Image">
              <div class="card-body">
                  <h5 class="card-title">${item.item_name}</h5>
                  <p class="card-text">
                      Rarity: ${item.rarity}<br>
                  </p>
              </div>
          </div>
          `;
            itemList.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + `/api/items/planet/${planetId}`, callback);
});
document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const planetId = urlParams.get("planet_id");
  
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const owneditemList = document.getElementById("owneditemList");
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
              </div>
          </div>
          `;
          owneditemList.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + `/api/players/byauthorization/items/planet/${planetId}`, callback, "GET", null, localStorage.getItem("token"));
});
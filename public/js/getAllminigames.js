document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const gameList = document.getElementById("gameList");
        responseData.forEach((game) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "col p-3";
            displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
              <img src="https://raw.githubusercontent.com/songhann/images/main/CA2/${game.game_name}.jpg" class="card-img-top" alt="Game Image">
              <div class="card-body">
                  <h5 class="card-title">${game.game_name}</h5>
                  <p class="card-text">
                      GameID: ${game.game_id}<br>
                      Reward: ${game.item_name}<br>
                  </p>
                  <a href="singleGameInfo.html?game_id=${game.game_id}"><button class="btn btn-primary">Play</button></a>
              </div>
          </div>
          `;
          gameList.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + "/api/minigames", callback);
});


document.addEventListener("DOMContentLoaded", function () {
    const callback1 = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        localUserId = responseData.player_id


        const callback2 = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            const tradehistorytable = document.getElementById("tradehistorytable");
            responseData.forEach((trade) => {
                if (trade.newplayer_id == localUserId) {
                    trade.newplayer_id = 'You'
                }
                const displayItem = document.createElement("tr");
                displayItem.className = "cell-1"
                displayItem.innerHTML = `
            <td>${trade.trade_id}</td>
            <td>${trade.item_name}</td>
            <td>${trade.newplayer_id}</td>
            <td>${trade.trade_datetime}</td>
            <td><i class="fa fa-ellipsis-h text-black-50"></i></td>
          `;
                tradehistorytable.appendChild(displayItem);
            });
        };

        fetchMethod(currentUrl + `/api/players/byauthorization/tradehistory`, callback2, "GET", null, localStorage.getItem("token"));
    }
    fetchMethod(currentUrl + `/api/players/byauthorization`, callback1, "GET", null, localStorage.getItem("token"));
});


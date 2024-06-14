document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const leaderboard = document.getElementById("leaderboard");
        responseData.forEach((player,i) => {

            const displayItem = document.createElement("tr");
            displayItem.setAttribute('onclick' , `window.location.href='/profile.html?player_id=${player.user_id}'`)
            displayItem.innerHTML = `
            <th scope="row">${i+1}</th>
            <td>${player.username}</td>
            <td>${player.total_points}</td>
          `;
            leaderboard.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + "/api/users/leaderboard", callback);
});
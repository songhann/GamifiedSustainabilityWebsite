document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const planetList = document.getElementById("planetList");
        responseData.forEach((planet) => {
            const displayItem = document.createElement("div");
            displayItem.innerHTML = `
            <div class="">
            <div class="text-center">
                ${planet.planet_name}
            </div>
            <div><a href="iteminplanet.html?planet_id=${planet.planet_id}"><img src="https://raw.githubusercontent.com/songhann/images/main/CA2/${planet.planet_name}.jpg"
                 class="rounded-circle img-fluid" alt="Planet Image"></a></div>
        </div>
          `;
            planetList.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + "/api/planets", callback);
});
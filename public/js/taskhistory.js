document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const taskhistorytable = document.getElementById("taskhistorytable");
        responseData.forEach((task) => {
            if(task.notes != ""){
                task.notes = `"${task.notes}"`
            }

            const displayItem = document.createElement("tr");
            displayItem.className = "cell-1"
            displayItem.innerHTML = `
            <td>${task.progress_id}</td>
            <td>${task.title}</td>
            <td>${task.points}</td>
            <td>${task.notes}</td>
            <td>${task.completion_date}</td>
            <td><i class="fa fa-ellipsis-h text-black-50"></i></td>
          `;
          taskhistorytable.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + `/api/task_progress/player`, callback, "GET", null, localStorage.getItem("token"));
});
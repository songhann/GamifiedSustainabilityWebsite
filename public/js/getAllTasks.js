const myModal = new bootstrap.Modal('#taskNotes', {})

document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const taskList = document.getElementById("taskList");
        responseData.forEach((task) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "col-12  mx-auto";
            displayItem.innerHTML = `
            <div class="card mb-3">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title">${task.title}</h5>
                    <small>Description: ${task.description}</small>
                    <div>
                        <small class="text-muted">Points: ${task.points}</small>
                    </div>
                </div>
                <button class="btn btn-success" onclick="taskNote('${task.task_id}')"><img src="./images/check2-circle.svg"></button>
            </div>
        </div>
          `;
            taskList.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + "/api/tasks", callback);
});


function taskNote(taskid) {

        const taskNoteArea = document.getElementById("taskNoteArea");
        taskNoteArea.value = ""
        const saveTaskNoteButton = document.getElementById("saveTaskNoteButton");
        saveTaskNoteButton.setAttribute('onclick', `postTaskProgress('${taskid}')`);
        myModal.show();
    
}

function postTaskProgress(taskid) {

    const taskNoteArea = document.getElementById("taskNoteArea");

    const data = {
        task_id: taskid,
        completion_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        notes : taskNoteArea.value
    }

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus != 201) {
            alert(responseData.message || responseData.error)
        } else {
            const toastLiveExample = document.getElementById('liveToast')
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                if (responseStatus != 200) {
                    alert(responseData.message || responseData.error)
                } else {
                    currentCoins.innerHTML = `
                    <img src="./images/coin.svg"> ${responseData.coins}
                    `;
                    myModal.hide();
                }

            }
            fetchMethod(currentUrl + `/api/players/byauthorization`, callback, "GET", null, localStorage.getItem("token"));


        }

    }


    fetchMethod(currentUrl + `/api/task_progress`, callback, "POST", data, localStorage.getItem("token"))
}

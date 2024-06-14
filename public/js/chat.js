const myModal = new bootstrap.Modal('#editMessage', {})

document.addEventListener("DOMContentLoaded", function () {
    const submitMessageForm = document.getElementById("submitMessageForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");


    submitMessageForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const message = document.getElementById("messagearea").value;

        warningCard.classList.add("d-none");

        const data = {
            message_text: message
        };

        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            if (responseStatus != 201) {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message || responseData.error;
            } else {
                getAllMessages();
            }
        };

        fetchMethod(currentUrl + "/api/message", callback, "POST", data, localStorage.getItem("token"));

        // Reset the form fields
        submitMessageForm.reset();

    });
});

document.addEventListener("DOMContentLoaded", function () {
    getAllMessages();
});

function getAllMessages() {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const chat = document.getElementById("chat");
        chat.innerHTML = ""
        responseData.forEach((message) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "message-box mb-3";
            displayItem.innerHTML = `
            <div class="border border-1 border-black text-break p-1 rounded mb-1 row">
            <div class="col">

            <div class=""><span class="fw-bold fst-italic">${message.username}</span> <span>${changeDateTime(message.created_at)}</span></div>
            <div class="font-monospace">${message.message_text}</div>
            </div>
            <div class='col text-end my-auto'>
                <button class="message-button btn btn-success" onclick="LoadEdittedMessage('${message.id}')"  data-toggle="modal" data-target="#myModal"><img src="../images/pencil-square.svg"></button>
                <button class="message-button btn btn-danger" onclick="deleteMessage('${message.id}')"><img src="../images/trash-fill.svg"></button>
            </div>
            </div>
          `;
            chat.appendChild(displayItem);

            
        });
    };

    fetchMethod(currentUrl + "/api/message", callback);
}

function deleteMessage(messageid){

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus != 204) {
            alert(responseData.message || responseData.error)
        } else {
            getAllMessages();
        }        
    }

    fetchMethod(currentUrl + `/api/message/${messageid}`, callback, "DELETE", null, localStorage.getItem("token"))
}

function changeDateTime(messagedate){
    date = new Date(messagedate);

    datestr = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var newformat = hours >= 12 ? 'PM' : 'AM';
 
    // Find current hour in AM-PM Format
    hours = hours % 12;
 
    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return(datestr + " " + hours + ':' + minutes + ' ' + newformat)
}

function LoadEdittedMessage(messageid) {
    const callback = (responseStatus, responseData) => {
        const messageArea = document.getElementById("editmessagearea");
        messageArea.value = responseData.message_text;

        const saveEditButton = document.getElementById("saveEditButton");
        saveEditButton.setAttribute('onclick', `editMessageModal('${responseData.id}')`);
        const warningCard = document.getElementById("warningCardEdit");
        warningCard.classList.add("d-none")
        myModal.show();
    }

    fetchMethod(currentUrl + `/api/message/${messageid}`, callback)
}

function editMessageModal(messageid) {

    const editMessagAarea = document.getElementById("editmessagearea");

    const data = {
        message_text: editMessagAarea.value
    }

    const callback = (responseStatus, responseData) => {
        const warningCard = document.getElementById("warningCardEdit");
        const warningText = document.getElementById("warningTextEdit");
        if (responseStatus != 200) {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message || responseData.error;
        } else {
            getAllMessages();
            myModal.hide();
        }
    }

    fetchMethod(currentUrl + `/api/message/${messageid}`, callback, "PUT", data, localStorage.getItem("token"));
}
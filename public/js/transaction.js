document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const transactiontable = document.getElementById("transactiontable");
        responseData.forEach((transaction) => {
            var operatorsign;
            if(transaction.amount_transacted > 0){
                operatorsign = "+"
            }else{
                operatorsign = "-"
                transaction.amount_transacted = transaction.amount_transacted*-1    
            }

            const displayItem = document.createElement("tr");
            displayItem.className = "cell-1"
            displayItem.innerHTML = `
            <td>${transaction.cointransfer_id}</td>
            <td>${transaction.transaction_note}</td>
            <td>${operatorsign}${transaction.amount_transacted}</td>
            <td>${transaction.transaction_datetime}</td>
            <td><i class="fa fa-ellipsis-h text-black-50"></i></td>
          `;
          transactiontable.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + `/api/players/byauthorization/transaction`, callback, "GET", null, localStorage.getItem("token"));
});
async function loadData() {
    try {
        res = await fetch("http://localhost:4545/items")
        data = await res.json()
        if (!res.ok) {
            console.log("problem")
            return 0
        }
        data.forEach(element => {

            itemsContainer = document.getElementById("itemsContainer")
            itemDiv = document.createElement("DIV")
            itemDiv.className = "auction-item"
            previousBids = element.previousBids
            previousBidsText = ""
            for (i = 0; i < previousBids.length; i++) {
                previousBidsText += `$${previousBids[i]}, `
            }

            itemDiv.innerHTML = `    
        <h2>${element.name}<img src="${element.image}" class = "preview"></h2>
        <p>Category: ${element.category}</p>
        <p>Seller: ${element.seller}</p>
        <p>Description: ${element.description}</p>
        <p>Current Bid: $${element.highestBid}</p>
        <p>Last 3 Bids: ${previousBidsText}</p>
        <p>Bidding ends in: ${element.endTime}</p>
        
        <button class="bid-button">Bid Now</button>
        `
            itemsContainer.appendChild(itemDiv)


        });

    } catch (error) {
        console.log(error)

    }
}


async function loadData(){
try{
    res = await fetch("http://localhost:4545/items")
    data = await res.json()
    if(!res.ok){
        console.log("problem")
        return 0
    }
    data.forEach(element => {
        
        itemsContainer = document.getElementById("itemsContainer")
        itemDiv = document.createElement("DIV")
        itemDiv.className = "auction-item"
        previousBids = element.previousBids
        previousBidsText = ""
        for(i = 0; i < previousBids.length; i++){
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

}catch(error){
    console.log(error)

}
}
/*
<div class="auction-item">
    <h2>Amazing Spider-Man #300<img src="https://m.media-amazon.com/images/I/917xRDrnexL._SL1500_.jpg" class = "preview"></h2>
    <p>Category: Comics</p>
    <p>Seller: ComicCollector123</p>
    <p>Description: Lorem ipsum dolor sit amet, consecte</p>
    <p>Current Bid: $100</p>
    <p>Last 3 Bids: $120, $130, $140</p>
    <p>endTime: 2023-12-31T18:00:00.000Z</p>

    <button class="bid-button">Bid Now</button>
</div>
*/

loadData()
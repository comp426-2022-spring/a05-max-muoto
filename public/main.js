// Focus div based on nav button click
document.getElementById("homenav").onclick = function(){
    document.getElementById("home").className = "";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
};

document.getElementById("singlenav").onclick = function(){
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
};

document.getElementById("multinav").onclick = function(){
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "";
    document.getElementById("guess").className = "hidden";
};


document.getElementById("guessnav").onclick = function(){
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "";
};


// Flip one coin and show coin image to match result when button clicked
function flipCoin() {
    fetch("http://localhost:5000/app/flip/")
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            console.log(result);
            document.getElementById("result").innerHTML = result.flip;
            document.getElementById("smallcoin").setAttribute("src", "./assets/img/" + result.flip + ".png");
            coin.disabled = true;
        })
}



// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Listener so that multi calls flipMultipleCoins() 
const multi = document.getElementById("numflipsform");
multi.addEventListener("click", flipMultipleCoins);

// Submit handler
async function flipMultipleCoins(event) {
    // Prevents automatic form submission
    event.preventDefault();

    // Set endpoint and URL
    const endpoint = "app/flip/coins/";
    const url = document.baseURI+endpoint;

    const formEvent = event.currentTarget;

    try {
        const formData = new FormData(formEvent);
        const flips = await sendFlips({ url, formData });

        console.log(flips);
        displayResults(flips);

        document.getElementById("heads").innerHTML = "Heads: "+flips.summary.heads;
        document.getElementById("tails").innerHTML = "Tails: "+flips.summary.tails;
    } catch (error) {
        console.log(error);
    }


}

// Data sender
async function sendFlips({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);
    console.log(formDataJson);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    };

    const response = await fetch(url, options);
    return response.json();
}



// Guess a flip by clicking either heads or tails button
async function headsGuess() {

}

async function tailsGuess() {

}
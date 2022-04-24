// Focus div based on nav button click

// Flip one coin and show coin image to match result when button clicked

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button






// Calls the /app/flip endpoint
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

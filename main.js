let users = [];

window.onload = function() {
    getUsers()
}

// Fetches multiple users
const getUsers = () => {
    fetch('https://randomuser.me/api?results=2')
    .then(res => res.json())
    .then(res => {
        //console.log(res); // get the response schema
        // users.push(res); // not needed anymore b/c you are fetching multiple users at a time and they are returned in an array
        displayNamePicture(res.results)
    })
}


const displayNamePicture = (resultsArray) => {
    console.log(resultsArray)
    
    resultsArray.forEach( (user, index) => {
        
        const newElement = document.createElement("p")
        newElement.innerText = `User #${index + 1}: ${user.name.title} ${user.name.first} ${user.name.last}` 
        const newButton = document.createElement("button")
        newButton.innerText = "Click for more"
        newButton.id = `id${index}`
        document.getElementById("users").appendChild(newElement)
        document.getElementById("users").appendChild(newButton)
        newButton.addEventListener("click", (event) => {
            event.preventDefault();
            display(newElement, user)
            document.getElementById("users").removeChild(document.getElementById(`id${index}`)) // get rid of the button after you click it
        });

    })
}

const display = (newElement, user) => {
    
    const userKeys = Object.keys(user) // array of keys

    console.log(userKeys)

    for (let i = 0; i < userKeys.length; i++) {
        if ( (typeof user[userKeys[i]] != "object") || (user[userKeys[i]] == null) || (user[userKeys[i]] == undefined) ) {
            console.log(`String key: ${userKeys[i]}: ${user[userKeys[i]]}`)
            newElement.innerText = `${newElement.innerText} \n ${userKeys[i]}: ${user[userKeys[i]]}`
        } else {
            display(newElement, user[userKeys[i]])
        }
    }


    // forEach instead of for loop
    // userKeys.forEach( key => {
    //     if (typeof user[key] === "string") { 
    //         console.log(`String key: ${user[key]}`)
    //         newElement.innerText = `${newElement.innerText} \n ${key}: ${user[key]}`
    //         document.getElementById("users").appendChild(newElement)
    //     }
    // })  
}

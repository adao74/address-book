let users = [];
let condition = [];

window.onload = function() {
    getUsers()
}

// Fetches multiple users
const getUsers = () => {
    fetch('https://randomuser.me/api?results=2&nat=au,us,fr,gb&inc=name,picture,cell,dob,phone')
    .then(res => res.json())
    .then(res => {
        //console.log(res); // get the response schema
        // users.push(res); // not needed anymore b/c you are fetching multiple users at a time and they are returned in an array (res.results)
        res.results.sort( (a,b) => a.name.first.localeCompare(b.name.first)) // sort users alphabetically by first name

        // Create a condition array that holds a value for each user you fetched. Set the value to false.
        for (let i = 0; i < res.results.length; i++) {
            condition[i] = false
        }

        displayNamePicture(res.results)
    })
}


const displayNamePicture = (resultsArray) => {
    console.log(resultsArray)
    
    resultsArray.forEach( (user, index) => {
        
        const newElement = document.createElement("p")

        newElement.innerText = 
        `User #${index + 1}: ${user.name.title} ${user.name.first} ${user.name.last}
        Large picture: ${user.picture.large}
        Medium picture: ${user.picture.medium}
        Small picture: ${user.picture.thumbnail}` 

        const newButton = document.createElement("button")
        newButton.innerText = "Click for more"
        // newButton.id = `id${index}`
        document.getElementById("users").appendChild(newElement)
        document.getElementById("users").appendChild(newButton)
        newButton.addEventListener("click", (event) => {
            event.preventDefault();
            changeButtonState(newElement, newButton, index, user)
        });

    })
}



// change button behavior after you click it
const changeButtonState = (newElement, newButton, index, user) => {
    if (!condition[index]) {
        newElement.innerText = `User #${index + 1}:` // get rid of existing name/picture info so doesn't repeat in the innerText
        displayAllProperties(newElement, user)
        hideButton(newButton)
        condition[index] = true
    } else {
        hideProperties(newElement, index, user)
        displayButton(newButton)
        condition[index] = false
    }
} 

// Display the "hide button"
const hideButton = (newButton) => {
    newButton.innerText = "Hide more"
}

// Display the "display button"
const displayButton = (newButton) => {
    newButton.innerText = "Click for more"
}

// Display all user properties 
const displayAllProperties = (newElement, user) => {
    
    const userKeys = Object.keys(user) // array of keys

    userKeys.forEach( key => {
        if ( (typeof user[key] != "object") || (user[key] == null) || (user[key] == undefined)) { 
            // console.log(`String key: ${key}: ${user[key]}`)
            newElement.innerText = `${newElement.innerText} \n ${key}: ${user[key]}`
        } else {
            displayAllProperties(newElement, user[key])
        }
    })  
}

// Hide user properties
const hideProperties = (newElement, index, user) => {
    newElement.innerText = 
    `User #${index + 1}: ${user.name.title} ${user.name.first} ${user.name.last}
    Large picture: ${user.picture.large}
    Medium picture: ${user.picture.medium}
    Small picture: ${user.picture.thumbnail}` 
}
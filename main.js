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
        users.push(res);
        display(res.results)
    })
}


const display = (resultsArray) => {
    console.log(resultsArray)
    
    resultsArray.forEach(user => {
        
        const newElement = document.createElement("p")
        stringifyObjects(newElement, user)
      
    })

}


const stringifyObjects = (newElement, user) => {
    
    const userKeys = Object.keys(user) // array of keys
    

    console.log(userKeys)

    for (let i = 0; i < userKeys.length; i++) {


        if ( (typeof user[userKeys[i]] != "object") || (user[userKeys[i]] == null) || (user[userKeys[i]] == undefined) ) {
            console.log(`String key: ${userKeys[i]}: ${user[userKeys[i]]}`)
            newElement.innerText = `${newElement.innerText} \n ${userKeys[i]}: ${user[userKeys[i]]}`
            document.getElementById("users").appendChild(newElement)
        } else {
            stringifyObjects(newElement, user[userKeys[i]])
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

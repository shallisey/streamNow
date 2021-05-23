

const localHost = "http://localhost:8080/login"

const webEngURL = "http://web.engr.oregonstate.edu/~zhangluy/tools/class-content/form_tests/check_request.php"
const postURL = "http://httpbin.org/post"

document.addEventListener("DOMContentLoaded", bindButtons()) 

function bindButtons() {
    const loginForm = document.querySelector("#loginForm")
    
    loginForm.addEventListener("submit", function(event) {
        // event.preventDefault();
       
        const req = new XMLHttpRequest();
        emailFromLogin = loginForm.elements.loginEmail.value
        passwordFromLogin = loginForm.elements.loginPassword.value

        let payload = {email: null, password: null}
        payload.email = emailFromLogin
        payload.password = passwordFromLogin

        req.open("POST", postURL, true)

        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load',function(){
            if(req.status >= 200 && req.status < 400){
                // Everything that is returned from the POST request
                let response = JSON.parse(req.responseText);
                // Value that was sent back form POST request
                console.log("success");
                
            } else {
                // Error message
                console.log("error");
                res.send(`Error: ${req.statusText}`) 
            }
        })

        req.send(JSON.stringify(payload))

    })

    const signUpForm = document.querySelector("#signup-form")
    signUpForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const req = new XMLHttpRequest();
        firstName = signUpForm.elements.firstName.value
        lastName = signUpForm.elements.lastName.value
        emailFromSignup = signUpForm.elements.emailSignup.value
        passwordFromSignup = signUpForm.elements.passwordSignup.value
        let payload = {
            firstName: null,
            lastName: null,
            emailFromSignup: null,
            passwordFromSignup: null
        }
        payload.firstName = firstName
        payload.lastName = lastName
        payload.emailFromSignup = emailFromSignup
        payload.passwordFromSignup = passwordFromSignup
       

        req.open("POST", postURL, true)
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load',function(){
            if(req.status >= 200 && req.status < 400){
                
                console.log("success");
        //         // Everything that is returned from the POST request
                let response = JSON.parse(req.responseText);
                console.log(response);
                let value = JSON.parse(response.data)
                console.log(value);
                let div = document.getElementById("#signup-submission-data")

                let thankYou = `Thank you ${value.firstName} ${value.lastName} for signing up!`
                let paragraph = document.createElement("p")
                let email = document.createElement("p")
                let pw = document.createElement("p")

                email.innerHTML = `Email: ${value.emailFromSignup}`
                pw.innerHTML = `Password: ${value.passwordFromSignup}`
                paragraph.innerHTML = thankYou
                

                document.getElementById("signup-submission-data").appendChild(paragraph)
                document.getElementById("signup-submission-data").appendChild(email)
                document.getElementById("signup-submission-data").appendChild(pw)


            } else {
                // Error message
                console.log("error");
                res.send(`Error: ${req.statusText}`)
            }
        })
        req.send(JSON.stringify(payload))
    })
}
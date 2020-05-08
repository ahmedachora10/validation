import Validation from "./js/validation.js";

// ES6
class Loggin extends Validation {
    constructor() {
        super();
    }

    signIn() {
        // input and rules
        const rules = {
            ele: {
                username: document.querySelector("input[name=username]"),
                password: document.querySelector("input[name=password]"),
            },
            rules: {
                username: "req|alpha|min(3)",
                password: "req|alphaNum|between(8,25)",
            },
            button: document.querySelector(".save"),
        };

        // Callback Function
        const userAuth = (data) => {
            // Do Stuff
        };

        this.isValid(rules, userAuth);
    }

    signUp() {
        // input and rules
        const rules = {
            ele: {
                username: document.querySelector(".name"),
                passwrod: document.querySelector(".password"),
                "confirm password": document.querySelector(".cpassword"),
                email: document.querySelector(".email"),
            },
            rules: {
                username: "req|alpha|min(3)",
                passwrod: "req|alphaNum|between(8,25)",
                "confirm password": "req|alphaNum|between(8,25)|eq(password)",
                email: "req|email",
            },
            button: document.querySelector("#save"),
        };

        // Callback Function
        const userAuth = () => {
            /* Do Stuff */
        };

        this.isValid(rules, userAuth);
    }
}

// new Instance
const f = new Loggin();
f.signIn();

// Rules Object
const validationRules = {
    ele: {
        username: document.querySelector("input[name=username]"),
        password: document.querySelector("input[name=password]"),
    },
    rules: {
        username: "req|alpha|min(3)",
        password: "req|alphaNum|between(8,25)",
    },
    button: document.querySelector(".save"),
};

// Callback Function
const userAuth = () => {
    /* Do Stuff*/
};

const valid = new Validation();
valid.isValid(validationRules, userAuth);
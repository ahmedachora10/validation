import Validation from "./js/validation.js";
class Loggin extends Validation {
    constructor() {
        super();
    }

    signIn() {
        // input and rules
        const rules = {
            ele: {
                username: document.querySelector("input[name=username]"),
                "confirm password": document.querySelector("input[name=password]"),
            },
            rules: {
                username: "req|alpha|min(3)",
                "confirm password": "req|alphaNum|between(8,25)",
            },
            button: document.querySelector(".save"),
        };

        const userAuth = () => {
            /* Do Stuff */
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
                "confirm password": "req|alphaNum|between(8.25)|eq(password)",
                email: "req|email",
            },
            button: document.querySelector("#save"),
        };

        const userAuth = () => {
            /* Do Stuff */
        };

        this.isValid(rules, userAuth);
    }
}

const f = new Loggin();
f.signIn();

/*
// Create an Object
const validatinRules = {
    ele: {
        username: document.querySelector('.name')
    },
    rules: {
        username: 'req|alpha|min(3)'
    },
    button: document.querySelector('#registry')
};


const valid = new Validation();
valid.isValid(validatinRules, () => { /* Do Stuff });
/*/
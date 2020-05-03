export default class Validation {
    constructor() {
        this.ele;
        this.patterns = {
            eq: /^(eq)\(([a-z]+)\)$/gi,
            minmax: /^(min|max)\(([0-9]+)\)$/g,
            between: /^(between)\(([0-9]+),([0-9]+)\)$/g,
        };
    }

    add(ele) {
        this.ele = ele;
        return this;
    }

    req() {
        this.ele = this.ele != "" ? this.ele : false;
        return this;
    }

    alpha() {
        const reg = /^[a-z\s]+$/gi;
        this.ele = reg.test(this.ele) ? this.ele : false;
        return this;
    }

    num() {
        const reg = /^[0-9]+$/g;
        this.ele = reg.test(this.ele) ? this.ele : false;
        return this;
    }

    alphaNum() {
        const reg = /^[a-z0-9]+$/gi;
        this.ele = reg.test(this.ele) ? this.ele : false;
        return this;
    }

    email() {
        const reg = /^([a-z.-_]+)@([a-z]+)\.([a-z]{2,4})$/gi;
        this.ele = reg.test(this.ele) ? this.ele : false;
        return this;
    }

    eq(anotherField) {
        this.ele = this.ele === anotherField ? true : false;
        return this;
    }

    max(max) {
        const maximum = parseInt(max);
        this.ele = this.ele.length <= maximum ? this.ele : false;
        return this;
    }

    min(min) {
        const lease = parseInt(min);
        this.ele = this.ele.length >= lease ? this.ele : false;
        return this;
    }

    between(between) {
        const max = parseInt(between.max);
        const min = parseInt(between.min);
        this.ele =
            this.ele.length >= min && this.ele.length <= max ? this.ele : false;
        return this;
    }

    select(defaultValue) {
        this.ele = this.ele == defaultValue ? false : this.ele;
        return this;
    }

    isValid(obj, success) {
        // Make Sure to be obj parameter instance of an object
        if (!(obj instanceof Object) && !(typeof obj === "object"))
            throw new Error("Obj Parameter Must be an Object!");

        //Make Sure to be object param not empty
        const keys = Object.keys(obj);
        if (!keys.length || !(keys.includes("ele") && keys.includes("rules")))
            throw new Error("Object Must Have Properties Like ele and rules");

        // Get all Values from obj.ele and obj.rules
        const inputFields = obj.ele;
        const fieldRules = obj.rules;

        const self = this;

        for (const fieldName in inputFields) {
            if (Object.keys(inputFields).includes(fieldName)) {
                const inputField = inputFields[fieldName];

                // Check if input field have a value
                if (inputField == undefined || inputField == null || inputField == "")
                    throw new Error(`${fieldName} Must be an Element of Input!`);

                // Check if rules Have same filed name
                if (
                    fieldRules[fieldName] == "" ||
                    fieldRules[fieldName] == undefined ||
                    fieldRules[fieldName] == null
                )
                    throw new Error(`${fieldName} Must Have Same Name of Rules Objects!`);

                //   Convert field rules value to array
                const rules = fieldRules[fieldName].split("|");

                inputField.onblur = function() {
                    // DOM
                    const label = this.parentElement.nextElementSibling;
                    const messanger = {};
                    for (const rule of rules) {
                        if (rule == "req") {
                            if (self.add(this.value).req().ele === false) {
                                messanger[rule] = `${fieldName} is Required`;
                            }
                        }
                        //   Equal
                        else if (self.patterns["eq"].test(rule)) {
                            const pattern = /^(eq)\(([a-z]+)\)$/gi;
                            let matchValue = pattern.exec(rule)[2];
                            const matchElement = inputFields[matchValue];

                            if (matchElement == undefined || matchElement == null)
                                throw new Error("this Element Node Not Exists!");
                            if (self.add(this.value).eq(matchElement.value).ele === false) {
                                messanger[rule] = `${fieldName} Must be Eqaul ${matchValue}`;
                            }
                        }
                        // min and max
                        else if (self.patterns["minmax"].test(rule)) {
                            const pattern = /^(min|max)\(([0-9]+)\)$/g;
                            const ruleArr = pattern.exec(rule);
                            const method = ruleArr[1];
                            const matchValue = ruleArr[2];
                            if (self.add(this.value)[method](matchValue).ele === false) {
                                messanger[rule] =
                                    method == "min" ?
                                    fieldName + " Must be Bigger than " + matchValue :
                                    fieldName + " Must be Smaller than " + matchValue;
                            }
                        }
                        // Between
                        else if (self.patterns["between"].test(rule)) {
                            const between = /^(between)\(([0-9]+),([0-9]+)\)$/g;
                            const arr = between.exec(rule);
                            const min = parseInt(arr[2]);
                            const max = parseInt(arr[3]);
                            if (
                                self.add(this.value).between({
                                    min,
                                    max,
                                }).ele === false
                            ) {
                                messanger[
                                    rule
                                ] = `${fieldName} Must be Bgger than ${min} and Smaller than ${max}`;
                            }
                        }
                        // alpha
                        else if (rule == "alpha") {
                            if (self.add(this.value).alpha().ele === false) {
                                messanger[rule] = `${fieldName} Must be alphabet only`;
                            }
                        }
                        // alphaNum
                        else if (rule == "alphaNum") {
                            if (self.add(this.value).alphaNum().ele === false) {
                                messanger[rule] = `${fieldName} Must be alphabet and number`;
                            }
                        }
                        // Number
                        else if (rule == "num") {
                            if (self.add(this.value).num().ele === false) {
                                messanger[rule] = `${fieldName} Must be number only`;
                            }
                        }
                        // Email
                        else if (rule == "email") {
                            if (self.add(this.value).email().ele === false) {
                                messanger[rule] = `${fieldName} Must be contain @ _ . -`;
                            }
                        }
                    }

                    if (Object.keys(messanger).length === 0) {
                        console.log("Done!");
                        label.textContent = "";
                        label.classList.remove("show-label", "alert", "alert-danger");
                    } else {
                        for (const msg in messanger) {
                            if (Object.keys(messanger).includes(msg)) {
                                const message = messanger[msg];
                                if (message !== "") {
                                    label.textContent = message;
                                    label.classList.add("show-label", "alert", "alert-danger");
                                    break;
                                }
                            }
                        }
                    }
                };
            }
        }

        return this.send(obj.button, Object.values(inputFields), success);
    }

    getStatus(element) {
        return element.classList.contains("show-label");
    }

    send(button, inputFields, doSomthing) {
        const self = this;
        button.onclick = function(e) {
            const msg = document.querySelector(".msg");
            const valid = [];
            for (const inputField of inputFields) {
                if (
                    inputField.value == "" ||
                    self.getStatus(inputField.parentElement.nextElementSibling)
                ) {
                    e.preventDefault();
                    msg.textContent = "all Fields is Required!";
                    msg.classList.add("error-msg", "alert", "alert-danger");

                    setTimeout(() => {
                        msg.textContent = "";
                        msg.classList.remove("error-msg", "alert", "alert-danger");
                    }, 2000);
                } else {
                    valid.push(1);
                }
            }

            // If All Fields Valid Do Somthing and send
            if (valid.length === inputFields.length) {
                doSomthing(inputFields);
            }
        };
    }
}
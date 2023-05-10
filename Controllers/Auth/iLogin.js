
// A class that behaves like an Interface

module.exports =  class iLogin {

    login () {
        throw new Error ('You need to overred the login function !');
    }

}
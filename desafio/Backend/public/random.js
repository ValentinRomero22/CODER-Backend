document.querySelector('form').onsubmit = function(){
    this.setAttribute('action', '/api/random?quantity=' + document.querySelector('input[name=quantity]').value)
}
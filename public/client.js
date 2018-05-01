
// document.addEventListener("DOMContentLoaded", e => {
(function fetchData(){
  fetch("https://what-do-you-think.glitch.me/getMessages")
    .then(d => d.json())
    .then(data => {
       console.log(data);

       data.forEach( e => (e.media_content = JSON.parse(e.media_content)))
       console.log(data);
    });
})()
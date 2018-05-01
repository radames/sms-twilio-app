
// document.addEventListener("DOMContentLoaded", e => {
(function fetchData(){
  fetch("https://what-do-you-think.glitch.me/getMessages")
    .then(d => d.json())
    .then(data => {
       data.forEach( e=> {
         e.media_content = media_content.json();
       });
  });
})()
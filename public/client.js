(function(){
  
  setInterval(1000,
, 2000);
  
function fetchData(){
  fetch("https://what-do-you-think.glitch.me/getMessages")
    .then(d => d.json())
    .then(data => console.log(data)), 2000);
}
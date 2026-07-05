
const date = new Date();
date.setDate(date.getDate() - 1);
const formattedDate = date.toISOString().split('T')[0];
// let url = `https://mylearning-p4fu.onrender.com/news`;
let url='http://localhost:3000/news';

   fetch(url)
   .then(response => {
      return response.json();
   }
   )
   .then(information => {
      console.log(information)
      document.getElementById('lodincontainer').style.display='none';
      let a=0;
      let info=information.articles;
      let maincontain=document.getElementsByClassName('News-content');
      let maincontainer=maincontain[0];
      while(a<info.length){
      let article = information.articles[a];
      let IId='work'+(a);
     
      let container = document.createElement("div");
      container.className = "card";
      container.id = IId;
      
      const articleHTML = `
      <img src="${information.articles[a].image}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${information.articles[a].title}</h5>
      <p class="card-text">${information.articles[a].description}</p>
      <a class='btn btn-primary btn-sm' href="${information.articles[a].url}" target="_blank">Read more</a>
      </div>
      `;
      container.innerHTML = articleHTML;
      maincontainer.appendChild(container);
      
      a++;
      }
   })
   .catch(error => {
      console.error('Error fetching data:', error);
   });
   

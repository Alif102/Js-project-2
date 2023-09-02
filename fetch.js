console.log('alif')

let currentId ;

const handleCategory = async () => {
    const res = await fetch ('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();


    const TabsContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        
        div.innerHTML = `
        <button class="tab bg-gray-300 text-black rounded-md" onclick="handleData('${category.category_id}')">${category.category}</button>
        `
        TabsContainer.appendChild(div)

    });
    console.log(data.data)

    
}

const handleData = async (id,sorting) => {
  currentId = id;

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();

    const cardContainer = document.getElementById('card-container');
    const otherContainer = document.getElementById('others-container');

    cardContainer.innerHTML = "";
    otherContainer.innerHTML = "";
  
    if (data.data.length === 0){
      // cardContainer.removeAttribute('class');
      otherContainer.innerHTML = `
      
      
      <div class="flex flex-col justify-center items-center text-center mt-32"><img src=${"./assets/Icon.png"} />
        <h2 class="mt-7 text-[#171717] font-bold text-3xl">Oops!! Sorry, There is no<br>content here</h2>
      </div>
      `
      return
    }

    

    console.log(data.data)
    let sortbyViews;
   if (sorting) {
     sortbyViews = data.data.sort((a,b)=>{

     return parseInt(b.others.views) - parseInt(a.others.views);
      
      
    })

   }
   else{
     sortbyViews = data.data;

   }

  
    

   sortbyViews.forEach((hero)=>{
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
      

          <div class="card w-[320px] h-[420px] bg-base-100">
 <div> <img class="w-[300px] h-[250px] relative rounded-lg" src="${hero?.thumbnail} alt="Shoes" />
 <h4 class="absolute top-52 left-28 bg-black text-white w-40 font-extralight text-center rounded-md">
 <div> ${hero.others?.posted_date?
  `
 <div class="">${Math.round((Math.round(hero.others.posted_date/60))/60)}hr ${(Math.round(hero.others.posted_date/60))%60}min ago

 </div>` : ''} 
</div> 
 
 </h4>

  </div>
   
  <div class="card-body">
<div class="flex gap-4">
      <div class="avatar">
  <div class="w-12 h-12 rounded-full">
    <img src=${hero.authors[0].profile_picture} alt="immgg"/>
  </div>
</div> 
<div>
   
  <h2 class=" text-xl font-bold">${hero.title}</h2>
  <div class="flex items-center gap-4">
    <h2 class="text-gray-500">${hero.authors[0].profile_name}</h2>
  
    <h2 class="card-title">${hero.authors[0].verified? '<i class="fa fa-check-circle text-sky-500" aria-hidden="true"></i>' : ""}</h2>
  </div>
<h2 class="text-gray-500 ">${hero.others.views}</h2>
</div>
    </div>
  </div>
</div>
        
        `
        console.log(hero.authors)
        cardContainer.appendChild(cardDiv);
    })
   



  }

  const sortViwes = () => {
    handleData(currentId,true);
  }

handleCategory();
handleData(1000);

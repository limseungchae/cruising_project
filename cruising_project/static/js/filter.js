const tagBtnContainer = document.querySelector('.tag-filter__tags');
const restaurantContainer = document.querySelector('.restaurant-lists');
const restaurants = document.querySelectorAll('.restaurant-list')
const randChoiceBtn = document.querySelector(".menu-bars__choice");
const cnt = document.querySelector("#cnt");

let random = [];
let index = 0;

window.onload = function (){
    //console.log(restaurants.length);
    for(let i=0;i<restaurants.length;i++){
        random.push(i);
    }
}

tagBtnContainer.addEventListener('click', (event) => {
    let filter = event.target.dataset.filter;
    if (filter == null) {
        return;
    }
    random = [];
    let num = 0;
    restaurantContainer.classList.add('anim-out');
    setTimeout(() => {
        console.log(random);
        restaurants.forEach((restaurant) => {
            if(filter===restaurant.dataset.type||filter==='*'){
                restaurant.style.display='block';
                random.push(restaurant.dataset.num);
                restaurant.lastElementChild.style.backgroundColor = "white";
            } else {restaurant.style.display='none';}
        });
        restaurantContainer.classList.remove('anim-out');
    }, 280);
    //console.log(random);
});

randChoiceBtn.addEventListener('click', (event) => {
    if(index){restaurants[index].lastElementChild.style.backgroundColor = "white";}
    let ranlength = random.length;
    let randomIndex = Math.round(Math.random()*ranlength);
    randomRestaurant = random[randomIndex]-1;
    index = randomRestaurant;
    //console.log(restaurants[randomRestaurant]);
    //console.log(restaurants[randomRestaurant].getBoundingClientRect());
    window.scrollTo({top:restaurants[randomRestaurant].offsetTop + 300, behavior:"smooth"});
    restaurants[randomRestaurant].lastElementChild.style.backgroundColor = "#93c2eb";
});




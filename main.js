document.addEventListener('DOMContentLoaded', ()=>{
    maySees()
})

function maySees(){
    fetch('https://fakestoreapi.com/products')
    .then(resp => resp.json())
    .then(data => {
        categories(data)
    });
}
function categories(products){
// sort the data so it displays by product category:
    let sortCat = products.sort((a, b)=>{
        if (a.category > b.category){
            return -1;
        } else if (a < b){
            return 1
        } else {
            return 0
        }
    });
    console.log(sortCat)
  
    sortCat.forEach(x => {
    indivPro = document.createElement('div');
    indivPro.className = x.id;
    if(indivPro.className >= 15 && indivPro.className <= 20){
        indivPro.className = 'women';
    } else if (indivPro.className >= 1 && indivPro.className <= 4){
        indivPro.className = 'men';
    } else if (indivPro.className >= 5 && indivPro.className <= 8){
        indivPro.className = 'jewelry';
    } else {
        indivPro.className = 'electronics';
    };

    let proImg = document.createElement('img');
    proImg.className = 'pro-img';
    proImg.src = x.image;

    let proTitle = document.createElement('p');
    proTitle.className = 'pro-title';
    proTitle.textContent = x.title;

    let viewMore = document.createElement('button');
    viewMore.textContent = 'More Details';
    viewMore.className = 'view-more';

    let favProduct = document.createElement('button');
    favProduct.className = 'fav-product';
    favProduct.innerHTML = '<i class="fas fa-heart"></i>';

    let proPrice = document.createElement('p');
    proPrice.className = 'pro-price';
    proPrice.textContent= `$${x.price}`;

    let details = document.createElement('p');
    details.className = 'details';
    details.textContent = x.description;

    let reviews = document.createElement('div');
    reviews.id = 'reviews';
    let rating = [];
    let stars = 5;
    for(const review of Object.values(x.rating)){
        rating.push(review);
        let round = Math.round(rating[0]);
        reviews.innerHTML = '<i class="fas fa-star full-star"></i>'.repeat(round) + '<i class="far fa-star"></i>'.repeat(stars - round) + rating[1];
    };

    indivPro.append(proImg, proTitle, viewMore, favProduct, reviews, proPrice, details);

    document.querySelector('.products').append(indivPro);
    let toggle = [details, proImg, proTitle];

    viewMore.addEventListener('click', viewDetails);
    function viewDetails(){
        if(viewMore.textContent === 'More Details'){
            viewMore.textContent = 'Hide Details'
        } else{
            viewMore.textContent = 'More Details'
        };
        toggle.map(x => x.classList.toggle(`pro-toggle-${toggle.indexOf(x)}`))
    }

    favProduct.addEventListener('click', e => {
        e.target.classList.toggle('full-heart');
    });
})
// filter data by category:

    let women = document.querySelectorAll('.women');
    let men = document.querySelectorAll('.men');
    let jewelry = document.querySelectorAll('.jewelry');
    let electronics = document.querySelectorAll('.electronics');

    let otherPro1 = [];
    otherPro1.push(men, jewelry, electronics);
    document.querySelector('#women').addEventListener('click', ()=>{
        otherPro1.map(x => x.forEach(y => y.className = 'hidden'));
        women.forEach(x => x.className = 'block');
    });

    let otherPro2 = [];
    otherPro2.push(women, jewelry, electronics);
    document.querySelector('#men').addEventListener('click', ()=>{
        otherPro2.map(x => x.forEach(y => y.className = 'hidden'));
        men.forEach(x => x.className = 'block');
    });

    let otherPro3 = [];
    otherPro3.push(men, women, electronics);
    document.querySelector('#jewelry').addEventListener('click', ()=>{
        otherPro3.map(x => x.forEach(y => y.className = 'hidden'));
        jewelry.forEach(x => x.className = 'block');
    });


    let otherPro4 = [];
    otherPro4.push(men, women, jewelry);
    document.querySelector('#electronics').addEventListener('click', ()=>{
        otherPro4.map(x => x.forEach(y => y.className = 'hidden'));
        electronics.forEach(x => x.className = 'block');
    });

    let allPro = [];
    allPro.push(men, women, jewelry, electronics);
    document.querySelector('#home').addEventListener('click', ()=>{
        allPro.map(x => x.forEach(y => y.className = 'block'));
    }); 

};


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
    console.log(products)
// get the unique data for the categories:
    let cat = [...new Set(products.map(x => x.category))];
// sort the data so it displays by product category:
    sortCat = products.sort((a, b)=>{
        if (a.category > b.category){
            return -1;
        } else if (a < b){
            return 1
        } else {
            return 0
        }
    });
    // console.log(sortCat)
    sortCat.forEach(x => {

    let indivPro = document.createElement('div');
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

    favProduct.addEventListener('click', e=> {
        e.target.classList.toggle('full-heart');
        console.log('click')
    });

})
}
let sortCat = [];


//Filter by catogory: 
let displayProducts = document.querySelector('.products');
document.querySelector('#women').addEventListener('click', e => {
    let women = e.target.textContent;
    const filteredWomen = sortCat.filter(item => item.category.includes(women.toLowerCase()));
    console.log(filteredWomen)
    displayProducts.classList.toggle('hidden');
    filteredWomen.forEach(x => {
        
    })
})
document.querySelector('#men').addEventListener('click', e => {
    let men = e.target.textContent;
    const filteredMen = sortCat.filter(item => item.category.includes(men.toLowerCase()));
    console.log(filteredMen)
})
document.querySelector('#jewelry').addEventListener('click', e => {
    let jewelry = e.target.textContent;
    const filteredJewelry = sortCat.filter(item => item.category.includes(jewelry.toLowerCase()));
    console.log(filteredJewelry)
})
document.querySelector('#electronics').addEventListener('click', e => {
    let electronics = e.target.textContent;
    const filteredElectronics = sortCat.filter(item => item.category.includes(electronics.toLowerCase()));
    console.log(filteredElectronics)
})
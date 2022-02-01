//initializing an array to store the data of every 'people' fetched from the API.
let peopleList= [];

//initializing an object to store the total population count of each species listed in the API data.
let speciesCardList= {};

//grabbing the table from HTML to add the data.
const table= document.querySelector('#app');

//looping through all the individual people data to perform the required actions
for(let i=0; i<88; i++){
    fetch(`https://swapi.py4e.com/api/people/${i+1}`)
    .then(res => {
        if(res.ok){
            return res.json();
        }else{
            throw err;
        }
    })
    .then(json => {
    //creating a table row to store data of a 'people'
    const row= document.createElement('tr');
    
    //creating a table cell to add a font awesome icon depending on if the species is 'human', 'droid' or other
    const icon= document.createElement('td');
    fetch(`${json['species']}`)
    .then(response => response.json())
    .then(data => {
        icon.classList.add('fa');
        icon.classList.add('icon');
        if(data.name=='Droid'){
            icon.classList.add('fa-android');
            icon.classList.add('fa-fw');
        }else if(data.name=='Human'){
            icon.classList.add('fa-circle');
        }else{
            icon.classList.add('fa-question-circle');
        }
    })
    //appending the icon table cell to the people row
    row.append(icon);

    //Similarily creating table cell and adding other attributes as table cell, and appending them to the row
    
    //for name
    const name= document.createElement('td');
    name.textContent= `${json['name']}`;
    row.append(name);
    
    //for height
    const height= document.createElement('td');
    height.textContent= `${json['height']}`;
    row.append(height);
    
    //for mass
    const mass= document.createElement('td');
    mass.textContent= `${json['mass']}`;
    row.append(mass);
    
    //for hairColor
    const hairColor= document.createElement('td');
    hairColor.textContent= `${json['hair_color']}`;
    row.append(hairColor);

    //for skinColor
    const skinColor= document.createElement('td');
    skinColor.textContent= `${json['skin_color']}`;
    row.append(skinColor);

    //for eyeColor
    const eyeColor= document.createElement('td');
    eyeColor.textContent= `${json['eye_color']}`;
    row.append(eyeColor);

    //for birthYear
    const birthYear= document.createElement('td');
    birthYear.textContent= `${json['birth_year']}`;
    row.append(birthYear);

    //for gender
    const gender= document.createElement('td');
    gender.textContent= `${json['gender']}`;
    row.append(gender);

    //for homeWorld
    const homeWorld= document.createElement('td');
    fetch(`${json['homeworld']}`)
    .then(response => response.json())
    .then(data => {
        homeWorld.textContent= data.name;
    });
    row.append(homeWorld);

    //for films
    const films= document.createElement('td');
    for(let j=0; j<json['films'].length; j++){
        fetch(`${json['films'][j]}`)
        .then(response => response.json())
        .then(data => {
            
            const filmTitle= document.createElement('p');
            filmTitle.textContent= `(~) ${data.title}`;
            films.append(filmTitle);
        });
    }
    row.append(films);

    //for species
    const species= document.createElement('td');
    fetch(`${json['species']}`)
    .then(response => response.json())
    .then(data => {
        species.textContent=  data.name;
        if(speciesCardList.hasOwnProperty(data.name)){
            speciesCardList[data.name]+=1;
            const speciesCard= document.querySelector(`.${data.name}`);
            speciesCount= speciesCard.querySelector('.count');
            speciesCount.textContent= speciesCardList[data.name];
        }else{
            speciesCardList[data.name]=1;
            const speciesCard= document.createElement('span');
            speciesCard.classList.add('card');
            speciesCard.classList.add(`${data.name}`);
            const speciesName= document.createElement('p');
            speciesName.style.display= 'block';
            speciesName.textContent= data.name;
            speciesCard.append(speciesName);
            const speciesCount= document.createElement('p');
            speciesCount.classList.add('count');
            speciesCount.style.display= 'block';
            speciesCount.textContent= speciesCardList[data.name];
            speciesCard.append(speciesCount);
            document.querySelector('div').append(speciesCard);
        }
    });
    row.append(species);

    //for vehicles
    const vehicles= document.createElement('td');
    if(json['vehicles'].length==0){
        vehicles.textContent= 'Does not own any vehicle';   
    }else{
        for(let j=0; j<json['vehicles'].length; j++){
            fetch(`${json['vehicles'][j]}`)
            .then(response => {
               return response.json();
            })
            .then(data => {
                const vehicleName= document.createElement('p');
                vehicleName.textContent= `(~)${data.name}`;
                vehicles.append(vehicleName);
            });
        }
    }
    row.append(vehicles);

    //for starships
    const starships= document.createElement('td');
    if(json['starships'].length==0){
        starships.textContent= 'Does not own any starship';   
    }else{
        for(let j=0; j<json['starships'].length; j++){
            fetch(`${json['starships'][j]}`)
            .then(response => {
               return response.json();
            })
            .then(data => {
                const starshipName= document.createElement('p');
                starshipName.textContent= `(~)${data.name}`;
                starships.append(starshipName);
            });
        }
    }
    row.append(starships);

    //for the time it was created
    const created= document.createElement('td');
    created.textContent= `${json['created']}`;
    row.append(created);

    //for the time it was last edited
    const edited= document.createElement('td');
    edited.textContent= `${json['edited']}`;
    row.append(edited);

    //for the url of the api for the data
    const url= document.createElement('td');
    url.textContent= `${json['url']}`;
    row.append(url);
    
    //hiding rest of the list data, except for the first 10
    if(i>=10){
        row.style.display= 'none';
    }

    //adding the data of a people in the peopleList
    peopleList.push(row);

    //appending all the data of people including all attributes to the table
    table.append(row);
    })
    .catch(err => {
    //creating a row to show error ('fa-exclamation-circle' icon) cause the API did not respond
    const row= document.createElement('tr');

    //creating an icon table cell and adding the font awesome exclamation circle icon
    const icon= document.createElement('td');
    icon.classList.add('fa');
    icon.classList.add('fa-fw');
    icon.classList.add('api-error');
    icon.classList.add('fa-exclamation-circle');
    row.append(icon);

    const errorText= document.createElement('td');
    errorText.textContent= 'API did not give a response.';
    row.append(errorText);
    
    table.append(row);
    });

}

//paginating the list

//initialzing a variable referencing the current page count 
let currentPageCount= 1;
const currentPage= document.querySelectorAll('.current-page');
for(let i=0; i<currentPage.length; i++){
    currentPage[i].textContent= currentPageCount;
}

//hiding the 'previous page' button, because the page loads at the first page
const previousPageButtons= document.querySelectorAll('.previous-page');
for(let i=0; i<previousPageButtons.length; i++){
    previousPageButtons[i].style.display='none';
}

//adding eventListeners to the 'previous page' and 'next page' buttons for pagination 
document.addEventListener('click', e => {
    
    //for 'next page' button
    if(e.target.matches('.next-page')){
        for(let i=((currentPageCount-1)*10); i<((currentPageCount-1)*10)+10; i++){
            peopleList[i].style.display= 'none';
        }
        if(currentPageCount==8){
            const nextPageButtons= document.querySelectorAll('.next-page');
            for(let i=0; i<nextPageButtons.length; i++){
                nextPageButtons[i].style.display= 'none';
            }
            for(let i=((currentPageCount)*10); i<((currentPageCount)*10)+7; i++){
                peopleList[i].style.display= 'table-row';
            }
        }else{
            if(currentPageCount==1){
                const previousPageButtons= document.querySelectorAll('.previous-page');
                for(let i=0; i<previousPageButtons.length; i++){
                    previousPageButtons[i].style.display='inline';
                }
            }
            for(let i=((currentPageCount)*10)+1; i<=((currentPageCount)*10)+10; i++){
                peopleList[i].style.display= 'table-row';
            }
        }
        currentPageCount+=1;
        const currentPage= document.querySelectorAll('.current-page');
        for(let i=0; i<currentPage.length; i++){
            currentPage[i].textContent= currentPageCount;
        }
    }

    //for 'previous page' button
    if(e.target.matches('.previous-page')){
        if(currentPageCount==9){
            for(let i=((currentPageCount-1)*10); i<((currentPageCount-1)*10)+7; i++){
                peopleList[i].style.display= 'none';
            }
        }else{
            for(let i=((currentPageCount-1)*10); i<((currentPageCount-1)*10)+10; i++){
                peopleList[i].style.display= 'none';
            }
        }
        
        if(currentPageCount==2){
            const nextPageButtons= document.querySelectorAll('.previous-page');
            for(let i=0; i<nextPageButtons.length; i++){
                nextPageButtons[i].style.display= 'none';
            }
            for(let i=((currentPageCount-2)*10); i<((currentPageCount-2)*10)+8; i++){
                peopleList[i].style.display= 'table-row';
            }
        }else{
            if(currentPageCount==9){
                const nextPageButtons= document.querySelectorAll('.next-page');
                for(let i=0; i<nextPageButtons.length; i++){
                    nextPageButtons[i].style.display= 'inline';
                }
            }
            for(let i=((currentPageCount-2)*10)+1; i<=((currentPageCount-2)*10)+10; i++){
                peopleList[i].style.display= 'table-row';
            }
        }
        currentPageCount-=1;
        const currentPage= document.querySelectorAll('.current-page');
        for(let i=0; i<currentPage.length; i++){
            currentPage[i].textContent= currentPageCount;
        }
    }
});

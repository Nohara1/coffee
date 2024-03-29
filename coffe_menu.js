fetch('./product.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (Array.isArray(data) && data.length > 0) {
      const buttons = document.querySelectorAll('.main__container-offer-tebs-button');
      const buttonRefresh = document.querySelector('.main__container-button');
      const gr = document.querySelector('.main__container-grid');

      let blocksCreated = false;
      let coffeeRefreshed = false;
      let dessertRefreshed = false;

      function handleClickCoffee() {
        buttons[0].classList.add('active');
        buttons[1].classList.remove('active');
        buttons[2].classList.remove('active');
        if (!blocksCreated) {
          addCoffee();
          blocksCreated = true;
        }
        updateProducts('coffee', 0, 8);
      };
      function handleClickTea() {
        buttons[0].classList.remove('active');
        buttons[1].classList.add('active');
        buttons[2].classList.remove('active');
        updateProducts('tea', 8, 12);
      };
      function handleClickDessert() {
        buttons[0].classList.remove('active');
        buttons[1].classList.remove('active');
        buttons[2].classList.add('active');
        updateProducts('dessert', 12, data.length);
      };
      buttons[0].addEventListener('click', handleClickCoffee);
      buttons[1].addEventListener('click', handleClickTea);
      buttons[2].addEventListener('click', handleClickDessert);
    
          function addCoffee(){
            const coffeeData = window.innerWidth <= 768 ? data.slice(0, 4) : data.slice(0, 8);
            coffeeData.forEach(product => {
          
              const grid = document.createElement('div');
              const image = document.createElement('img');
              const descripti = document.createElement('div');
              const productName = document.createElement('h3');
              const productDescription = document.createElement('p');
              const productCell = document.createElement('p');

              productName.textContent = product.name;
              productDescription.textContent = product.description;
              productCell.textContent = `$${product.price}`;

              image.src = product.image;

              grid.classList.add('main__container-grid-box');
              image.classList.add('main__container-grid-box-image');
              descripti.classList.add('main__container-grid-box-description');
              productName.classList.add('main__container-grid-box-description-name');
              productDescription.classList.add('main__container-grid-box-description-des');
              productCell.classList.add('main__container-grid-box-description-price');

              gr.appendChild(grid);
              grid.appendChild(image);
              grid.appendChild(descripti);
              descripti.appendChild(productName);
              descripti.appendChild(productDescription);
              descripti.appendChild(productCell);
            });
          };

      function refreshCoffee() {
        if (buttons[0].classList.contains('active')) {
          if (coffeeRefreshed) {
            updateProducts('coffee', 0, 8)
            coffeeRefreshed = false;
          } else {
            updateProducts('coffee', 4, 8)
            coffeeRefreshed = true;
          };
        };
      };
      
      function refreshDessert() {
        if (buttons[2].classList.contains('active')) {
          if (dessertRefreshed) {
            updateProducts('dessert', 12, data.length);
            dessertRefreshed = false;
          } else {
            updateProducts('dessert', 16, 20);
            dessertRefreshed = true;
          };
        };
      };

      buttonRefresh.addEventListener('click', () =>{
          refreshCoffee ();
          refreshDessert();
      });

      function updateProducts(category, startIdx, endIdx) {
        const teaBlocks = gr.querySelectorAll('.main__container-grid-box');
        teaBlocks.forEach((block, index) => {
          const productIndex = index + startIdx;
          const product = data[productIndex];
          const productName = block.querySelector('.main__container-grid-box-description-name');
          const productDescription = block.querySelector('.main__container-grid-box-description-des');
          const productCell = block.querySelector('.main__container-grid-box-description-price');
          const image = block.querySelector('.main__container-grid-box-image');
      
          if (product.category === category) { 
            productName.textContent = product.name;
            productDescription.textContent = product.description;
            productCell.textContent = `$${product.price}`;
            image.src = product.image;
            block.style.display = 'block';
          } else {
            block.style.display = 'none'; 
          }
        });
      };
      handleClickCoffee();
    } else {
        console.error('No products found or products array is empty.');
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
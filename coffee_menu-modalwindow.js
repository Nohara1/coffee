fetch('./product.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (Array.isArray(data) && data.length > 0) {
        const tabsButtons = document.querySelectorAll('.main__container-offer-tebs-button');
        const gridBoxes = document.querySelectorAll('.main__container-grid-box');
        const window = document.querySelector('.main__container-window');

        tabsButtons.forEach((tabButton, tabIndex) => {
            tabButton.addEventListener('click', () => {
                const category = tabButton.querySelector('.main__container-offer-tebs-button-text').textContent.toLowerCase();
                const productsByCategory = data.filter(product => product.category === category);
                assignClickHandlers(productsByCategory);
            });
        });
        function assignClickHandlers(productsByCategory){
            gridBoxes.forEach((gridBox, gridIndex) => {
                gridBox.addEventListener('click', () => {
                    const product = productsByCategory[gridIndex];
                    const windowModal = document.createElement('div');
                    const windowImage = document.createElement('img');
                    const windowDescription = document.createElement('div');
                    const windowDescriptionTitle = document.createElement('h3');
                    const windowDescriptionText = document.createElement('p');
                    const windowDescriptionSize = document.createElement('div');
                    const windowDescriptionSizeText = document.createElement('p');
                    const windowDescriptionSizeBut = document.createElement('div');
                    const windowDescriptionAdditives = document.createElement('div');
                    const windowDescriptionAdditivesText = document.createElement('p');
                    const windowDescriptionAdditivesBut = document.createElement('div');
                    const windowDescriptionTotal = document.createElement('div');
                    const windowDescriptionTotalText = document.createElement('h3');
                    const windowDescriptionTotalPrice = document.createElement('h3');
                    const windowDescriptionAlert = document.createElement('div');
                    const windowDescriptionAlertImage = document.createElement('img');
                    const windowDescriptionAlertText = document.createElement('p');
                    const windowDescriptionButton = document.createElement('button');

                    windowModal.classList.add('main__container-window-modal');
                    windowImage.classList.add('main__container-window-modal-image');
                    windowDescription.classList.add('main__container-window-modal-description');
                    windowDescriptionTitle.classList.add('main__container-window-modal-description-title');
                    windowDescriptionText.classList.add('main__container-window-modal-description-text');
                    windowDescriptionSize.classList.add('main__container-window-modal-description-size');
                    windowDescriptionSizeText.classList.add('main__container-window-modal-description-text');
                    windowDescriptionSizeBut.classList.add('main__container-window-modal-description-but');
                    windowDescriptionAdditives.classList.add('main__container-window-modal-description-size');
                    windowDescriptionAdditivesText.classList.add('main__container-window-modal-description-text');
                    windowDescriptionAdditivesBut.classList.add('main__container-window-modal-description-but');
                    windowDescriptionTotal.classList.add('main__container-window-modal-description-total');
                    windowDescriptionTotalText.classList.add('main__container-window-modal-description-title');
                    windowDescriptionTotalPrice.classList.add('main__container-window-modal-description-title');
                    windowDescriptionAlert.classList.add('main__container-window-modal-description-alert');
                    windowDescriptionAlertText.classList.add('main__container-window-modal-description-alert-text');
                    windowDescriptionAlertImage.classList.add('main__container-window-modal-description-alert-image')
                    windowDescriptionButton.classList.add('main__container-window-modal-description-button');

                    windowDescriptionTitle.textContent = product.name;
                    windowDescriptionSizeText.textContent = 'Size';
                    windowDescriptionAdditivesText.textContent = 'Additives';
                    windowDescriptionText.textContent = product.description;
                    windowDescriptionTotalText.textContent = 'Total:';
                    windowDescriptionTotalPrice.textContent = `$${product.price}`;
                    windowDescriptionAlertText.textContent = 'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.';
                    windowDescriptionButton.textContent = 'Close';
                    windowImage.src = product.image;
                    windowDescriptionAlertImage.src = './img/info-empty.png'

                    window.style.opacity = 1;
                    window.style.display = 'flex';
                    

                    windowModal.appendChild(windowImage);
                    window.appendChild(windowModal);
                    windowModal.appendChild(windowDescription);
                    windowDescription.appendChild(windowDescriptionTitle);
                    windowDescription.appendChild(windowDescriptionText);
                    windowDescription.appendChild(windowDescriptionSize);
                    windowDescriptionSize.appendChild(windowDescriptionSizeText);
                    windowDescriptionSize.appendChild(windowDescriptionSizeBut);
                    windowDescription.appendChild(windowDescriptionAdditives);
                    windowDescriptionAdditives.appendChild(windowDescriptionAdditivesText);
                    windowDescriptionAdditives.appendChild(windowDescriptionAdditivesBut);
                    windowDescription.appendChild(windowDescriptionTotal);
                    windowDescriptionTotal.appendChild(windowDescriptionTotalText);
                    windowDescriptionTotal.appendChild(windowDescriptionTotalPrice);
                    windowDescription.appendChild(windowDescriptionAlert);
                    windowDescriptionAlert.appendChild(windowDescriptionAlertImage);
                    windowDescriptionAlert.appendChild(windowDescriptionAlertText);
                    windowDescription.appendChild(windowDescriptionButton);

                    for (const size in product.sizes) {
                        if (Object.hasOwnProperty.call(product.sizes, size)) {
                            const sizeDetails = product.sizes[size];
                            const sizeButton = document.createElement('button');
                            sizeButton.textContent = sizeDetails.size;
                            sizeButton.classList.add('main__container-window-modal-description-but-buttons');
                            windowDescriptionSizeBut.appendChild(sizeButton);
                            let te = windowDescriptionTotalPrice.textContent;
                            let se = te.slice(1);
                            let pe = parseFloat(se).toFixed(2);
                            let ze = parseFloat(sizeDetails['add-price']).toFixed(2);
                            sizeButton.addEventListener('click', () => {
                                const activeButtons = document.querySelectorAll('.main__container-window-modal-description-but-buttons-active')
                                activeButtons.forEach(button => {
                                    button.classList.remove('main__container-window-modal-description-but-buttons-active')
                                });
                                te =  (pe * 100  + ze *100)/100;
                                windowDescriptionTotalPrice.textContent = '$' + te;
                                sizeButton.classList.add('main__container-window-modal-description-but-buttons-active');
                            })
                        }
                    }

                    for (const name in product.additives) {
                        if (Object.hasOwnProperty.call(product.additives, name)) {
                            const additivesDetails = product.additives[name];
                            const additivesButton = document.createElement('button');
                            additivesButton.textContent = additivesDetails.name;
                            additivesButton.classList.add('main__container-window-modal-description-but-buttons');
                            windowDescriptionAdditivesBut.appendChild(additivesButton);   
                            additivesButton.addEventListener('click', () => {
                                
                                if (additivesButton.classList.contains('main__container-window-modal-description-but-buttons-active')){
                                    let te = windowDescriptionTotalPrice.textContent;
                                    let se = te.slice(1);
                                    let pe = parseFloat(se).toFixed(2);
                                    let xe = parseFloat(additivesDetails['add-price']).toFixed(2);
                                    te =  (pe * 100  - xe *100)/100;
                                    windowDescriptionTotalPrice.textContent = '$' + te;
                            } else{
                                    let te = windowDescriptionTotalPrice.textContent;
                                    let se = te.slice(1);
                                    let pe = parseFloat(se).toFixed(2);
                                    let xe = parseFloat(additivesDetails['add-price']).toFixed(2);
                                    te =  (pe * 100  + xe * 100) / 100;
                                    windowDescriptionTotalPrice.textContent = '$' + te;
                            }
                            additivesButton.classList.toggle('main__container-window-modal-description-but-buttons-active');
                            })
                        }
                    }

                    windowDescriptionButton.addEventListener('click', () => {
                        window.style.opacity = 0;
                        window.style.display = 'none';
                    });
                });
            });
        }
        function setInitialHandlers() {
            const initialCategory = 'coffee'; 
            const initialProducts = data.filter(product => product.category === initialCategory);
            assignClickHandlers(initialProducts);
        }
        setInitialHandlers()
    } else {
        console.error('No products found or products array is empty.');
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
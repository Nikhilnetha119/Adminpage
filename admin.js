let productDetails = [];

    document.addEventListener('DOMContentLoaded', () => {
        axios.get('https://crudcrud.com/api/732e2ca2b935405b8be4145d994bc91c/ecommerce')
            .then(response => {
            productDetails = response.data;
            console.log('Retrieved product details', productDetails);
            displayData(productDetails);
            })
    })

    function displayData(products) {
        const totalWorth = products.reduce((sum, product) => sum + product.price, 0);
        const totalWorthElement = document.getElementById('total-worth');
        totalWorthElement.innerText = `Total Worth of Products: ${totalWorth}`;

        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        products.forEach((product) => {
            const productElement = document.createElement('li');
            productElement.innerText = `${product.name} - ${product.price}`;
            
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete Product';
            deleteButton.addEventListener('click', () => deleteProduct(product._id));
            productElement.appendChild(deleteButton);
            
            productList.appendChild(productElement);
        });
    }

    function addProduct(event) {
        event.preventDefault();

        const priceElement = document.getElementById('price');
        const nameElement = document.getElementById('name');

        const price = parseFloat(priceElement.value);
        const name = nameElement.value.trim();

        if (!price || !name) {
            alert('Please enter valid price and product name');
            return;
        }

        const newProduct = { price, name };
        axios.post('https://crudcrud.com/api/732e2ca2b935405b8be4145d994bc91c/ecommerce', newProduct)
            .then(response => {
            console.log('Added new product', response.data);
            productDetails.push(response.data);
            displayData(productDetails);
            })

        priceElement.value = '';
        nameElement.value = '';
    }

    function deleteProduct(productId) {
        axios.delete(`https://crudcrud.com/api/732e2ca2b935405b8be4145d994bc91c/ecommerce/${productId}`)
            .then(response => {
            console.log('Deleted product', response.data);
            productDetails = productDetails.filter(product => product._id !== productId);
            displayData(productDetails);
            });
    }

    const formElement = document.getElementById('store-form');
    formElement.addEventListener('submit', addProduct);

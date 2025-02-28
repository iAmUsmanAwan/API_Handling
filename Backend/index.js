import express from 'express';

const app = express();

app.get('/api/products', (req, res)=>{
    const products = [
        {
            id: 1, 
            name: 'Herbs',
            price: 200, 
            image: 'https://images.pexels.com/photos/7668042/pexels-photo-7668042.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            id: 2, 
            name: 'Pocket Knife',
            price: 150, 
            image: 'https://images.pexels.com/photos/168804/pexels-photo-168804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 3, 
            name: 'Hand Gun',
            price: 550, 
            image: 'https://images.pexels.com/photos/6621957/pexels-photo-6621957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 4, 
            name: 'Assault Rifle',
            price: 650, 
            image: 'https://images.pexels.com/photos/19454444/pexels-photo-19454444/free-photo-of-m4-carabine-on-rocks.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 5, 
            name: 'Tank',
            price: 1000, 
            image: 'https://images.pexels.com/photos/9070533/pexels-photo-9070533.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
        },
        {
            id: 6, 
            name: 'Light Machine Gun',
            price: 750, 
            image: 'https://images.pexels.com/photos/35825/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600&lazy=load'
        },
    ]

    // http://localhost:3000/api/products?search=gun   
    //* here "?" is known as query parameter.

    // to entertain query parameter
    if(req.query.search){
        const filterProducts = products.filter(product => product.name.includes(req.query.search))
        // this will check if the name includes that specific searched word, if yes then return all entities by searching {http://localhost:3000/api/products?search=g}
        res.send(filterProducts);
        return;
    }

    setTimeout(()=>{
        res.send(products);
    }, 2000)

})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`http://localhost:${port}/api/products`);
});


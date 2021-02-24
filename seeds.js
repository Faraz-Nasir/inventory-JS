//SEPERATE FILE TO ENTER DATA INTO MONGOOSE DATABASE

const Product=require("./models/product")

const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/farmStand",{useNewUrlParser:true, useUnifiedTopology: true })
    .then(()=>{
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err=>{
        console.log("Oh no Mongoose Connection Error")
        console.log(err)
    })



// const p=new Product({
//     name:"Ruby GrapeFruit",
//     price:1.99,
//     category:"fruit"
// })
// p.save().then(p=>{
//     console.log(p)
// }).catch(e=>{
//     console.log(e)
// })

const seedProducts=[
    {
        name:"Fairy EggPlant",
        price:1.00,
        category:"vegetable"

    },
    {
        name:"Organic Goddess Melon ",
        price:4.99,
        category:"fruit"

    },
    {
        name:"Organic Mini Seedless Watermelon",
        price:3.99,
        category:"fruit"

    },
    {
        name:"Organic Celery",
        price:1.50,
        category:"vegetable"

    },
    {
        name:"Choclate Whole Milk",
        price:2.69,
        category:"dairy"

    }//if something does'nt pass validation then nothing will be inserted into the Database
]
Product.insertMany(seedProducts)
.then(res=>{
    console.log(res)
})
.catch(e=>{
    console.log(e)
})
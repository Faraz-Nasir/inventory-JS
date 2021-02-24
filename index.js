const express=require('express')
const app=express()
const path=require('path')

//we need to integrate mongoose
const mongoose=require('mongoose')

const Product=require("./models/product")//specify path

mongoose.connect("mongodb://localhost:27017/farmStand",{useNewUrlParser:true, useUnifiedTopology: true })
    .then(()=>{
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err=>{
        console.log("Oh no Mongoose Connection Error")
        console.log(err)
    })
    
app.set('views',path.join(__dirname,"views"))
app.set("view engine","ejs")

app.get('/products',async(req,res)=>{
    const products= await Product.find({})//Since this takes time ,we can make it an async function
    console.log(products)
    res.render("products/index.ejs",{products})
    
})
app.get("/products/new",(req,res)=>{
    res.render("products/new")
})
//sends data to 
app.use(express.urlencoded({extended:true}))
app.post("/products",(req,res)=>{
    
    let productz=new Product(
    {   
        name:req.body.name,
        price:parseInt(req.body.price),
        category:req.body.category
    })
    res.send("Making your Product")
    productz.save().then(p=>{
        console.log(p)
    }).catch(e=>{
        console.log(e)
    })
})

app.get("/products/:id/edit",async (req,res)=>{
    let idnumber=req.params.id.replace(":","")
    console.log(idnumber)

    const item_found=await Product.findById(idnumber)
    
    res.render("products/edit",{item_found,idnumber})
})

app.post("/products/:id/edit",async(req,res)=>{
    let id=req.body._id
    
    await Product.findByIdAndUpdate(id,req.body,{runValidators:true})
    console.log("done")
})




app.get("/products/:id",async(req,res)=>{
    let {id}=req.params;
    id=id.replace(":","")
    console.log(id)
    const product=await Product.findById(id)
    console.log(product)

    res.render('products/show',{product})
})



app.listen(3000,()=>{
    console.log("app is listening on port 3000")
})
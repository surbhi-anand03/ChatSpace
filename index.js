// const express = require('express');
// const app = express();
// const path = require('path');
// const mongoose = require('mongoose');
// const Chat = require("./models/chat.js");
// const methodOverride = require('method-override');
// const EcpError = require("./EcpError.js");
// const expressLayouts = require("express-ejs-layouts");

// app.use(expressLayouts);
// app.set("layout", "layout"); 

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname,"public")));
// app.use(express.urlencoded({extended: true}));
// app.use(methodOverride("_method"));



// main()
// .then(() => {
//     console.log("Connection success to Mongoose") 
//     })
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
// }

// mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp")
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));


// //---------------------------------- Index Route
// app.get("/chats", async (req,res,next) => {
//     try{
//         let chats = await Chat.find();
//         // console.log(chats);
//         res.render("index.ejs", {chats});
//     } catch(err){
//         next(err);
//     }
// })




// //---------------------------------- New Route
// app.get("/chats/new", async (req,res) => {
//     // throw new EcpError(404,"Page not Found");
//     res.render("new.ejs");
// })
// //---------------------------------- Create Route
// app.post("/chats", async (req,res,next) => {
//     try{
//         let {from,to,msg} = req.body;
//         let newChat = new Chat({
//             from: from,
//             to: to,
//             msg: msg,
//             created_at: new Date(),
//         });
//         await newChat.save();
//         res.redirect("/chats");
//     } catch(err){
//         next(err);
//     }
// });



// function asyncWrap(fn){
//     return function(req,res,next){
//         fn(req,res,next).catch((err) => next(err));
//     }
// }

// // ---------------------------------Show Route

// app.get("/chats/:id",
//      asyncWrap(async(req, res,next) => {
//         let {id} = req.params;
//         let chat = await Chat.findById(id);
//         if(!chat){
//             next(new EcpError(500,"Chat not"));
//         }
//         res.render("show.ejs", {chat});
//     })
// );

// //---------------------------------- Edit Route
// app.get("/chats/:id/edit",async (req,res,next) => {
//     try{
//         let {id} = req.params;
//         let chat = await Chat.findById(id);
//         res.render("edit.ejs", {chat});
//     } catch(err){
//         next(err);
//     }
// })
// //---------------------------------- Update Route
// app.put("/chats/:id",async (req,res) => {
//     try{
//         let {id} = req.params;
//         let {msg:newMsg} = req.body;
//         let updatedChat = await Chat.findByIdAndUpdate(id, 
//             {msg: newMsg}, 
//             {runValidators: true, new: true});
//         console.log(updatedChat);
//         res.redirect("/chats");
//     } catch(err){
//         next(err);
//     }
// })



// //---------------------------------- Delete Route
// app.delete("/chats/:id", async (req,res) => {
//     try{
//         let {id} = req.params;
//         let deletedChat = await Chat.findByIdAndDelete(id);
//         console.log(deletedChat);
//         res.redirect("/chats");
//     } catch(err){
//         next(err);
//     }
// })
 
// const handle = (err) => {
//     console.log("ERROR");
//     console.dir(err.message);
//     return err;
// }

// app.use((err,req,res,next) => {
//     console.log(err.name);
//     if(err.name === "ValidationError"){
//         err = handle(err);
//     }
//     next(err);
// })

// //-----------Error Handling Middlewares
// app.use((err,req,res,next) => {
//     let {status=500,msg="Error"} = err;
//     res.status(status).send(msg);
// })

// const port = 8080;
// app.get("/", (req,res) => {
//     res.send("Root Working");
// })

// app.listen(port, () =>  {
//     console.log(`Server is listening on ${port}`);
// })


require("dotenv").config();

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
const methodOverride = require('method-override');
const EcpError = require("./EcpError.js");
const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);
app.set("layout", "layout"); 

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));



//---------------------------------- Index Route
app.get("/chats", async (req,res,next) => {
    try{
        let chats = await Chat.find();
        // console.log(chats);
        res.render("index.ejs", {chats});
    } catch(err){
        next(err);
    }
})




//---------------------------------- New Route
app.get("/chats/new", async (req,res) => {
    // throw new EcpError(404,"Page not Found");
    res.render("new.ejs");
})
//---------------------------------- Create Route
app.post("/chats", async (req,res,next) => {
    try{
        let {from,to,msg} = req.body;
        let newChat = new Chat({
            from: from,
            to: to,
            msg: msg,
            created_at: new Date(),
        });
        await newChat.save();
        res.redirect("/chats");
    } catch(err){
        next(err);
    }
});



function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err) => next(err));
    }
}

// ---------------------------------Show Route

app.get("/chats/:id",
     asyncWrap(async(req, res,next) => {
        let {id} = req.params;
        let chat = await Chat.findById(id);
        if(!chat){
            next(new EcpError(500,"Chat not"));
        }
        res.render("show.ejs", {chat});
    })
);

//---------------------------------- Edit Route
app.get("/chats/:id/edit",async (req,res,next) => {
    try{
        let {id} = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs", {chat});
    } catch(err){
        next(err);
    }
})
//---------------------------------- Update Route
app.put("/chats/:id",async (req,res) => {
    try{
        let {id} = req.params;
        let {msg:newMsg} = req.body;
        let updatedChat = await Chat.findByIdAndUpdate(id, 
            {msg: newMsg}, 
            {runValidators: true, new: true});
        console.log(updatedChat);
        res.redirect("/chats");
    } catch(err){
        next(err);
    }
})



//---------------------------------- Delete Route
app.delete("/chats/:id", async (req,res) => {
    try{
        let {id} = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        res.redirect("/chats");
    } catch(err){
        next(err);
    }
})
 
const handle = (err) => {
    console.log("ERROR");
    console.dir(err.message);
    return err;
}

app.use((err,req,res,next) => {
    console.log(err.name);
    if(err.name === "ValidationError"){
        err = handle(err);
    }
    next(err);
})

//-----------Error Handling Middlewares
app.use((err,req,res,next) => {
    let {status=500,msg="Error"} = err;
    res.status(status).send(msg);
})



app.get("/", (req,res) => {
  res.send("Root Working");
});




const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

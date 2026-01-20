const mongoose = require('mongoose');
const Chat = require("./models/chat.js")

main()
.then(() => {
    console.log("Connection success to Mongoose") 
    })
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

let allChats = [
    {
    from: "Surbhi",
    to: "Sukanya",
    msg: "How are you?",
    created_at: new Date()
},
{
    from: "Sukanya",
    to: "Surbhi",
    msg: "I'm good! How about you?",
    created_at: new Date()
},
{
    from: "Surbhi",
    to: "Sukanya",
    msg: "I'm doing well, just busy with work.",
    created_at: new Date()
},
{
    from: "Sukanya",
    to: "Surbhi",
    msg: "Same here! Have you completed your project?",
    created_at: new Date()
},
{
    from: "Surbhi",
    to: "Sukanya",
    msg: "Almost done! Just testing the last module.",
    created_at: new Date()
},
{
    from: "Sukanya",
    to: "Surbhi",
    msg: "That's great! Let's meet this weekend?",
    created_at: new Date()
},
{
    from: "Surbhi",
    to: "Sukanya",
    msg: "Sure! Saturday evening sounds perfect",
    created_at: new Date()
}

]

Chat.insertMany(allChats)

// chat1.save().then(res => {
//     console.log(res);
// })
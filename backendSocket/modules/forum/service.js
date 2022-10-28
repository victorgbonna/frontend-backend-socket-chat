const Forum= require('./model')

const addForum = async (forumInput) =>{
    console.log({forumInput})
    const forum=new Forum(forumInput)
    await forum.save()
    return forum
}
const getForumMsgsByBootcampId = async (bootcampId) =>{
    const forums= await Forum.find({bootcampId})
    return forums
}

// const getProducts = async ({conditions={}}) =>{
//     const products= await Product.find(conditions)
//     return products
// }

module.exports={addForum, getForumMsgsByBootcampId}

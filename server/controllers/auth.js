const bycrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body
      
      for (let i = 0; i < users.length; i++) {
        let existing = bycrypt.compareSync(password,users[i].password)
        if (users[i].username=== username && existing) {
          let passToStore = {...users[i]}
          delete passToStore.password
          res.status(200).send(passToStore)
          return
        }}
      
      res.status(400).send("User not found.")
    },
    
    register: (req, res) => {
        console.log('Registering User')
        let {username, email, firstName, lastName,password} = req.body
        const salt = bycrypt.genSaltSync(5)
        const passHash = bycrypt.hashSync(password, salt)
        // console.log(pinHash);
        passObj = {
          username:username,
          email:email,
          firstName:firstName,
          lastName:lastName,
          password:passHash
        }
        users.push(passObj)
        // console.log(passObj);
        let passToStore = {...passObj}
        delete passToStore.password
        console.log(passToStore);
        res.status(200).send(passToStore)
    }
}
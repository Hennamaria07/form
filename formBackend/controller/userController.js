const bcrypt = require('bcrypt');
const saltRound = 7;
const dummyUsers = [
    {
        fullname: 'Mikey Draken',
        email: 'mikey@gmail.com',
        number: '9865703214',
        hashedPass: '$2b$07$71aXzrU7HyGr3am31OckG.JHEwctXcFLSSwPVC.RQkX7a1PF13U4y'
      },
      {
        fullname: 'Eren Yager',
        email: 'eren@gmail.com',
        number: '9865703478',
        hashedPass: '$2b$07$Zbnm0XblaimeJsvAXyC4mu3xTAOrubXC9F59rnBkxZ/K4Fm9KxSUu'
      },
      {
        fullname: 'Itachi Uchiha',
        email: 'itachi@uchiha.com',
        number: '3216054987',
        hashedPass: '$2b$07$HaSWdi9A7zEvTnrbze.kxOJ61af6j/uqsoC2BK7KSvhPDF/.wvtPa'
      }

]
exports.SignUp = async (req, res) => {
    const {fullname, email, number, password} = req.body;
try {
    const hashedPass = await bcrypt.hash(password, saltRound);
    const user = {
        fullname,
        email,
        number,
        hashedPass
    }
    console.log(user);
    res.status(201).json({
        success: true,
        message: "Registration completed successfully"
    })
} catch (error) {
    res.status(500).json({
        success: false,
        message: "Oops something went wrong...!"
    });
}
}

exports.Login = async (req, res) => {
    const {email, password} = req.body;
    const user = dummyUsers.find((user) => user.email === email);
    console.log('user :', user);
    try {
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }
        const isValid = await bcrypt.compare(password, user.hashedPass);
        console.log(`isvalid: ${isValid}`);
        if(!isValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials!'
            });
        }
        res.status(201).json({
            success: true,
            message: 'login successfully!',
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}
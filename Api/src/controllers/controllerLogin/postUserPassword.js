const bcrypt = require('bcrypt');
const { User } = require('../../db');
var nodemailer = require('nodemailer');
const saltRounds = 10;

const newPassword = async req => {
  // console.log(req)
  const { email, currentPassword, newPassword } = req;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    if (!currentPassword) {
      throw new Error('Current password is required');
    }
    if (!newPassword) {
      throw new Error('New password is required');
    }
    let result = await bcrypt.compare(
      currentPassword,
      user.dataValues.password
    );
    if (result) {
      bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
        console.log(hash);
        await User.update({ password: hash }, { where: { email: email } });
      });
    }
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('There was a problem updating the password');
  }
};

const passwordReset = async (req, res) => {
  try {
    console.log('ESTE ====>', req.body.email)
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.USER_ADMIN, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      });
      transporter.verify().then(()=>{
        console.log('Ready for send mails')
      })
      await transporter.sendMail({
        from: '"Reset password 😎" <doctorine.com@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Reset Password Doctorine", // Subject line
        html: "<b>To reset your password, click on the link</b><div><a href=http://localhost:3000>Link</a></div>", // html body
      });
    } else {
      res.json({ error: 'Usuario no registrado!' });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  newPassword,
  passwordReset,
};

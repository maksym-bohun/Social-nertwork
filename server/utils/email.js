const nodemailer = require("nodemailer");

module.exports = async ({ email, user, resetURL }) => {
  const html = `<!-- 
  Online HTML, CSS and JavaScript editor to run code online.
  -->
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Browser</title>
    <style type="text/css">
      body {
      font-family: sans-serif;
          color: #333;
          text-align: center;
      padding: 4rem;
      border: 1px solid #000;
      background-color: #e6e6e6;
      width: 40rem;
      height: 23rem;
      
      }
      
      main{
      margin: 0 auto;
      }
      
    .header {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1rem 
      }
      
     .line {
      width: 100%;
      height: 1px;
      background-color: gray;
      }
      
      .header-secondary{
      font-weight: 600;
      font-size: 1.2rem
      }
      
      a{
      text-decoration: none;
      transform: translateX(-50%);
      display: block;
      margin: 1.4rem 0 1.4rem 0;
      font-size: 1.1rem;
      width: 35rem;
      }

      .link-container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      
      .main-text{
      line-height: 1.6rem;
      }
    </style>
  </head>
  
  <body>
    <main>
    <h1 class="header">Electro</h1>
    <div class="line">&nbsp;</div>
    <div>
      <p class="header-secondary">Dear ${user.name}!</p>
      <p>Your link to change the password for the Electro account (valid for 10 minutes):</p>
      <div class="link-container">
      <a href = "${resetURL}"> ${resetURL};</a>
      </div>
      <p class="main-text">You received this email because you (or someone impersonating you) entered this email address when changing your Electro account password.
  If you did not leave a request for a link to change your password, ignore this email.</p>
    </div>
    <div class="line">&nbsp;</div>
    <p>Best wishes, Electro team ☺️ 👋</p>
    </main>
  </body>
  
  </html>`;

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "electro_ua@outlook.com",
    to: email,
    html,
    subject: "Your password reset token (valid for 10 min)",
  };

  await transporter.sendMail(mailOptions);
};

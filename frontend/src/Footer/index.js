import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './footer.css';

function Footer() {
    return (
        <div className='footer-container'>

            <div className='footer-contributors'>
                <div className="footerNameBlock">
                    <p className="footerNameTag">Kevin Huang</p>
                    <a href="https://linkedin.com/in/kevinhuang147" target="_blank">
                        <img className="linkedinLogo" src="https://cdn.discordapp.com/attachments/1113213089702228038/1115021661377400832/linkedinLogo.png" />
                    </a>
                    <a href="https://github.com/kevinhuang1208" target="_blank">
                        <img className="githubLogo" src="https://cdn.discordapp.com/attachments/1117948168353628201/1121823679731478629/github-g4b811f6c0_640.png" />
                    </a>
                </div>
            </div>
            <div className='tech-icons-container'>
                <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121552752133292133/JavaScript-logo.png" />

                <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121551916028153888/2300px-React-icon.png" />

                <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121552416844824636/redux.png" />

                <img className='tech-icons' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />

                <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121551721282408529/postgresql-icon.png" />

                <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121556896625729686/free-html5-40-1175193.png" />

                <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121557371194458202/css-512.png" />

                <img className='tech-icons' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" />
            </div>
        </div>
    )
   
}

export default Footer;

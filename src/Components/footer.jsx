import React from 'react';

import "./footer";




function Footer(){


const d = new Date()

const Year = d.getFullYear()


    return <div className='foot'>



      <span> <small> &copy; {Year} SB Optimizer </small> </span>


    </div>






}



export default Footer;
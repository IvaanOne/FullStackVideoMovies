

import React, {useState, useEffect} from 'react';
import moment from 'moment';
 
const Watch = () => {

    const [ahoraMismo, setAhoraMismo] = useState("");

    const reloj = () => {
        let ahora = moment().format('YYYY-MM-DD HH:mm:ss');
        
    }
    

     return (
         <div className=''>{reloj()}</div>
     )
}
export default Watch;
import React from 'react';
import { useEffect, useState } from 'react';

export default function ScrollToTop(){
    const[backToTopButton, setBacktoTopButton] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 100){
                setBacktoTopButton(true);
            }
            else{
                setBacktoTopButton(false);
            }
        })
    },[]);

    const scrollUp=()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }

    return <>
        {backToTopButton && (
            <button className='btn btn-outline-primary d-flex justify-content-center align-items-center pt-3' style={{position:"fixed", bottom:"50px", right:"50px", height:"50px", width:"50px", fontSize:"50px" }}
            onClick={scrollUp}
            >^</button>
        )}    
    </>
}
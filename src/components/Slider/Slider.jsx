import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Slider.css";

export default function Slider({ checked }) {
    const loc = useLocation();

    return (
        <div className="slider__wrap">
            <div className="slider">
                <div><center><h3>Short URLs <span>Anonymously</span></h3> <h4>With Awesome Analytics <span>(No Login/Register)</span></h4></center></div>
                <Link to={loc.pathname === "/" ? "/upload" : "/"} >
                    <label class="switch">
                        <input type="checkbox" checked={checked} />
                        <span class="slider__ball round"></span>
                    </label>
                </Link>
                <div><center><h3>Share Files <span>Anonymously</span></h3> <h4>With Awesome Analytics <span>(No Login/Register)</span></h4></center></div>
            </div>
        </div>
    )
}

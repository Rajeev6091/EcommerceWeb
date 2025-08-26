import React, { useEffect, useState } from "react";
import Hero from "../component/Hero";
import Product from "./Product";
import OurPolicy from "../component/OurPolicy";
import NewLetterBox from "../component/NewLetterBox";
import Footer from "../component/Footer";

function Home() {

    return (
        <div className="overflow-x-hidden relative">
            
            <div>
                <Hero/>
            </div>

            <div className="flex flex-wrap justify-center">
                <Product />
                <OurPolicy />
                <NewLetterBox />
                <Footer/>
            </div>
        </div>


    )
}
export default Home
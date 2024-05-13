import Marquee from "react-fast-marquee";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import logo6 from "../assets/logo6.png";
import logo7 from "../assets/logo7.png";
import logo8 from "../assets/logo8.png";
import logo9 from "../assets/logo9.png";
import logo10 from "../assets/logo10.png";

const FeaturedCompanies = () => {
    return (
        <div className="mt-16">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">Featured Companies</h1>

            <Marquee pauseOnHover={true}>
                <img className="w-36 rounded-lg ml-10 md:ml-15 lg:ml-20" src={logo1} alt="" />
                <img className="w-36 rounded-lg ml-10 md:ml-15 lg:ml-20" src={logo2} alt="" />
                <img className="w-36 rounded-lg ml-10 md:ml-15 lg:ml-20" src={logo3} alt="" />
                <img className="w-36 rounded-lg ml-10 md:ml-15 lg:ml-20" src={logo4} alt="" />
                <img className="w-36 rounded-lg ml-10 md:ml-15 lg:ml-20" src={logo5} alt="" />
                <img className="w-36 rounded-lg ml-10 md:ml-15 lg:ml-20" src={logo6} alt="" />
                <img className="w-36 rounded-lg ml-10 md:ml-15 lg:ml-20" src={logo7} alt="" />
                <img className="w-36 rounded-lg ml-10 md:ml-15 lg:ml-20" src={logo8} alt="" />
                <img className="w-36 rounded-lg ml-10 md:ml-15 lg:ml-20" src={logo9} alt="" />
                <img className="w-36 rounded-lg ml-10 md:ml-15 lg:ml-20" src={logo10} alt="" />
            </Marquee>
        </div>
    );
};

export default FeaturedCompanies;
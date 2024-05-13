import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import JobsInHome from "./JobsInHome";
import FeaturedCompanies from "./FeaturedCompanies";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>JobQuest | Home</title>
            </Helmet>
            <Banner></Banner>
            <FeaturedCompanies></FeaturedCompanies>
            <JobsInHome></JobsInHome>
        </div>
    );
};

export default Home;
import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import JobsInHome from "./JobsInHome";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>JobQuest | Home</title>
            </Helmet>
            <Banner></Banner>
            <JobsInHome></JobsInHome>
        </div>
    );
};

export default Home;
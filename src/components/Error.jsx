import { Link, useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div className="bg-[#E7F6F2] min-h-screen">
            <div className="flex justify-center items-center">
                <figure className="max-w-96 mt-20">
                    <img src="https://i.ibb.co/SRh7hpw/error-404-2.jpg" alt="not found" />
                </figure>
            </div>
            <div className="text-center pb-10">
                <h1 className="text-2xl font-semibold mb-2">Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p className="mb-4">
                    <i>{error.statusText || error.message}</i>
                </p>
                <Link to='/'><button className="btn bg-[#2C3333] text-white">Go to Home</button></Link>
            </div>
        </div>
    );
};

export default Error;
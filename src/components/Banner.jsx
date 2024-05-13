import logo from '../assets/logo_transparent.png';

const Banner = () => {
    return (
        <div className="hero min-h-screen mt-8" style={{ backgroundImage: 'url(https://i.ibb.co/TLvhjb4/banner.jpg)' }}>
            <div className="hero-overlay bg-[#2C3333] bg-opacity-60 rounded-xl"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <div className="flex justify-center items-center gap-2">
                        <img className="w-10" src={logo} alt="" />
                        <h1 className="mb-5 text-5xl font-bold">JobQuest</h1>
                    </div>
                    <p className='text-lg font-semibold text-center'>Unlock Your Career Journey with JobQuest: Find Your Dream Job Today!</p>
                    <div className="join mt-5">
                        <input className="input input-bordered join-item" placeholder="Search jobs here" />
                        <button className="btn join-item border-0 bg-[#395B64] text-[#E7F6F2]">Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
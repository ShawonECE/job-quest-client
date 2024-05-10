import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

const ThemeBtn = () => {
    const [dark, setDark] = useState(false);
    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [dark]);
    return (
        <div onClick={() => setDark(!dark)} className="mr-2 cursor-pointer">
            {
                dark ? <MdOutlineWbSunny className="text-3xl text-white" /> : <IoMoonOutline className="text-3xl" />
            }
        </div>
    );
};

export default ThemeBtn;
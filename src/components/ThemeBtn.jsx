import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { useEffect } from "react";
import PropTypes from 'prop-types';

const ThemeBtn = ({dark, setDark}) => {
    
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

ThemeBtn.propTypes = {
    dark: PropTypes.bool.isRequired,
    setDark: PropTypes.func.isRequired,
};

export default ThemeBtn;
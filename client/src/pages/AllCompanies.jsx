import { useState, useEffect, useRef } from 'react';
import AllCompaniesBG from '../../src/assets/AllCompaniesBg.png';
import CompainesCategory from '../components/CompainesCategory'

console.log(AllCompaniesBG);
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const AllCompanies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const inputRef = useRef(null);
    // Sample data for predictive search
    const companies = [
        'Digital Marketing Co.',
        'SEO Experts',
        'Social Media Gurus',
        'Content Creators Inc.',
        'PPC Masters',
        'Brand Builders',
        'Web Wizards',
        'Analytics Pros'
    ];

    // Use debounce hook
    const debouncedSearchTerm = useDebounce(searchTerm, 600);

    useEffect(() => {
        if (debouncedSearchTerm) {
            const filteredSuggestions = companies.filter(company =>
                company.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [debouncedSearchTerm]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const clearSearch = () => {
        setSearchTerm('');
        setSuggestions([]);
        inputRef.current.focus();
    };

    return (
        <main >
            <div className="md:py-40 px-4 md:px-32 object-cover bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${AllCompaniesBG})` }}>
                <h1 className='text-3xl md:text-5xl text-center my-7'>Find the right <b className='gilroy-extraBold'>Digital Marketing Agency</b></h1>
                <h2 className='text-center text-lg tracking-wide'>Explore agencies that fit for your needs, goals, and vision.</h2>
                <div className="my-6 max-w-lg mx-auto relative">
                    <div className="flex pl-4 items-center border border-slate-600 rounded-full p-2 bg-white focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-400">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            ref={inputRef}
                            className="w-full p-2 bg-white outline-none"
                            placeholder="Search for a company..."
                        />
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="p-2 text-gray-500 border-r border-r-slate-300 hover:text-gray-700 bg-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill='#6a7ca6' height="20px" viewBox="0 0 512 512" width="20px"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm94.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0" /></svg>
                            </button>
                        )}
                        <button
                            className="p-3 text-gray-500 border border-slate-400 ml-2 hover:text-gray-700 bg-slate-300 hover:bg-slate-400 rounded-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 612.01 612.01"  >
                                <g>
                                    <g >
                                        <g>
                                            <path d="M606.209,578.714L448.198,423.228C489.576,378.272,515,318.817,515,253.393C514.98,113.439,399.704,0,257.493,0     C115.282,0,0.006,113.439,0.006,253.393s115.276,253.393,257.487,253.393c61.445,0,117.801-21.253,162.068-56.586     l158.624,156.099c7.729,7.614,20.277,7.614,28.006,0C613.938,598.686,613.938,586.328,606.209,578.714z M257.493,467.8     c-120.326,0-217.869-95.993-217.869-214.407S137.167,38.986,257.493,38.986c120.327,0,217.869,95.993,217.869,214.407     S377.82,467.8,257.493,467.8z" />
                                        </g>
                                    </g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                            </svg>
                        </button>
                    </div>
                    {suggestions.length > 0 && (
                        <div className='absolute w-full'>
                            <ul className="border  border-gray-300 rounded-2xl p-4 z-10 shadow-lg mt-2 bg-white">
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className='w-full px-3 pb-16 md:pb-0 pt-16 flex flex-col gap-y-4 justify-center items-center text-center'>
                    <div>
                        <img className='w-16' src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI3LjUuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyMDAgMjAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzAwOEJGRjt9Cgkuc3Qxe2ZpbGw6I0Y2OTQ1QTt9Cgkuc3Qye2ZpbGw6I0Y0RTlERjt9Cgkuc3Qze29wYWNpdHk6MC42MztmaWxsOiNDREIyOTg7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9Cgkuc3Q0e2ZpbGw6I0E3NUQyQTt9Cgkuc3Q1e29wYWNpdHk6MC4zO2ZpbGw6IzEyMDAwMDtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDZ7ZmlsbDojQTQ1QzJFO30KCS5zdDd7ZmlsbDojQTI1RDJBO30KCS5zdDh7b3BhY2l0eTowLjQ7ZmlsbDojRkZGQ0VBO2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAgICA7fQoJLnN0OXtmaWxsOiMzQjIzMTQ7fQoJLnN0MTB7ZmlsbDojMTIwMDAwO30KCS5zdDExe29wYWNpdHk6MC40O2ZpbGw6IzEyMDAwMDtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDEye2ZpbGw6IzQ4MkUxRjt9Cgkuc3QxM3tmaWxsOiMyN0QzQkM7fQoJLnN0MTR7ZmlsbDojNTc0NkIyO30KCS5zdDE1e2ZpbGw6IzMyMjY4Rjt9Cgkuc3QxNntmaWxsOiNGRkM4MDM7fQo8L3N0eWxlPgo8Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTM1LjcsMTM2LjhMMTI3LDE4NUg2OGwtNy42LTQ4LjJMMzgsODAuN2wxMjAuMiwyTDEzNS43LDEzNi44eiIvPgo8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNzQuNywxODQuNWwxLjYtNDcuN2wtMTMtNTRoNjkuNWwtMTIuOSw1NGwxLjUsNDcuOUw3NC43LDE4NC41eiIvPgo8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNzUuMiwxNzMuNGMwLjYtMjEuOSwxLTM2LjYsMS0zNi42bC0xMy01NGg2LjZ2NC44YzAsMTUuMywxMi40LDEyLjQsMjcuNiwxMi40aDEuOXY3Ny45TDc1LjIsMTczLjR6Ii8+CjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMDcuOSwxMTUuN0w4NywxMzYuNWgyMi4zIi8+CjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMDcuOSwxMjkuMkw4NywxNTBoMjIuMyIvPgo8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNNTguMywxNzcuMmwyLjEtNDAuNEwzOCw4MC44bDI1LjMsMmwxMyw1NGwtMS4zLDQxTDU4LjMsMTc3LjJ6Ii8+CjxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik0xNDguNiw4Mi43Yy02LjMsMjItMjYuNSwzOC4xLTUwLjUsMzguMWMtMTYuOSwwLTMxLjgtMC40LTQ0LjctMS4xTDM4LDgwLjdMMTQ4LjYsODIuN3oiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4OC43LDUzLjljLTAuNSwxLjctMS4yLDMuMi0yLjEsNC41bC0zLjksNS4xYy0zLjEsNC4xLTguNyw0LjYtMTIuNSwxLjJsLTE2LjYtMTUuMWMtMy44LTMuNS0zLjEtOCwxLjYtMTAKCWwxNi40LTcuMmMwLjUtMC4yLDEtMC40LDEuNS0wLjVjMSwxLDEuOSwyLDIuOCwzLjFDMTgwLjgsNDAuNiwxODUuMiw0NywxODguNyw1My45eiIvPgo8cGF0aCBjbGFzcz0ic3Q2IiBkPSJNMTc1LjgsMzQuOGwtMTcuMiwxOS4zbC01LjEtNC42Yy0zLjgtMy41LTMuMS04LDEuNi0xMGwxNi40LTcuMmMwLjUtMC4yLDEtMC40LDEuNS0wLjUKCUMxNzQsMzIuOCwxNzUsMzMuOCwxNzUuOCwzNC44eiIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTcyLjUsNjAuNmMwLDAtMy4yLTQuNy03LjEtMTAuNGwtMS0xLjRjLTMuOS01LjctMTIuNi0xMi0xOS4yLTEzLjlsLTMzLjEtOS41Yy02LjctMS45LTE3LjYtMS45LTI0LjMtMC4xCglsLTM1LjQsOS45Yy02LjcsMS45LTE0LjksOC4zLTE4LjMsMTQuNEwzNCw1MGMtMy40LDYtNi4yLDExLTYuMiwxMXMyLjMsNS4yLDUuMiwxMS41bDIuMiw0LjljMi45LDYuMywxMC41LDEzLjYsMTYuOSwxNi4xCglsMzYuNCwxNC40YzYuNCwyLjYsMTYuOSwyLjQsMjMuMy0wLjJsMzMuOS0xNC4zYzYuNC0yLjcsMTQuMy05LjksMTcuNi0xNmwzLjEtNS43QzE2OS44LDY1LjYsMTcyLjUsNjAuNiwxNzIuNSw2MC42TDE3Mi41LDYwLjZ6Ii8+CjxwYXRoIGNsYXNzPSJzdDciIGQ9Ik0xMjMuOSw3My40YzIsMiw1LjgsMy4yLDguNSwyLjhsMjEtMy4yYzIuNy0wLjQsNC44LTMsNC42LTUuOGwtMS4yLTE4LjZjLTAuMi0yLjgtMi42LTUuNS01LjMtNmwtMjUuMS01LjIKCWMtMi43LTAuNi01LjgsMS4xLTYuOCwzLjdsLTYuMiwxNS4zYy0xLDIuNi0wLjMsNi4zLDEuNiw4LjJDMTE1LDY0LjYsMTIzLjksNzMuNCwxMjMuOSw3My40eiIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTI0LjQsNzQuMmwzLjgsMi44bDMwLjgtNC44bC0xLjItMi44Yy0zLjktMy4yLTktNS4yLTE0LjUtNS4yQzEzNS41LDY0LjIsMTI4LjYsNjguMiwxMjQuNCw3NC4yeiIvPgo8cGF0aCBjbGFzcz0ic3Q4IiBkPSJNMTA1LjQsODEuNWwxMi4xLDExLjdjMi44LDIuNywzLjYsMi4xLDEuOC0xLjNMMTA1LjQsNjVjLTEuOC0zLjQtMS43LTksMC4xLTEyLjRsMTEuMy0yMC45CgljMC45LTEuNiwyLjQtMi45LDQuMi0zLjdsLTguOC0yLjVjLTMuMi0wLjktNy41LTEuNC0xMS44LTEuNHY0NS41QzEwMC40LDczLjQsMTAyLjcsNzguOCwxMDUuNCw4MS41eiIvPgo8cGF0aCBjbGFzcz0ic3Q2IiBkPSJNNDYuNCw0OS42bC0xNi42LDE1Yy0zLjgsMy40LTkuNSwyLjktMTIuNS0xLjJsLTMuOS01LjFjLTEtMS4zLTEuNy0yLjgtMi4xLTQuNWMzLjYtNi45LDcuOS0xMy4yLDEyLjktMTkKCWMwLjktMSwxLjgtMi4xLDIuOC0zLjFjMC41LDAuMSwxLDAuMywxLjUsMC41bDE2LjQsNy4yQzQ5LjUsNDEuNiw1MC4yLDQ2LjEsNDYuNCw0OS42eiIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDYuNCw0OS42bC01LjEsNC42TDI0LjIsMzQuOGMwLjktMSwxLjgtMi4xLDIuOC0zLjFjMC41LDAuMSwxLDAuMywxLjUsMC41bDE2LjQsNy4yCglDNDkuNSw0MS42LDUwLjIsNDYuMSw0Ni40LDQ5LjZ6Ii8+CjxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik04OS40LDgwLjFsMi4yLTEyLjJjMS01LjYsMC4xLTE0LjUtMS45LTE5LjhsLTgtMjFsLTI5LjIsOC4yYy02LjcsMS45LTE0LjksOC4zLTE4LjMsMTQuNEwzNCw1MAoJYy0zLjQsNi02LjIsMTEtNi4yLDExczIuMyw1LjIsNS4yLDExLjVsMi4yLDQuOWMyLjksNi4zLDEwLjUsMTMuNiwxNi45LDE2LjFsNS43LDIuM2wxOS42LTMuNkM4Myw5MS4xLDg4LjQsODUuNyw4OS40LDgwLjF6Ii8+CjxwYXRoIGNsYXNzPSJzdDgiIGQ9Ik0xNjQuNCw3NS44Yy00LjEtNC05LjgtNi41LTE2LTYuNWMtMS43LDAtMy40LDAuMi01LDAuNmM3LjIsMS42LDEzLjIsNi43LDE2LDEzLjRjMS43LTEuOSwzLjEtMy45LDQuMS01LjcKCUwxNjQuNCw3NS44eiIvPgo8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNTIuMiw5My41bDM2LjQsMTQuNGM2LjQsMi42LDE2LjksMi40LDIzLjMtMC4ybDMzLjktMTQuM2MyLjktMS4yLDYuMi0zLjQsOS4yLTZjLTYuNSwxLjgtMTUuNywxLjEtMjEuNC0xLjkKCWwtMjIuNC0xMS43Yy02LjEtMy4yLTE2LjItMy4zLTIyLjQtMC4yTDY0LjMsODZjLTYuMiwzLjEtMTUuMiwzLjMtMjAsMC40Yy0xLjktMS4xLTMuNi0yLjEtNS0zQzQyLjgsODcuOCw0Ny44LDkxLjgsNTIuMiw5My41eiIvPgo8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMTAzLjMsMTA1LjFsMjEuOS0xNS44bC0yMy42LDYuNWwwLjItMTQuMWwwLjktMTAuMmMtNC45LTAuNC0xMCwwLjMtMTMuOCwyLjFMNjQuMyw4NgoJYy02LjIsMy4xLTE1LjIsMy4zLTIwLDAuNGMtMS45LTEuMS0zLjYtMi4xLTUtM2MzLjYsNC4zLDguNiw4LjMsMTMsMTBsMzYuNCwxNC40YzYuNCwyLjYsMTYuOSwyLjQsMjMuMy0wLjJsMTkuNi04LjIKCWMtMTQuMSwzLjQtMjguMSw2LjItMjguMSw2LjJMMTAzLjMsMTA1LjF6Ii8+CjxwYXRoIGNsYXNzPSJzdDkiIGQ9Ik0xMTIuOCw3OS44Yy0yLjIsNC40LTcuOSw4LTEyLjgsOGMtNC44LDAtMTAuNS0zLjYtMTIuNi04bC0xLjctMy41Yy0yLjEtNC40LDAuMS04LjYsNC45LTkuNGwwLjgtMC4xCgljNC44LTAuNywxMi43LTAuOCwxNy42LDBsMC44LDAuMWM0LjgsMC43LDcsNC45LDQuOCw5LjNDMTE0LjYsNzYuMiwxMTIuOCw3OS44LDExMi44LDc5Ljh6Ii8+CjxwYXRoIGNsYXNzPSJzdDEwIiBkPSJNOTQuOSw3Ni42YzAsMi44LTIuMyw1LjEtNS4xLDUuMWMtMC41LDAtMC45LTAuMS0xLjQtMC4yYy0wLjQtMC42LTAuOC0xLjEtMS0xLjdsLTEuNy0zLjUKCWMtMC4zLTAuNi0wLjUtMS4yLTAuNi0xLjdjMC44LTEuOCwyLjYtMy4xLDQuNy0zLjFDOTIuNiw3MS41LDk0LjksNzMuNyw5NC45LDc2LjZ6IE0xMTUuNCw3My4xYy0wLjEsMS0wLjMsMi0wLjgsM2wtMS44LDMuNwoJYy0wLjMsMC43LTAuNywxLjMtMS4yLDEuOWMtMi44LTAuMS01LTIuMy01LTUuMXMyLjMtNS4xLDUuMS01LjFDMTEzLjIsNzEuNSwxMTQuNSw3Mi4xLDExNS40LDczLjF6Ii8+CjxwYXRoIGNsYXNzPSJzdDExIiBkPSJNNzEuNiw3NGMtMi4yLDEuNy02LjMsMi42LTksMi4xbC0xNS44LTIuOWMtMi43LTAuNS00LjktMy4yLTQuNy02bDAuOC0xNi41YzAuMS0yLjgsMi40LTUuNyw1LjEtNi40bDIzLjEtNi42CgljMi43LTAuOCw1LjksMC42LDcuMiwzLjFsOC4zLDE1LjdjMS4zLDIuNCwwLjYsNS44LTEuNyw3LjVMNzEuNiw3NHoiLz4KPHBhdGggY2xhc3M9InN0NCIgZD0iTTUyLjcsNjQuMmMtNC4zLDAtOC4zLDEuMi0xMS43LDMuMmwtMiw0LjhMNjcuNiw3N2wzLjktMi45QzY3LjQsNjguMSw2MC41LDY0LjIsNTIuNyw2NC4yeiIvPgo8Y2lyY2xlIGNsYXNzPSJzdDEwIiBjeD0iMTI1LjkiIGN5PSI2MC4zIiByPSI1LjEiLz4KPHBhdGggY2xhc3M9InN0MTIiIGQ9Ik0xMjIuNCw2MC4yYzAtMiwxLjYtMy42LDMuNi0zLjZzMy42LDEuNiwzLjYsMy42SDEyMi40eiIvPgo8Y2lyY2xlIGNsYXNzPSJzdDEwIiBjeD0iNzQuNCIgY3k9IjYwLjMiIHI9IjUuMSIvPgo8cGF0aCBjbGFzcz0ic3QxMiIgZD0iTTcwLjksNjAuMmMwLTIsMS42LTMuNiwzLjYtMy42czMuNiwxLjYsMy42LDMuNkg3MC45eiIvPgo8cGF0aCBjbGFzcz0ic3QxMyIgZD0iTTMxLjQsNDEuNHY1YzAsMCw1LjUsMS45LDcuNywxMS4xQzQxLjIsNjYuNyw0Miw3Nyw1Ni45LDc3czE3LjYsMC40LDIyLjEtMS42YzQuNC0yLDctNy4yLDguMi0xMS44CgljMC41LTEuOSwwLjQtMi44LDEuMy03LjdDODguOSw0OS44LDk0LDQ1LDEwMC4yLDQ1czExLjMsNC44LDExLjgsMTAuOWMxLDUuOSwxLDUuOSwxLjUsNy43YzEuMiw0LjYsMy44LDkuNyw4LjIsMTEuOAoJYzQuNCwyLDYuOSwxLjYsMjEuOCwxLjZzMTUuNi0xMC4zLDE3LjgtMTkuNWMyLjEtOS4yLDcuNy0xMS4xLDcuNy0xMS4xdi01SDMxLjR6IE04NC4zLDU0LjljLTIsMTIuOC00LjIsMTYuOC05LDE3LjgKCWMtNC4xLDAuOS0xNi45LDEuNS0yMi0wLjJjLTUuMS0xLjgtOC43LTExLjMtOC45LTE5LjNzOC4zLTcuNiw4LjMtNy42aDE0LjRDNzcuNCw0NS42LDg1LjQsNDcuNSw4NC4zLDU0Ljl6IE0xNDcsNzIuNQoJYy01LjEsMS44LTE3LjYsMS4xLTIxLjcsMC4yYy00LjgtMS03LjMtNS05LjItMTcuOGMtMS4xLTcuMyw2LjktOS4yLDE3LjEtOS4yaDE0LjRjMCwwLDguNC0wLjQsOC4zLDcuNgoJQzE1NS43LDYxLjIsMTUyLDcwLjcsMTQ3LDcyLjVMMTQ3LDcyLjV6Ii8+CjxwYXRoIGNsYXNzPSJzdDE0IiBkPSJNMTM4LjgsMTkyLjJjLTExLjksNS0yNS4xLDcuOC0zOC44LDcuOGMtMTUuMiwwLTI5LjctMy40LTQyLjYtOS41bDMtNTMuNWwzOS4xLDI1LjZsMzYuMi0yNS42TDEzOC44LDE5Mi4yeiIKCS8+CjxwYXRoIGNsYXNzPSJzdDE1IiBkPSJNOTkuNSwxNjIuNVYyMDBjLTE1LjEtMC4xLTI5LjMtMy41LTQyLjEtOS41bDMtNTMuNUw5OS41LDE2Mi41eiIvPgo8cGF0aCBjbGFzcz0ic3QxNiIgZD0iTTEzNS43LDEzN2wtMzYsMjUuNGw0MS44LTEwLjNMMTM1LjcsMTM3eiBNNTIuNCwxNDkuOWw0NywxMi42bC0zOS0yNS41TDUyLjQsMTQ5Ljl6Ii8+Cjwvc3ZnPgo=" alt="" />
                    </div>
                    <h3 className='font-semibold text-2xl'>Meet Monty by G2</h3>
                    <p className='text-2xl font-extralight'>The first ever AI assistant for buying software, powered by ChatGPT.</p>
                    <div className='flex gap-x-4 justify-center items-center'>
                        <button className='px-5 py-1 text-lg bg-[#5a39a2] text-white rounded-full hover:bg-[#3b2569]'>
                            Get Started
                        </button>
                        <a className='cursor-pointer text-[#246f9e] hover:underline hover:text-[#5a39a2]'>Read about it </a>
                    </div>
                </div>
            </div>
            <CompainesCategory/>
        </main>
    )
};

export default AllCompanies;

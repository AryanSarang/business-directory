import { useState, useEffect } from 'react';

const MultiSelect = ({ options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        const updatedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter(item => item !== option)
            : [...selectedOptions, option];

        setSelectedOptions(updatedOptions);
        onChange(updatedOptions);
    };

    const clearSelection = () => {
        setIsOpen(false);
        setSelectedOptions([]);
        onChange([]);
    };

    const displaySelectedOptions = () => {
        if (selectedOptions.length <= 3) {
            return selectedOptions.join(', ');
        }
        return `${selectedOptions.slice(0, 2).join(', ')} and ${selectedOptions.length - 2} more`;
    };

    return (
        <div className="mb-4">
            <div className="relative">
                <div
                    className="relative select-none py-2 px-3 flex gap-x-2 w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={toggleDropdown}
                >
                    {selectedOptions.length > 0 ? (
                        <span>{displaySelectedOptions()}</span>
                    ) : (
                        <span className="text-gray-500">Select all the tags related to blog</span>
                    )}
                    <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 9l5-5 5 5M7 15l5 5 5-5" />
                        </svg>
                    </span>
                </div>
                {isOpen && (
                    <div className="mt-0 z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-auto">
                        {options.map(option => (
                            <div
                                key={option}
                                className={`py-2 px-4 w-full select-none text-sm cursor-pointer hover:bg-gray-100 rounded-lg ${selectedOptions.includes(option) ? 'bg-gray-100' : ''}`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                                {selectedOptions.includes(option) && (
                                    <svg className="inline-block w-4 h-4 text-blue-600 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {selectedOptions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                    <button
                        type="button"
                        className="py-1 px-2 select-none inline-flex items-center gap-x-1 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                        onClick={clearSelection}
                    >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                        </svg>
                        remove tags
                    </button>
                </div>
            )}
        </div>
    );
};

export default MultiSelect;



const MultiSelectUpdate = ({ options, onChange, defaultValue = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(defaultValue);

    useEffect(() => {
        // Only update selectedOptions if defaultValue is different
        if (defaultValue && defaultValue.length !== selectedOptions.length) {
            setSelectedOptions(defaultValue);
        }
    }, [defaultValue]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        const updatedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter(item => item !== option)
            : [...selectedOptions, option];

        setSelectedOptions(updatedOptions);
        onChange(updatedOptions);
    };

    const clearSelection = () => {
        setIsOpen(false);
        setSelectedOptions([]);
        onChange([]);
    };

    const displaySelectedOptions = () => {
        if (selectedOptions.length <= 3) {
            return selectedOptions.join(', ');
        }
        return `${selectedOptions.slice(0, 2).join(', ')} and ${selectedOptions.length - 2} more`;
    };

    return (
        <div className="mb-4">
            <div className="relative">
                <div
                    className="relative select-none py-2 px-3 flex gap-x-2 w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={toggleDropdown}
                >
                    {selectedOptions.length > 0 ? (
                        <span>{displaySelectedOptions()}</span>
                    ) : (
                        <span className="text-gray-500">Select all the tags related to blog</span>
                    )}
                    <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 9l5-5 5 5M7 15l5 5 5-5" />
                        </svg>
                    </span>
                </div>
                {isOpen && (
                    <div className="mt-0 z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-auto">
                        {options.map(option => (
                            <div
                                key={option}
                                className={`py-2 px-4 w-full select-none text-sm cursor-pointer hover:bg-gray-100 rounded-lg ${selectedOptions.includes(option) ? 'bg-gray-100' : ''}`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                                {selectedOptions.includes(option) && (
                                    <svg className="inline-block w-4 h-4 text-blue-600 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {selectedOptions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                    <button
                        type="button"
                        className="py-1 px-2 select-none inline-flex items-center gap-x-1 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                        onClick={clearSelection}
                    >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                        </svg>
                        remove tags
                    </button>
                </div>
            )}
        </div>
    );
};

export  {MultiSelectUpdate};

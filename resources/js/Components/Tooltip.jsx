import React, { useState, useRef } from 'react';

const Tooltip = ({ children, text }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div className="relative inline-block">
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={tooltipRef}
            >
                {children}
            </div>
            {showTooltip && (
                <div
                    className="top-0 absolute z-10 p-2 bg-gray-700 text-white text-sm rounded-md shadow-lg -translate-y-full !min-w-10"
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;

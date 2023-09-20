import { useState } from 'react';
import PropTypes from 'prop-types';

const Square = ({ color, onClick }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(current => !current);
        onClick();
    };

    return (
        <div
            className={`square ${isActive ? 'active' : ''}`}
            style={{ backgroundColor: isActive ? color : 'white' }}
            onClick={handleClick}
        ></div>
    );
};

Square.propTypes = {
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Square;

import React from "react";
import PropTypes from "prop-types";
import declOfNum from "../../utils/declOfNum";

const SearchStatus = ({ number }) => {
    const variantsPhrases = [
        "человек тусанет",
        "человека тусанут",
        "человек тусанут"
    ];

    let classes = "badge m-1 bg-";
    classes += number === 0 ? "danger" : "primary";
    let phrase;
    if (number === 0) {
        phrase = "Никто не тусанет";
    } else {
        phrase = `${number} ${declOfNum(number, variantsPhrases)}`;
    }

    return (
        <h2>
            <span className={classes}>{phrase} с тобой сегодня</span>
        </h2>
    );
};

SearchStatus.propTypes = {
    number: PropTypes.number.isRequired
};

export default SearchStatus;

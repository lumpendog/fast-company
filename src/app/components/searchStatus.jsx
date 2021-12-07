import React from 'react';

const SearchStatus = (props) => {
  const { number } = props;

  //Helper function to find the right phrase for current number
  const declOfNum = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  const variantsPhrases = [
    'человек тусанет',
    'человека тусанут',
    'человек тусанут',
  ];

  let classes = 'badge m-1 bg-';
  classes += number === 0 ? 'danger' : 'primary';
  let phrase;
  if (number === 0) {
    phrase = 'Никто не тусанет';
  } else {
    phrase = `${number} ${declOfNum(number, variantsPhrases)}`;
  }

  return (
    <h2>
      <span className={classes}>{phrase} с тобой сегодня</span>
    </h2>
  );
};

export default SearchStatus;

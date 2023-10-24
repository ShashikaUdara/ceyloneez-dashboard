// PopularChoices.js

import React, { useState } from 'react';
import './PopularChoices.css';

const quickChoices = [
  'Apparel',
  'Rubber',
  'Coconut',
  'Tea',
  'Jewelries',
  'Hand Crafts',
  'Gems'
];

const PopularChoices = ({ onChoiceSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchButton, setShowSearchButton] = useState(false);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchTerm(inputText);
    // Show the search button if the input text is not empty and not in quickChoices
    setShowSearchButton(inputText.trim() !== '' && !quickChoices.includes(inputText));
  };

  const handleChoiceClick = (choice) => {
    onChoiceSelect(choice);
  };

  const handleSearchButtonClick = () => {
    if (searchTerm.trim() !== '') {
      onChoiceSelect(searchTerm);
    }
  };

  const filteredChoices = quickChoices.filter(choice =>
    choice.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="popular-choices">
      <h3 className="popular-choices-title">Popular Choices</h3>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search-bar"
      />
      {showSearchButton && (
        <button className="search-button" onClick={handleSearchButtonClick}>
          Search
        </button>
      )}
      <div className="quick-choices">
        {filteredChoices.map(choice => (
          <div
            key={choice}
            className="choice-item"
            onClick={() => handleChoiceClick(choice)}
          >
            {choice}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularChoices;

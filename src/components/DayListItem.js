import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

/**
  * React component for single item in DayList
  * @property {Boolean} selected Whether item is currently selected
  * @property {Number} spots Remaining appointment spots available for the day
  * @property {String} name Name of the day
  * @property {Function} setDay Function to set this item to selected day
  * @return {Component} React component
*/
export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  const formatSpots = (spots) => {
    if (spots > 1) {
      return `${spots} spots`;
    }
    if (spots === 1) {
      return '1 spot';
    }
    return 'no spots';
  }

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}
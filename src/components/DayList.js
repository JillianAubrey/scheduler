import React from "react";
import DayListItem from "./DayListItem";

/**
  * React controlled component with clickable days
  * @property {Array} days List of available days
  * @property {Number} value State variable containing name of selected day
  * @property {Function} onChange Function called when user selects another day, gets passed name of selection
  * @return {Component} React component
*/
export default function DayList(props) {
  const dayListItems = props.days.map(day => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots} 
        selected={day.name === props.value}
        setDay={props.onChange}  
      />
    ); 
  });

  return (
    <ul>
      {dayListItems}
    </ul>
  );
}
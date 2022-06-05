import React from 'react';
import { Link } from 'react-router-dom';

export default function Study({ studyType, description, attach }) {
  function openTab() {
    window.open(attach);
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',

        justifyContent: 'space-between',
        marginBottom: '10px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'black',
      }}
    >
      <h2>
        <div>Type of Study:</div> {studyType}
      </h2>
      <h2>
        <div>Description:</div>
        {description === null ? 'Does not contain description' : description}
        <button onClick={openTab}>📋</button>
      </h2>
    </div>
  );
}

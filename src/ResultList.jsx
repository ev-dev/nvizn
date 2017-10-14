import React from 'react'
import SingleResult from './SingleResult'

const ResultList = ({ searchResults }) => (
  <div className="result-list-container">
    {searchResults && searchResults.map(result => (
      <SingleResult resultData={result} key={result.id[0]}/>
    ))}
  </div>
)

export default ResultList
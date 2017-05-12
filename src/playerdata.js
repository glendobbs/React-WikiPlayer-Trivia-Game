import React from 'react';

const Table = ({player}) => {
  if(player){
    return(
      <div className="table">
        <table>
          <thead>
            <tr className="heading">
              <th colSpan="4">Club Career</th>
            </tr>
            <tr>
              <th className="left-col">Years</th>
              <th>Team</th>
              <th>Apps</th>
              <th>(Gls)</th>
            </tr>
          </thead>
          <tbody>
            {player.clubYears.map((item, i) =>
              <tr key={i}>
                <td className="years left-col">{item.text}</td>
                <td>{player.clubs[i].text}</td>
                <td>{player.clubApps[i].text}</td>
                <td>({player.clubGoals[i].text})</td>
              </tr>
            )}
            <tr className="heading">
              <th colSpan="4">International Career</th>
            </tr>
            {player.intYears.map((item, i) =>
              <tr key={i}>
                <td className="years left-col">{item.text}</td>
                <td>{player.intTeams[i].text}</td>
                <td>{player.intApps[i].text}</td>
                <td>({player.intGoals[i].text})</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  } else {
    return(
      null
    )
  }
}



export default Table;

import React, {useState, useEffect} from 'react';

const History = (props) => {

  const [history, setHistory] = useState([{}]);
  const [historyFetched, setHistoryFetched] = useState(false);

  const	handleToUpdate	=	props.handleToUpdate;

  const getHistory = async (e) => {
    e ? e.preventDefault() : undefined;
    let response = '';
    const url = 'http://localhost:4242/history';
    try{
      response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
      });
    }catch (error){
      console.error('Oh my! Got an error: ', error.message);
    }
    const result = await response.json();
    setHistory(result);
    setHistoryFetched(true);
  };

  useEffect(() => {
    !historyFetched ? getHistory(null) : undefined;
  }, [historyFetched]);

  return(
    <>
      <h2>History</h2>
      <p>5 most recent runs</p>
      <div className='browser' width='100%' >
        <table>
          <tbody>
            <tr className='table-header'>
              <th>Date<br />&nbsp;</th>
              <th>Distance<br />(km)</th>
              <th>Time<br />(h:m)</th>
              <th>Pace<br />(km/h)</th>
            </tr>
            {historyFetched ? history.map(item => {
              return (
                // <tr title={'Entered data from ' + item.date} onClick={(e) => handleLink(e, item)} key={item.id}>
                // <tr title={'Entered data from ' + item.date} onClick={(e) => handleLink(e, item)} key={item.id}>
                <tr title={'Entered data from ' + item.date} onClick={(e) => handleToUpdate(e, item)} key={item.id}>
                  <td>{item.date}</td>
                  <td className='justifyRight'>{Number(item.distance).toFixed(2)}</td>
                  <td className='justifyRight'>{Number(item.time).toFixed(2)}</td>
                  <td className='justifyRight'>{Number(item.pace).toFixed(2)}</td>
                </tr>
              );
            }) : undefined}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default History;
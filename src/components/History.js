import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faRulerHorizontal, faShoePrints, faClock } from '@fortawesome/free-solid-svg-icons';

const History = (props) => {

  const [history, setHistory] = useState([{}]);
  const [nextId, setNextId] = useState(0);

  const	handleUpdate	=	props.handleUpdate;

  const getHistory = async () => {
    let response = '';
    const maxEntries = 5;
    const url = 'http://localhost:4242/history';
    try{
      response = await fetch(url, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'text/xml',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
      });
    }catch (error){
      console.error('Oh my! Got an error: ', error.message);
    }

    // Get the list from response
    let list = await response.json();

    // Get last id and prepare nextId
    setNextId((list[Object.keys(list).length-1].id + 1));

    // Get only the last max number of entries from history
    list = list.filter((el, index) => {
      return index >= list.length - maxEntries;
    });

    // Sort the list to show the latest entries first
    list.sort((a,b) => {
      return new Date(b.date) - new Date(a.date);
    });

    setHistory(list);
  };

  useEffect(() => {
    history[0].id == undefined ? getHistory() : undefined;
  }, [history]);
  
  return(
    <>
      <h2>History</h2>
      <p>5 most recent runs</p>
      <div className='browser' width='100%' >
        <table>
          <tbody>
            <tr className='table-header'>
              <th title="Date"><FontAwesomeIcon icon={faCalendarAlt} /></th>
              <th title="Distance"><FontAwesomeIcon icon={faRulerHorizontal} /></th>
              <th title="Time"><FontAwesomeIcon icon={faClock} /></th>
              <th title="Pace"><FontAwesomeIcon icon={faShoePrints} /></th>
            </tr>
            {history.length >= 2 ? history.map(item => {
              return (
                <tr className="fade" title={'Entered data from ' + item.id} onClick={(e) => handleUpdate(e, item, nextId)} key={item.id}>
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
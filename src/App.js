import React, {useEffect, useState, Fragment} from 'react';
import './App.css';

function App() {

  const URL_STRING = 'https://jsonplaceholder.typicode.com/posts';
  const POST_COUNT = 10;

  const PREV_POST_ACTIONS = {
    type: 'prev',
    num: POST_COUNT
  };

  const NEXT_POST_ACTIONS = {
    type: 'next',
    num: POST_COUNT
  };

  const START_POST_ACTIONS = {
    type: 'start'
  };

  const END_POST_ACTIONS = {
    type: 'end'
  };

  const fetchData = async (url) => {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  };

  const [tableData, setTableData] = useState([]);
  const [postIndexStart, setPostIndexStart] = useState(0);
  const [postIndexEnd, setPostIndexEnd] = useState(POST_COUNT);
  const [totalPostCount, setTotalPostCount] = useState(0);

  useEffect(() => {

    fetchData(URL_STRING)
      .then(res => {
        setTableData(res.slice(postIndexStart, postIndexEnd));
        setTotalPostCount(res.length);
      });

  }, [postIndexStart, postIndexEnd]);

  const loadPosts = (actions) => {
    switch(actions.type) {
      case 'prev':
        if(postIndexStart === 0) {
          alert('no previous posts');
        } else {
          setPostIndexStart(postIndexStart - actions.num);
          setPostIndexEnd(postIndexEnd - actions.num);
        }
      break;
      case 'next':
        if(postIndexStart === (totalPostCount - POST_COUNT)) {
          alert('no more posts');
        } else {
          setPostIndexStart(postIndexStart + actions.num);
          setPostIndexEnd(postIndexEnd + actions.num);
        }
      break;
      case 'start':
        setPostIndexStart(0);
        setPostIndexEnd(POST_COUNT);
      break;
      case 'end':
        setPostIndexStart((totalPostCount - POST_COUNT));
        setPostIndexEnd(totalPostCount);
        break;
      default:
        return actions.num;
    }
  };

  return (
    <div className="App">
    <table>
    <tbody>
      <tr>
        <th>ID</th>
        <th>Contact</th>
        <th>Country</th>
      </tr>
     

      {(tableData.length > 0) && (

        <Fragment>
          {tableData.map((item) => (
            
            <tr key={item.id}>
             <td>{item.id}</td>
             <td>{item.title.substr(1, 16)}</td>
             <td>{item.body.substr(1, 8)}</td>
            </tr>
           
          ))}
        </Fragment>

      )}
      </tbody>
  </table>
  <button onClick={() => loadPosts(START_POST_ACTIONS)}>Start</button>
  <button onClick={() => loadPosts(PREV_POST_ACTIONS)}>Prev post</button>
  <button onClick={() => loadPosts(NEXT_POST_ACTIONS)}>Next post</button>
  <button onClick={() => loadPosts(END_POST_ACTIONS)}>End</button>
</div>
  );
}

export default App;

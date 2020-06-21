import React, {useEffect, useState, Fragment} from 'react';
import './App.css';

function App() {

  const [tableData, setTableData] = useState([]);
  const [postIndexStart, setPostIndexStart] = useState(0);

  const POST_LIMIT = 10;
  const POST_START = 0;
  const POST_MAX = 90;
  const URL_STRING = `http://jsonplaceholder.typicode.com/posts?_start=${postIndexStart}&_limit=${POST_LIMIT}`;
  const POST_SKIP_COUNT = 5;
  const ACTION_TYPES = {prev: 'prev', next: 'next', start: 'start', end: 'end'};

  const PREV_POSTS = {
    type: ACTION_TYPES.prev,
    payload: POST_LIMIT
  };

  const SKIP_PREVIOUS_POSTS = {
    type: ACTION_TYPES.prev,
    payload: POST_SKIP_COUNT
  };

  const SKIP_NEXT_POSTS = {
    type: ACTION_TYPES.next,
    payload: POST_SKIP_COUNT
  };

  const NEXT_POSTS = {
    type: ACTION_TYPES.next,
    payload: POST_LIMIT
  };

  const GO_TO_POST_START = {
    type: ACTION_TYPES.start
  };

  const GO_TO_POST_END = {
    type: ACTION_TYPES.end
  };

  const fetchData = async (url) => {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  };

  useEffect(() => {

    fetchData(URL_STRING)
      .then(res => {
        setTableData(res);
      });

  }, [postIndexStart, URL_STRING]);

  const loadPosts = (actions) => {
    switch(actions.type) {
      case ACTION_TYPES.prev:
         (postIndexStart === POST_START) ? alert('no previous posts') : setPostIndexStart(postIndexStart - actions.payload);
          break;
      case ACTION_TYPES.next:
         (postIndexStart === POST_MAX) ? alert('no more posts') : setPostIndexStart(postIndexStart + actions.payload); 
          break;
      case ACTION_TYPES.start:
          setPostIndexStart(POST_START);
          break;
      case ACTION_TYPES.end:
          setPostIndexStart(POST_MAX);
          break;
      default:
        return actions.payload;
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
  <button onClick={() => loadPosts(GO_TO_POST_START)}>Start</button>
  <button onClick={() => loadPosts(SKIP_PREVIOUS_POSTS)}>Skip {SKIP_PREVIOUS_POSTS.payload} previous</button>
  <button onClick={() => loadPosts(PREV_POSTS)}>Prev post</button>
  <button onClick={() => loadPosts(NEXT_POSTS)}>Next post</button>
  <button onClick={() => loadPosts(SKIP_NEXT_POSTS)}>Skip {SKIP_NEXT_POSTS.payload} next</button>
  <button onClick={() => loadPosts(GO_TO_POST_END)}>End</button>
</div>
  );
}

export default App;

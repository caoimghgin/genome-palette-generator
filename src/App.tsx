// https://www.fullstacklabs.co/blog/overload-typescript-react-component-interfaces-prop-values


import React from 'react';
import './App.css';
import { SwatchColumn }  from "./SwatchColumn";

function App() {

    return (
        <div className="App">
            <SwatchColumn model={{hex:"#0000FF", semantic: "primary"}}/>
            <SwatchColumn model={{hex:"#cc0000", semantic: "secondary"}}/>
            <SwatchColumn model={{hex:"#118437", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#116EDF", semantic: "info"}}/>
            <SwatchColumn model={{hex:"#FFC107", semantic: "warning"}}/>
            <SwatchColumn model={{hex:"#6E6E6E", semantic: "neutral"}}/>
        </div>
    );
}

export default App;


// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

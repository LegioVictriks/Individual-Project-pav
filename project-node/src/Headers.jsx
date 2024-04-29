import React,{ useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Taskss from './Headers/Tasks.jsx';
import TaskApp from './Headers/Projects.jsx';
import './Css/Headers.css'
import NewComponent from './Headers/Home.jsx';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EmailShortener = ({ email }) => {
  const [isShortened, setIsShortened] = useState(true);

  const toggleEmail = () => {
    setIsShortened(!isShortened);
  };

  const renderEmail = () => {
    if (isShortened) {
      const [username] = email.split('@');
      return `${username.slice(0, 5)}...`;
    } else {
      return email;
    }
  };

  return (
    <span className='emailcol' onClick={toggleEmail}>{renderEmail()}</span>
  );
};

const Headers = () => {
  return (
    <Router>
      <div className="navbar">
        <div className='navlink'> 
        <img src="/assets/icon.png" alt="Icon_png" />
        <NavLink to="/home" activeClassName="active">Home</NavLink>
        <NavLink to="/projects" activeClassName="active">Projects</NavLink>
        <NavLink to="/progress" activeClassName="active">Progress</NavLink>
         </div>
      <div className='flexdiv'>
      <div className='emailcss'> <EmailShortener email="exampler@mail.com" /></div> 
      <div className='loginc'>Logout</div>
      </div>
      </div> 
      <Route path="/home" component={home} />
      <Route path="/projects" component={Projects} />
      <Route path="/progress" component={Tasks} />

    </Router>
  );
};

const home = () => {
  return <NewComponent/> ;
};
const Projects = () => {
  return <TaskApp/> ;
};

const Tasks = () => {
  return <Taskss/>;
};


export default Headers;
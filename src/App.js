import { useEffect, useState } from "react";
import LoginHooks from './components/loginHooks';
import LogoutHooks from './components/logoutHooks';
import SignUp from './pages/signUpForm'
import Home from "./pages/home";
import { BrowserRouter as Router,
         Routes,
         Route, 
         useLocation, 
         useNavigate } from "react-router-dom";
import Footer from './components/footer';
import Header from './components/header';
import { Container } from 'react-bootstrap';
import { CookiesProvider } from 'react-cookie';
import Profile from "./components/profile";


function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <Router>
      <Header signedIn={signedIn} setSignedIn={setSignedIn}/>
        <main>
          <div className="container-fluid">
            <Routes>
              <Route path ='/' exact element={<Home/>} />
              <Route path ='/login' element={<SignUp/>} />
              <Route path ='/profile' element={<Profile/>} />
              <Route path ='/logout' element={<LogoutHooks/>} />
              <Route path ='/orders' element={<Home/>} />
            </Routes>
          </div>
        </main>
      <Footer/>
    </Router>

    
  // <Router>

  //   <div className="App">
        // <div>
        // {signedIn ? (
        //     <LogoutHooks setSignedIn={setSignedIn}/>

        //   ):(
        //       <LoginHooks setSignedIn={setSignedIn}/>

        //     )}
        // </div>

  //         <Routes>
  //          <Route exact path="/users/update" component={SignUp} />
  //         </Routes>
  //   </div>

    
  // </Router>


  );
}

export default App;

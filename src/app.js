import React, {useContext} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
//import { Alert, Container,Fade } from "reactstrap";
import AlertMessage from "components/Alert/AlertMessage.js";
import WeidongIndex from "views/Weidong_Index.js";
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import Sections from "views/Sections.js";
import Presentation from "views/Presentation.js";
import AboutUs from "views/examples/AboutUs.js";
import AddProduct from "views/examples/AddProduct.js";
import BlogPost from "views/examples/BlogPost.js";
import BlogPosts from "views/examples/BlogPosts.js";
import ContactUs from "views/examples/ContactUs.js";
import Discover from "views/examples/Discover.js";
import Ecommerce from "views/examples/Ecommerce.js";
import Error404 from "views/examples/Error404.js";
import Error422 from "views/examples/Error422.js";
import Error500 from "views/errorPage/Error500.js";
import LandingPage from "views/examples/LandingPage.js";
import LoginPage from "views/examples/LoginPage.js";
import ProductPage from "views/examples/ProductPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import SearchWithSidebar from "views/examples/SearchWithSidebar.js";
import Settings from "views/examples/Settings.js";

import TwitterRedesign from "views/examples/TwitterRedesign.js";
// import Bookings from "views/bookings/bookingReq/index.js";
import BookingList from "views/booking/indexList.js";
// weidong booking
import Booking from "views/booking/index.js";
// import Bookings2 from "views/bookings/bookingReq/index2.js";
// import Bookings3 from "views/bookings3/index.js";
import Dashboard from "views/dashboard/index.js";
import Map from "views/Map/MapView.js";
import Schedule from "views/schedule/index.js";
import SRNew from "views/sr/request/index.js";
import SRList from "views/sr/srlist/index.js";
import FullScreenMain from  "views/fullscreen/index.js";
import Confirm from "views/confirm/index.js";
import ConfirmList from "views/confirm/indexList.js";
import Bl from "views/bl/index.js";
import BlList from "views/bl/indexList.js";
import Report from "components/Report/Report.js";
import CompSectionSetting from "views/user/CompIndex.js";
import UserSetting from "views/user/UserSettingIndex.js";
import * as valid from 'components/common/validation.js';
import AlertModal from 'components/Modals/Alert.js';
import Certify from 'components/User/Certify.js';
import PwChange from 'components/User/PwChange.js';
function App(props) {
	
	  const [open,setOpen] =  React.useState(false);
	  const [user,setUser] =  React.useState("");
	  const [isAuth,setIsAuth] =  React.useState(false);
	  const [openAlert, setOpenAlert] = React.useState(false);
	  const [alertSuccess, setAlertSuccess] = React.useState(true);
	  const [status, setStatus] = React.useState("");
	  const [message, setMessage] = React.useState("");	 
	  
	  axios.interceptors.response.use(function (response) {
  		return response;
  	}, function (error) {
  		const originalRequest = error.config;

  	  		if(error.response.status === 403) {	
  	  		    setOpen(false);
  	  			setUser(null);//setIsAuth(false);
  	  			onAlert("error",valid.NOTLOGIN_MSG+" [code:"+error.response.status+"]");
  	  		} else if(error.response.status === 401) {
  	  		    setOpen(false);
  	  			setUser(null);
  	      	    console.log(">>>>>>>>error Code:",error.response.status);
  	  		} else if(error.response.status === 419) {setUser(null); setOpen(true);
  	  		    //axios.post("/auth/logout");
  	  			//onAlert("error",valid.TOKEN_EXPIRED_MSG+" [code:"+error.response.status+"]");
  	  		} else if(error.response.status === 500) {
  	  		    setOpen(false);
  	  			onAlert("error",valid.ERR_MSG+" [code:"+error.response.status+"]");
  	  		} else if(error.response.status === 400) {
  	  		    setOpen(false);
  	  			onAlert("error",valid.ERR_MSG+" [code:"+error.response.status+"]");
  	  		} else {
  	  		    setOpen(false);
  	  			onAlert("error",valid.ERR_MSG+" [code:"+error.response.status+"]");
  	  			console.log("error:",error);
  	  		}

  		return Promise.reject(error);
  		}
  	);
	  
	  const isLogOut = (e)=>{
		  e.preventDefault();
		  axios.post("/auth/logout")
		  .then(res => {
			  setUser(null);
			  onAlert("success","성공적으로 로그아웃 되었습니다.");
		  }).catch(err => {
		      console.log(err); 
		  });  
	  }
	  
	   const onAlert = (status,meassge)=> {
		    setOpenAlert(!openAlert);
			setStatus(status);
			setMessage(meassge);
	   }
	   
	const NoMatch = (arg) => {
		  console.log(arg);
		  return (
		  <h3>Not Found Page</h3>
		  );
		}
	
  return (
		  <>
		 
		  <BrowserRouter>
		    <Switch>
		      <Route path="/index" render={(props) => <Index user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open} {...props} />} />
		      <Route
		        exact path="/"
		        render={(props) => <WeidongIndex user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open} {...props} />}
		      />
		{/*      <Route path="/todoMobx"
		        render={(props) => <TodoMobx trans={trans} {...props}/>}
		        // render={(props) => <TodoMobx trans={trans} store={store} {...props}/>}
		      />
		      <Route path="/todoMobx2"
		        render={(props) => <TodoMobx2 trans={trans} {...props}/>} 
		        // render={(props) => <TodoMobx2 trans={trans} store={store} {...props}/>} 
		      />
		      <Route path="/GlobalTodo"
		        render={(props) => <GlobalTodo store={store} trans={trans} {...props}/>} 
		      />      
		      <Route path="/GlobalTodo2"
		        render={(props) => <GlobalTodo2 store={store} trans={trans} {...props}/>} 
		      />
		*/}      <Route
		        exact path="/weidongIndex"
		        render={(props) => <WeidongIndex user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open} {...props} />}
		      />
		      <Route
		        path="/nucleo-icons"
		        render={(props) => <NucleoIcons {...props} />}
		      />
		      <Route
		        path="/fullscreen"
		        render={(props) => <FullScreenMain {...props} />}
		      />
		      <Route
		        path="/schedule"
		        render={(props) => <Schedule user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open}  {...props} />}
		      />
		      <Route
		        path="/srlist"
		        render={(props) => <SRList user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open}  {...props} />}
		      />
		      <Route
		        path="/srnew"
		        render={(props) => <SRNew user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open}  {...props} />}
		      />
		     <Route
		        path="/vslocation"
		        render={(props) => <Map user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open}  {...props}/>}
		      />

		   
		   <Route
		        path="/dashboard"
		        render={(props) => <Dashboard user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open}  {...props} />}
		      />
		      <Route
		        path="/booking"
		        render={(props) => <Booking user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open}  {...props} />}
		      />
		      {/* <Route
		        path="/booking2"
		        render={(props) => <Bookings2 {...props} />}
		      /> */}
		      {/* <Route
		        path="/booking3"
		        render={(props) => <Bookings3 {...props} />}
		      /> */}
		      <Route
		        path="/bookinglist"
		        render={(props) => <BookingList user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open}  {...props} />}
		      />

		      <Route path="/sections" render={(props) => <Sections {...props} />} />
		      <Route
		        path="/presentation"
		        render={(props) => <Presentation {...props} />}
		      />
		      <Route path="/about-us" render={(props) => <AboutUs {...props} />} />
		      <Route
		        path="/add-product"
		        render={(props) => <AddProduct {...props} />}
		      />
		      <Route path="/blog-post" render={(props) => <BlogPost {...props} />} />
		      <Route path="/blog-posts" render={(props) => <BlogPosts {...props} />} />
		      <Route path="/contact-us" render={(props) => <ContactUs {...props} />} />
		      <Route path="/discover" render={(props) => <Discover {...props} />} />
		      <Route path="/e-commerce" render={(props) => <Ecommerce {...props} />} />
		      <Route path="/error-404" render={(props) => <Error404 {...props} />} />
		      <Route path="/error-422" render={(props) => <Error422 {...props} />} />
		      <Route path="/error-500" render={(props) => <Error500 {...props} />} />
		      <Route
		        path="/landing-page"
		        render={(props) => <LandingPage {...props} />}
		      />
		      <Route path="/login-page" render={(props) => <LoginPage {...props} />} />
		      <Route
		        path="/product-page"
		        render={(props) => <ProductPage {...props} />}
		      />
		      <Route
		        path="/profile-page"
		        render={(props) => <ProfilePage {...props} />}
		      />
		      <Route
		        path="/register-page"
		        render={(props) => <RegisterPage {...props} />}
		      />
		      <Route
		        path="/search-with-sidebar"
		        render={(props) => <SearchWithSidebar {...props} />}
		      />
		      <Route path="/settings" render={(props) => <Settings {...props} />} />
		      <Route
		        path="/twitter-redesign"
		        render={(props) => <TwitterRedesign {...props} />}
		      />
		      <Route
		        path="/confirm"
		        render={(props) => <Confirm user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert}  setLogin={open} {...props} />}
		      />      
		      <Route
		        path="/confirmlist"
		        render={(props) => <ConfirmList user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert}  setLogin={open} {...props} />}
		      />   

		      <Route
		        path="/bl"
		        render={(props) => <Bl user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert}  setLogin={open} {...props} />}
		      />
		      <Route
		        path="/bllist"
		        render={(props) => <BlList user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open}  {...props} />}
		      />
		      <Route path="/reportView"
		        render={(props) => <Report user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open}  {...props} />}
		      />
			  <Route path="/usersetting"
		        render={(props) => <UserSetting user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open}  {...props}/>}
		      />
		      <Route path="/setting"
		        render={(props) => <CompSectionSetting user={user} logOut={(e)=>isLogOut(e)} setUser={(data)=>setUser(data)} validation={valid} onAlert={onAlert} setLogin={open}  {...props}/>}
		      />
			  <Route path="/return_certify" 
			  	render={(props) => <Certify {...props}/>}/>
		  	  <Route path="/password" 
			  	render={(props) => <PwChange {...props}/>}/>
		      <Route path="*" component={NoMatch} />
		      <Redirect from="/" to="/weidongIndex" />
		    </Switch>
		      
		  </BrowserRouter>

        
		{ /* <AlertModal 
	      open={openAlert}
	      close={()=>setOpenAlert(!openAlert)}
	      status ={status}
	      message = {message} />
*/}		  
		
        <AlertMessage 
        message={message}
        isOpen={openAlert}
        isClose={()=>setOpenAlert(!openAlert)}
        // fontColor={font}   //선택사항
        alertColor={status ==="success"?status:"danger"} //선택사항  //primary, secondary, success, danger, warning, info, light, dark
        timeOut={2000} //선택사항
        ></AlertMessage>
		</>
  );
}

export default App;

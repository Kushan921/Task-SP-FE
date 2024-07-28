import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import UserTasks from './components/UserTasks';
import Navigation from './components/navigation';
import DesignerTasks from './components/DesignerTasks';
import PagesTasks from './components/PagesTasks';
import AddContent from './components/addContent';
import DisplayContent from './components/DisplayContent';
import Dashboard from './components/dashboard';
import AddUser from './components/AddUser';
import Designerdashboard from './components/designerDashboard';
import Contentdashboard from './components/contentDashboard';
import MyContents from './components/myContents';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/taskform' exact element={<TaskForm/>}/>
          <Route path="/" exact element={<Login/>}/> 
          <Route path="/usertasks" exact element={<UserTasks/>}/> 
          <Route path="/navigation" exact element={<Navigation/>}/> 
          <Route path="/designertasks" exact element={<DesignerTasks/>}/> 
          <Route path="/pagestasks" exact element={<PagesTasks/>}/> 
          <Route path="/addcontent" exact element={<AddContent/>}/> 
          <Route path="/displaycontent" exact element={<DisplayContent/>}/> 
          <Route path="/dashboard" exact element={<Dashboard/>}/> 
          <Route path="/adduser" exact element={<AddUser/>}/> 
          <Route path="/designerdashboard" exact element={<Designerdashboard/>}/> 
          <Route path="/contentdashboard" exact element={<Contentdashboard/>}/> 
          <Route path="/mycontents" exact element={<MyContents/>}/> 
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

import React, { Component } from 'react'

import {connect} from 'react-redux';
import {addTeam, addSubTeam} from '../actions/PostActions';

class HomePageComponent extends Component {

  constructor(props) {
    super(props);


    this.state = {
      teamListIndex:0,
      teamList:[{name:"Team", id:1}],
      teamName:'',
      activeListIndex:"",
      inputName:"",
      inputDescription:"",
      selectedId:0

    };
  }

  componentDidMount() {
    const self = this;

  }

  handleChange(event, self){
    var targetValue = event.target.value;
    var targetId = event.target.id;
    var index = targetValue;

    switch(targetId){
      case "teamNameId":{
        self.setState({teamName:targetValue});
      }
      break;
      case "teamListId":{
        self.setState({teamListIndex:index});
      }
      break;
      case "inputDescriptionId":{
        self.setState({inputDescription:targetValue}, function(){
          console.log("descriptoin==>"+self.state.inputDescription);
        });
      }
      break;
      case "inputNameId":{
        self.setState({inputName:targetValue}, function(){
          console.log("input name==>"+self.state.inputName);
        });
      }
      break;

    }

  }
  handleClick(event, self, index, id){
    event.preventDefault();
    var targetId = event.target.id;
    switch(targetId){
     
      case "createBtnId":{
        
        const teamName = self.state.teamName;
        var teamObj = self.state.teamList[self.state.teamListIndex];
        var teamSelectedName = (teamObj)?teamObj.name:null;
        
        var teamObj = {
          teamTitle:teamName,
          teamName:teamSelectedName, 
          id:Math.floor(Math.random() * 99999),
        subTeam:[{subTeamName:"", description:"", mode:"create", id:Math.floor(Math.random() * 99999)}]}
          console.log("teamObj==>"+JSON.stringify(teamObj));
        this.props.addTeam(teamObj);
      }
      break;
      case "listId":{
        
        self.setState({activeListIndex:index, selectedId:id}, function(){
          console.log("id"+self.state.selectedId);
        });
      }
      break;

      case "create_detele_item_id":{
         console.log("index===>>>"+index);
         console.log("inpuname==>"+JSON.stringify(teamObj));
        if(index == 0){
          console.log("inpuname==>"+self.state.inputName);
          console.log("inputdescription==."+self.state.inputDescription);
          var subTeamObj = {subTeamName:self.state.inputName, description:self.state.inputDescription, mode:"delete", id:Math.floor(Math.random() * 99999)}
          this.props.addSubTeam(subTeamObj, self.state.selectedId, self.state.activeListIndex)
        }
      }
      break;
    }
  }


  render(){
    const self = this;
    const teamList = self.state.teamList;
    const {posts} = this.props;
    const activeSubTeamList = (posts[self.state.activeListIndex])?posts[self.state.activeListIndex].subTeam:[];
    console.log("posts"+JSON.stringify(posts));
    const teamListElement = teamList.map((item,index)=>{
      return <option value={index} key={item.id}>{item.name}</option>
    });

    const postList = posts.map((post, index )=> {
      const className = self.state.activeListIndex === index ? 'nav-link active' : 'nav-link';  
        return(
          <li className={className} key={post.id} id="listId" value={post} onClick={(e)=>self.handleClick(e, self, index, post.id)}>       
            {post.teamTitle} 
        </li>
        )
      })

    const subTeamListElement = activeSubTeamList.map((subItem, index )=>{
        return(
         (index == 0)?( <div className="card" key={subItem.id}>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Name</label>
                <input className="form-control" placeholder="Enter Name" id="inputNameId" value={self.state.inputName} onChange={(e)=>self.handleChange(e, self)}/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Description</label>
               <textarea rows="5" className="form-control" id="inputDescriptionId" value={self.state.inputDescription} onChange={(e)=>self.handleChange(e, self)}></textarea>
            </div>
           <button className="btn btn-block btn-primary" id="create_detele_item_id" onClick={(e)=>self.handleClick(e, self, index, subItem.id)}>{subItem.mode}</button>
          </div>
        </div>):(
           <div className="card" key={subItem.id}>
           <div className="card-body">
             <div className="form-group">
               <label htmlFor="exampleInputEmail1">Name</label>
                 <input className="form-control" placeholder="Enter Name" value={subItem.subTeamName} />
             </div>
             <div className="form-group">
               <label htmlFor="exampleInputEmail1">Description</label>
                <textarea rows="5" className="form-control" value={subItem.description}></textarea>
             </div>
            <button className="btn btn-block btn-primary" id="create_detele_item_id" onClick={(e)=>self.handleClick(e, self, index)}>{subItem.mode}</button>
           </div>
         </div>
        )  
        )
      })
      return (
        <div>
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap shadow">
          <form className="mt-1 mt-md-0 ml-auto">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group mb-0">
                <label htmlFor="exampleInputEmail1">Select Type</label>
                <select className="form-control" id="teamListId"   onChange={(e) => this.handleChange(e, self)}>
                  {teamListElement}
                </select>         
              </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group mb-0">
                <label htmlFor="exampleInputEmail1">Tame Name</label>
                  <input className="form-control" placeholder="Enter Name" 
                    id="teamNameId"  value={self.state.teamName} onChange={(e) => this.handleChange(e, self)}
                  />
              </div>
              </div>
              <div className="col-sm-2">
                <button type="submit" style={{"marginTop": "28px"}} className="btn btn-primary" id="createBtnId" onClick={(e)=>self.handleClick(e, self)}>Create</button>
              </div>        
            </div>
          </form>
        </nav>
      
      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="sidebar-sticky pt-3">
             <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Teams</span>          
              </h6>
              <ul className="nav flex-column">
                {postList}
              </ul>
            </div>
          </nav>
      
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">  
             <h2>Team 1</h2>     
            </div>
            
            <div className="table-responsive">
            <div className="row">
              <div className="col-sm-4">
                {subTeamListElement}
              </div>
      

      
            </div>
            </div>
          </main>
        </div>
      </div>
     </div>
    );
  }


 
}

const mapStateToProps = (state) => {

  return {
    posts:state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTeam:(teamObj) =>{dispatch( addTeam(teamObj))},
    addSubTeam:(subTeamObj, id, index) =>{dispatch( addSubTeam(subTeamObj, id, index))}
  }
}
 

export default connect(mapStateToProps,mapDispatchToProps)(HomePageComponent);

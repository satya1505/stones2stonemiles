
const initState = {
    posts:[]
}
const rootReducer = (state = initState, action)=>{
    console.log(action.type);
    if(action.type === 'ADD_TEAM'){
        var oldPost = state.posts;
        oldPost.push(action.teamObj);
        return {
            ...state,
           posts:oldPost
       }
    }
    if(action.type === 'ADD_SUB_TEAM'){

        var mainList = state.posts; 
          mainList[action.index].subTeam.push(action.subTeamObj);
        console.log("oldPostObj"+JSON.stringify(mainList)); 

        return {
            ...state,
           posts:mainList
       }

    }

return state;
 
}

export default rootReducer
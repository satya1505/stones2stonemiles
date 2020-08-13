export const addTeam = (teamObj) => {
 
      return {
           type:'ADD_TEAM', teamObj:teamObj
        }
      
 
}

export const addSubTeam = (subTeamObj, id, index) => {
 
    return {
         type:'ADD_SUB_TEAM', subTeamObj:subTeamObj, id:id, index:index
      }
    

}
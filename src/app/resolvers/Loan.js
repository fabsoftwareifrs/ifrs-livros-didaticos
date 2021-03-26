const late= (object)=>{
    if(object.delivered){
        return false
    }else{
        return (object.periods.end<new Date())
    }
    
}
module.exports= {late}
import { useEffect, useState } from "react";
import "./App.css";
import { MdDelete } from "react-icons/md";
const Board = ()=>{
const [value, setValue] = useState();
useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res=> res.json())
    .then(res=>setValue(res))
    .catch(err=> console.log(err))
},[]);
const onDeletePost = (id)=>{
    const restPost =value.filter((post)=>post.id!==id)
    setValue(restPost);
}
const onCreatePost =()=>{
    alert("Created");
}
return(
    <>
    <div >
    
    <table  className="table1" >
    <tr>
                <td></td>
                <td><h2>Create</h2></td>
                </tr>
        <tr>
                <td>Id:</td>
                <td><input></input></td>
                </tr>
            <tr>
            
                <td>title:</td>
                <td><input></input><br/></td>
                </tr>
                <tr>
                <td>Description:</td>
                   <td> <input></input><br/></td>
                   </tr>
                   <tr>
                    <td></td>
                <td><input  type="submit" name="submit" value="Create" onClick={onCreatePost}></input></td>
            
        </tr>
       
            
        
    </table >
        <table className="table2" >
        <tr>
                <td></td>
                <td><h2>Update</h2></td>
                </tr>

            <tr>
                <td>Id:</td>
                <td><input></input></td>
                </tr>
        <tr>
              
                <td>title:</td>
                <td><input></input></td>
                </tr>
                <tr>
                <td>Description:</td>
                   <td> <input></input></td>
                   </tr>
                   <tr>
                    <td></td>
                <td><input type="submit" name="submit" value="Update"></input></td>
            
        </tr>
       
            
        
    </table>
    </div>
    <div className="division">
    {
        value && value.map(post=> ( <><p className="paragraph">{post.title} <i onClick={()=>onDeletePost(post.id)}><MdDelete style={{float:"right"}}/></i></p></>))
    }
    </div>
    </>
) 
}
export default Board;
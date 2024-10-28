import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function HomePage() {
  const [data, setData] = useState([]); // usestate() hook is called and the state "data" and and it setter method setdata
  const [newData, setNewData] = useState({});
  const [index, setIndex] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getData = (id, index) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setNewData(response.data);
        setIndex(index);
        setIsEditMode(true);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewData({ ...newData, [name]: value });
  };

  const handleSubmitOrUpdate = (e) => {
    e.preventDefault();
    if (isEditMode) {
      handleUpdate();
    } else {
      handleSubmit();
    }
  };

  const handleUpdate = () => {
    const id = newData.id;
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, newData)
      .then(res => {
        setData(prevData => {
          const newDataArr = [...prevData];
          newDataArr[index] = newData;
          return newDataArr;
        });
        setIsEditMode(false);
        alert("Post Updated!");
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setData(prevData => prevData.filter((post) => post.id !== id));
        alert("Post Deleted!");
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", newData)
      .then((res) => {
        setData(prevData => [...prevData, res.data]);
        alert("Post Submitted!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="text-center">
        <form onSubmit={handleSubmitOrUpdate} className="table">
          <br />
          <br />
          <input type="text" placeholder="Title" name="title" onChange={handleChange} value={newData.title || ''}/>
          <br/>
          <br/>
          <input type="text" placeholder="Description" name="body" onChange={handleChange} value={newData.body || ''}/>
          <br/>
          <br/>
          <input type="submit" value={isEditMode ? "Update" : "Submit"} className="btn btn-outline-primary" />
          <button type="button" className="btn btn-outline-danger m-2">Cancel</button>
          <br />
        </form>
      </div>
      {data && data.map((value, index) => (
        <div key={index} className="main">
          <div>
           <h6 className="fl">{value.title}</h6>
           <p className="fl">{value.body}</p>
            <div className="fr">
              <i  onClick={() => getData(value.id, index)}><FaEdit/></i>
              <i  onClick={() => { if (window.confirm("Are you Sure To Delete Data?")) { handleDelete(value.id); } }}> <MdDelete/> </i>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default HomePage;
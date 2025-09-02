import { useState } from 'react';
import { useEffect } from 'react';
import { postData, putData } from '../api/axios';

function Form({ data, setData , edit , setEdit }) {
    const [getdata, setGetData] = useState({
        title: "",
        body: ""
    });
    
    const isEmpty = Object.keys(edit).length === 0;

    const UpdatePutData = async () => {                                                                 //updatePutData
        try{
            const res = await putData(edit.id, getdata)
            if(res.status === 200){
                setData((prev) => {
                    console.log(prev)
                    return prev.map((iprev) => 
                        iprev.id === res.data.id ? res.data : iprev
                    )
                })

            }
        } catch(error){
            console.log(error)
        }

    }

    useEffect(() => {                                                                                   //useEffect
        edit && setGetData({
            title : edit.title || "",
            body : edit.body || ""
        })
    },[edit])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setGetData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const addpostdata = async () => {                                                                  //addpostdata
        try {
            const res = await postData(getdata);
            if (res.status === 201) {
                setData([...data, res.data]);
                setGetData({ title: "", body: "" }); // reset form after submit
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {                                                                   //HandleSubmit
        e.preventDefault(); 
        const action = e.nativeEvent.submitter.value
        if(action === "add"){
             addpostdata();
        }else if(action === "edit"){
           UpdatePutData()
        }
        setGetData({title:"",body:""})
        setEdit({})
    };

    return (
      <form 
  onSubmit={handleSubmit} 
  className="max-w-md mx-auto bg-blue-100 rounded-2xl p-6 space-y-4 shadow-md"
>
  <input
    id="title"
    name="title"
    type="text"
    placeholder="Enter title"
    value={getdata.title}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  
  <input
    id="body"
    name="body"
    type="text"
    placeholder="Enter body"
    value={getdata.body}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  
  <button
    type="submit"
    value={isEmpty ? "add" : "edit"}
    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:bg-blue-600 transition duration-300"
  >
    {isEmpty ? "Add" : "Edit"}
  </button>
</form>

    );
}

export default Form;

import { useEffect, useState } from 'react';
import { deleteData, getData } from '../api/axios';
import Form from './postforms';

function Mkr() {
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState({});

    useEffect(() => {
        (async () => {
            const res = await getData();
            setData(res.data);
        })();
    }, []);

    const deletebehavior = async (id) => {
        const res = await deleteData(id);
        if (res.status === 200) setData(prev => prev.filter(curr => id !== curr.id));
    };

    return (
        <>
            <section>
                <Form data={data} setData={setData} edit={edit} setEdit={setEdit} />
            </section>
            <section>
                <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                    {data.map(curr => (
                        <li key={curr.id} className="border rounded-lg p-4 shadow-sm bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                            <div className="text-xs text-gray-500 mb-2">ID: {curr.id}</div>
                            <div className="font-semibold mb-1">title: {curr.title}</div>
                            <div className="text-sm text-gray-700 mb-3">body: {curr.body}</div>
                            <div className="flex space-x-2">
                                <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => setEdit(curr)}>Edit</button>
                                <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => deletebehavior(curr.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>
        </>
    );
}

export default Mkr;

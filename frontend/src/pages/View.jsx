import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function View() {
  const [studentData, setStudentData] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [fee, setFee] = useState('');

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/students/', {
        headers: {
          'Authorization': 'Bearer your_access_token',
          'Content-Type': 'application/json',
        }
      });
      setStudentData(response.data);

    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleEditClick = (rowData) => {
    setShowModal(true)
    setSelectedRowData(rowData);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;

    setSelectedRowData({
      ...selectedRowData,
      [name]: value
    })
};



  const handleCloseModal = () => {
    setSelectedRowData(null);
  };
  

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/deleteStudent/${id}`)
      .then(response => {
        console.log(response.data);

        setStudentData(studentData.filter(student => student.id !== id));
        
      })
      .catch(error => {
        console.error('Error deleting student:', error);
      });
  };


  const handleUpdate = (id) => {
    axios.put(`http://127.0.0.1:8000/api/UpdateStudentView/${id}/`, {
        name: selectedRowData.name,
        address: selectedRowData.address,
        fee: selectedRowData.fee
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response.data);
        setSelectedRowData(response.data);
        handleCloseModal()
        fetchStudents()
    })
    .catch(error => {
        console.error('Error updating student:', error);
    });
};


 
  return (

    <div>
      
          {selectedRowData &&
            (<div className="flex z-10 fixed backdrop-blur-sm items-center shadow-lg justify-center h-screen w-screen top-0 left-0 bg-black bg-opacity-60">
              <div className="w-full md:w-1/2 self-center bg-white">
                <div className="w-auto text-lg text-left uppercase font-semibold p-3 bg-blue-900 text-white"> 
                  <h2>Edit Student Form</h2>
                </div>
                <form>
                  <div className="flex mx-auto">
                    <div className="text-left p-5">
                    <label htmlFor="name">Name</label>
                      <input className=" text-left appearance-none border rounded mb-6 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                          type="text"
                          name="name"
                          required
                          value={selectedRowData.name} onChange={handleChange}
                      />
                      <label htmlFor="address">Address</label>
                        <input className="text-left appearance-none border rounded mb-6 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                          type="text"
                          name="address"
                          required
                          value={selectedRowData.address} onChange={handleChange}
                      />
                      <label htmlFor="fee">Fee</label>
                      <input className="text-left appearance-none border rounded mb-6 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                          type="text"
                          name="fee"
                          required
                          value={selectedRowData.fee} onChange={handleChange}
                      />
                      <div className="flex uppercase text-sm justify-end space-x-2">
                        <button type="button" onClick={() => handleUpdate(selectedRowData.id)} className="bg-blue-700 text-white w-1/4 py-2 uppercase rounded-md">Edit</button>
                        <button type="button" onClick={handleCloseModal} className="bg-blue-700 text-white w-1/4 py-2 uppercase rounded-md">Cancel</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              
            </div>)
          }
      
      
      


      <div className="flex">
        <div className="w-64 bg-gray-900 h-screen">
          <div className="p-4">
            <h2 className="text-white text-lg font-semibold mb-4 text-center">Menu</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md block">Dashboard</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md block">Tickets</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md block">Faculties</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md block">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md block">Incident Report</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md block">Students</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md block">Users</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="text-center w-full container mx-auto p-4">
            <h2 className='text-2xl font-semibold text-white uppercase bg-gray-900 py-2 px-4 rounded-full shadow-md'>Student Data</h2>
          </div>
          <div className="container mx-auto p-4">
            <table className='w-full mt-3'>
              <thead>
                <tr className='bg-blue-900 text-white uppercase text-lg py-2'>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Fee</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map(student => (
                  <tr key={student.id} className='even:bg-gray-200 odd:bg-white text-center'>
                    <td className='py-2'>{student.name}</td>
                    <td className='py-2'>{student.address}</td>
                    <td className='py-2'>{student.fee}</td>
                    <td>
                      <div className="flex justify-center ">
                        <div className="flex space-x-4">
                          <button onClick={() => handleEditClick(student)} className="hover:bg-gray-700 p-1 group rounded cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-fill w-4 h-4 group-hover:text-white text-gray-700" viewBox="0 0 16 16">
                              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                          </button>
                          <button onClick={() => handleDelete(student.id)} className="hover:bg-red-700 p-1 group rounded cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash w-4 h-4 group-hover:text-white text-red-700" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      )
}
import { useState } from "react";


export default function Create() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [fee, setFee] = useState('');
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleFeeChange = (e) => {
        setFee(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendFormData();
    }

    const sendFormData = async () => {
        
            const response = await fetch('http://127.0.0.1:8000/api/students/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    address: address,
                    fee: fee
                })
            }).then(response => { 
                console.log(response.data );  
                
               
              })
              .catch(error => { 
                console.error('Error submitting form', error); 
              }); 
       
    };

    return (
        
        <div className="flex items-center justify-center content-center lg:min-h-screen cr">
            <div className="w-full lg:w-1/2 bg-blue-50 shadow-md rounded-md"> 
                <div className="w-full text-2xl text-left uppercase font-semibold p-3 bg-blue-700 text-white"> 
                    <h2>Students Form</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    
                    <div className="flex mx-auto">
                        
                        <div className="text-left p-5">
                            <label htmlFor="name">Name</label>
                            <input className=" text-left appearance-none border rounded mb-6 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                                type="text"
                                id="name"
                                required
                                value={name} 
                                onChange={handleNameChange}
                            />
                            <label htmlFor="address">Address</label>
                            <input className="text-left appearance-none border rounded mb-6 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                                type="text"
                                id="address"
                                required
                                value={address} 
                                onChange={handleAddressChange}
                            />
                            <label htmlFor="fee">Fee</label>
                            <input className="text-left appearance-none border rounded mb-6 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                                type="text"
                                id="fee"
                                required
                                value={fee} 
                                onChange={handleFeeChange}
                            />
                            <button type="submit" className="bg-blue-700 text-white w-1/3 py-2 text-sm rounded-md mt-6 mb-10">Add</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
        
    );
}

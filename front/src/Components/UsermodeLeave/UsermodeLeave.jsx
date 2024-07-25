import React, { useContext, useEffect, useState, useRef } from 'react';
import './UsermodeLeave.css';
import { AppContext } from '../../Context/AppContext';
import axiosInstance from '../../Config/AxoisConfig';
import { useReactToPrint } from 'react-to-print';
import { PrintBill }  from '../PrintBill/PrintBill';

export const UsermodeLeave = () => {
    const _id = useContext(AppContext);
    const [input, setInput] = useState({
        slotNumber: '',
    });
    const [data, setData] = useState({
        bill: '',
        arrivalAt: '',
        departureAt: '',
        fee: '',
        date: '',
    });
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [error, setError] = useState('');
    const contentToPrint = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => contentToPrint.current,
        removeAfterPrint: true,
    });

    useEffect(() => {
        if (isDataUpdated) {
            handlePrint();
            setIsDataUpdated(false);
        }
    }, [isDataUpdated, data]);

    const checkError = () => {
        const slotId = input.slotNumber.trim();
        if (slotId === '') {
            return 'Field Is Empty';
        } else if (!/^[ABCabc]-\d+$/.test(slotId)) {
            return 'Invalid Slot Number';
        } else {
            return '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = checkError();
        setError(errors);
        if (errors === '') {
            const sendData = async () => {
                try {
                    const postData = {
                        _id: _id,
                        slotNumber: input.slotNumber,
                    };
                    const response = await axiosInstance.post('/vehicle/leave', postData);
                    if (response.data.success) {
                        console.log(response.data)
                        setData({
                            bill: response.data.data.bill,
                            arrivalAt: response.data.data.arrivalAt,
                            departureAt: response.data.data.departureAt,
                            fee: response.data.data.fee,
                            date: response.data.data.date,
                        });
                        setIsDataUpdated(true);
                        setInput({
                            slotNumber: '',
                        });
                        setError('');
                    } else {
                        alert(response.data.message);
                    }
                } catch (error) {
                    console.log(error)
                    alert(error.response?.data?.message || 'Internal Server Error');
                }
            };
            sendData();
        }
    };

    return (
        <div className='usermode-leave'>
            <div className='usermode-leave-container'>
                <form>
                    <div className='usermode-leave-form'>
                        <label>Slot Number</label>
                        <input
                            type='text'
                            name='slotNumber'
                            value={input.slotNumber}
                            placeholder='Enter Slot Number Here'
                            onChange={(e) => {
                                setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
                            }}
                        />
                        {error && <h6>{error}</h6>}
                    </div>
                    <div className='usermode-leave-button'>
                        <input type='submit' value='Submit' className='usermode-leave-button-submit' onClick={handleSubmit} />
                        <input
                            type='button'
                            value='Clear'
                            onClick={() => {
                                setInput({ slotNumber: '' });
                                setError('');
                            }}
                            className='usermode-leave-button-cancel'
                        />
                    </div>
                </form>
                <div style={{ display: 'none' }}>
                    <div ref={contentToPrint}>
                        <PrintBill bill={data.bill} date={data.date} arrivalAt={data.arrivalAt} departureAt={data.departureAt} fee={data.fee} />
                    </div>
                </div>
            </div>
        </div>
    );
};

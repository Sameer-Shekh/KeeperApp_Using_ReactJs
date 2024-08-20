import React, { useState, useEffect } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";

function Card({ title, notes, handleDeleteCard, handleUpdateCard, index }) {
    // const [bgColor, setBgColor] = useState(generateLighterColor());
    //                          OR
    const [bgColor, setBgColor] = useState();
    const [isdone,setDone] = useState(false);


    useEffect(() => {
        setBgColor(generateLighterColor());
    }, []);

    //-----------------------------------------------------------------
    // For lighter color generation
    //-----------------------------------------------------------------
    function generateLighterColor() {
        const threshold = 150;
        let r = Math.floor(Math.random() * (255 - threshold)) + threshold;
        let g = Math.floor(Math.random() * (255 - threshold)) + threshold;
        let b = Math.floor(Math.random() * (255 - threshold)) + threshold;
        return `rgb(${r}, ${g}, ${b})`;
    }
    const handletask = ()=>{
        setDone((prev)=>{
            prev = !prev
            return prev
        })
    }

    return (
        <div className='rounded-lg ' style={{ backgroundColor: bgColor }}>
            <div className='flex flex-col justify-start items-start px-3 py-3 overflow-hidden'>
                <h1 className='text-black text-2xl w-56'>{title}</h1>
                <hr className='w-full border-zinc border-2 my-1 bg-black' />
                {
                    isdone?
                    <p onClick={handletask} className='text-md text-black text-wrap w-56 cursor-pointer line-through'>{notes}</p>
                    :<p onClick={handletask} className='text-md text-black text-wrap w-56 cursor-pointer'>{notes}</p>
                }
            </div>
            <div className='w-full flex justify-end items-center gap-3 px-3 py-6'>
                <RiEdit2Line
                    className='cursor-pointer text-3xl bg-sky-300 rounded-lg text-white'
                    onClick={()=>handleUpdateCard(index)} // Pass index to handleUpdateCard
                />
                <MdDeleteOutline
                    className='cursor-pointer text-3xl rounded-lg bg-red-800 text-white'
                    onClick={() => handleDeleteCard(index)} // Pass index to handleDeleteCard
                />
            </div>
        </div>
    );
}

export default Card;

    //-----------------------------------------------------------------
    //For random color generation
    // function generateRandomColor() {
    //     const letters = '0123456789ABCDEF';
    //     let color = '#';
    //     for (let i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // }

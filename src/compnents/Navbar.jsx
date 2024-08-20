import React, { useEffect, useState } from 'react';
import Card from './Card';

function Navbar() {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [cards, setCards] = useState(JSON.parse(localStorage.getItem('cards')) || [])
  const [isUpdate, setIsUpdate] = useState(false);
  const [index, setIndex] = useState(-1); // Add index state to keep track of the index of the card to be updated
  // const [isdone,setDone] = useState(false);
  // const [done,setDone] = useState(false);

  useEffect(()=>{
    localStorage.setItem('cards',JSON.stringify(cards));
  },[cards])

  // console.log(JSON.parse(localStorage.getItem('cards')))

  // const handletask = ()=>{
  //   setDone((prev)=>{
  //       prev = !prev
  //       return prev
  //   })
  // }
  const givenTitle = (e) => {
    setTitle(e.target.value);
  }

  const givenNotes = (e) => {
    setNotes(e.target.value);
  }

  const handleAddTask = () => {
    if (title.trim() !== '' && notes.trim() !== '') {
      const newCard = { title, notes };

      const newUpdatedCard = [...cards, newCard];

      setCards(newUpdatedCard);
      
      // localStorage.setItem('cards',JSON.stringify(newUpdatedCard));

      // setCards([...cards, newCard]);
      setTitle('');
      setNotes('');
    }
  }

  const handleDeleteCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  }
  
  const handleUpdateCard = (i) => {
    setIsUpdate(true);
    setCards((prevCards)=>{
      setTitle(prevCards[i].title);
      setNotes(prevCards[i].notes);
      setIndex(i);
      return prevCards;
    })    
  }
  
  const handleUpdateButton = ()=>{
    setCards((prevCards)=>{
      if(index !== -1)
      {
        prevCards[index].title = title;
        prevCards[index].notes = notes;
        localStorage.setItem('cards',JSON.stringify(prevCards))
        setTitle('');
        setNotes('');
        setIsUpdate(false);
        setIndex(-1);
      }
      return prevCards;
    })
  }

  return (
    <>
      <div className='bg-gray-500 h-[15vh] flex items-center justify-center text-xl'>
        <div>
          <h1 className='text-[3vh]'>Keeper App To Put Your Work Scheduled</h1>
        </div>
      </div>
      <div className='bg-gray-500 h-[34.8vh] flex justify-center flex-col items-center px-4 py-4 gap-4'>
        <div className='flex flex-col justify-center items-center gap-2 py-2'>
          <input
            value={title}
            onChange={givenTitle}
            className='border-2 border-zinc-400 w-80 px-4 py-2 rounded-lg'
            type='text'
            placeholder='Title'
          />
          <textarea
            value={notes}
            onChange={givenNotes}
            className='h-[80px] w-80 border-2 border-zinc-400 rounded-lg px-2 py-2'
            placeholder='Write Notes'
            name='Notes'
            id=''
            cols='30'
            rows='10'
          ></textarea>
        </div>
        {
          isUpdate ? 
          <button onClick={handleUpdateButton} // Pass the index parameter to handleUpdateCard
          className='border-none bg-red-300 px-4 py-2 rounded-lg'>Update</button>
          :
          <button onClick={() => handleAddTask()}
            className='border-none bg-red-300 px-4 py-2 rounded-lg'>Add Task</button>
        }
      </div>
      
      <div className='w-[100%] flex-wrap flex justify-center items-center px-7 py-4 gap-10 bg-gray-500 h-[100%]'>
        {cards.map((card, index) => (
          <Card 
            key={index}
            // id={index} 
            title={card.title} 
            notes={card.notes} 
            handleDeleteCard={() => handleDeleteCard(index)} 
            handleUpdateCard={()=>handleUpdateCard(index)}
            // isdone = {isdone}
            // handletask = {handletask}
          />
        ))}
      </div>
    </>
  )
}
export default Navbar

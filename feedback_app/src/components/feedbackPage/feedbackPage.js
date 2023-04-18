import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function FeedbackPage() {
    const selected_feedback = useSelector((state) => state.selectedFeedback.selected);
    console.log(selected_feedback);
  return (
    <>
        <div className='bgImg'>
            <div></div>
        </div>
    </>
  )
}

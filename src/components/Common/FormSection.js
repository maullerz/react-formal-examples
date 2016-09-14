import React from 'react';
import './FormSection.css'


export default function FormSection(props) {
  return (
    <div className='form-section'>
      {props.children}
    </div>
  );
}

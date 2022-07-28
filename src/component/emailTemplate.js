import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const SendEmailConfirm = (props) => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ndh1blz', 'template_eqc7oek', form.current, 'iAc53kqdsop6WlrsW')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>User Name</label>
      <input  type="text" name="name"  value={props.data.user_name}/>
      <br />
      <label>Email</label>
      <input  type="email" name="toEmail" value={props.data.email}/>
      <br />
      <label>Bus Name</label>
      <input  type="text" name="bus_name" value={props.data.bus_name}/>
      <br />
      <label> Seat No </label>
      <input type="text" name="seetNo" value={props.data.seetNo}/>
      <br />
      <label> Amount to pay </label>
      <input type="text" name="fare" value={props.data.fare}/>
      <br />
      <input type="submit" value="Send" />
    </form>
  );
};

export default SendEmailConfirm
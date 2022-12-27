import {useState, useEffect} from 'react';
import classes from './contact-form.module.css';
import {ToastContainer, toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
}

const ContactForm = () => {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [block, setBlock] = useState(false);

  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'eror'
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    setRequestStatus('pending');
    try {
      await sendContactData(inputValue);
      setRequestStatus('success');
      setInputValue({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  };

  let notification;
  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  }
  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!',
    };
  }
  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              name=''
              id='email'
              required
              value={inputValue.email}
              onChange={(e) =>
                setInputValue({...inputValue, email: e.target.value})
              }
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              name=''
              id='name'
              required
              value={inputValue.name}
              onChange={(e) =>
                setInputValue({...inputValue, name: e.target.value})
              }
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            name='message'
            id='message'
            rows='5'
            required
            value={inputValue.message}
            onChange={(e) =>
              setInputValue({...inputValue, message: e.target.value})
            }
          />
        </div>
        <div className={classes.actions}>
          <button disabled={block}>Send Message</button>
        </div>
      </form>
      {/* <ToastContainer
        position='top-right'
        pauseOnFocusLoss={false}
        theme='dark'
      /> */}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};
export default ContactForm;

// input user UI feedback with React-toastify
//
// const sendMessageHandler = (e) => {
//   e.preventDefault();
//   setBlock(true);
//   const resolveWithSomeData = fetch('/api/contact', {
//     method: 'POST',
//     body: JSON.stringify({...inputValue}),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }).then((res) => {
//     setBlock(false);
//     return res.json();
//   });

//   toast.promise(resolveWithSomeData, {
//     pending: 'Loading...',
//     success: {
//       render({data}) {
//         return data.result;
//       },
//       // other options
//       icon: '🟢',
//     },
//     error: {
//       render({data}) {
//         // When the promise reject, data will contains the error
//         return data.message;
//       },
//     },
//   });
// };

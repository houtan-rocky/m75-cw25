
import React, { useState } from 'react';
import { Form, Button, Container, Image } from 'react-bootstrap';
import Webcam from "react-webcam";


const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

export const WebcamCapture = () => {

    const [image, setImage] = useState('');
    const webcamRef = React.useRef(null);


    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        });


    return (
        <div className="webcam-container">
            <div className="webcam-img">

                {image == '' ? <Webcam
                    audio={false}
                    height={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                /> : <img src={image} />}
            </div>
            <div>
                {image != '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Capture</button>
                }
            </div>
        </div>
    );
};
const Profile = () => {
    return (
        // <WebcamCapture/>
        <Container
            className='bg-light'>
            <Image rounded src='' />
            <Form className='w-100'>
                <Form.Group className="mb-3 d-flex justify-content-between w-100" >
                    <div className='w-50'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" className='w-50' />
                    </div>
                    <div className='w-50'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" className='w-50 me-0' />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3 d-flex justify-content-between w-100" >
                    <div className='w-50'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" className='w-50' />
                    </div>
                    <div className='w-50'>
                        <Form.Label>National Code</Form.Label>
                        <Form.Control type="text" className='w-50' />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3 d-flex justify-content-between w-100" >
                    <div className='w-50'>
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control type="text" className='w-50' />
                    </div>
                    <div className='w-50'>
                        <Form.Label>Skills</Form.Label>
                        <Form.Control type="text" className='w-50' />
                    </div>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Profile
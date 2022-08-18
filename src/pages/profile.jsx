
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Image, Modal } from 'react-bootstrap';
import Webcam from "react-webcam";





function MyVerticallyCenteredModal({ show,
    onHide,
    image,
    setImage, updatePhoto }) {
    const [webCamModalShow, setWebCamModalShow] = useState(false);
    const inputRef = useRef(null);
    console.log(image);
    const handleClick = () => {
        inputRef.current.click();
    };
    const handleFileChange = event => {
        if (!event.target.files[0]) {
            return;
        }
        setImage(URL.createObjectURL(event.target.files[0]))
    };
    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="sm"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title >
                        Avatar
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Select an image from your device or take a photo
                    </p>
                    <div className='d-flex flex-column align-items-center'>
                        <Button onClick={handleClick} variant={'primary'} className='w-50 mt-2'>Upload Photo <input style={{ display: 'none' }}
                            ref={inputRef}
                            type="file"
                            onChange={handleFileChange} /></Button>
                        <Button onClick={() => setWebCamModalShow(true)} variant={'primary'} className='w-50 mt-2'>Take a Photo</Button>
                        <Button onClick={onHide} variant={'danger'} className='w-50 mt-2'>Delete Photo</Button>
                    </div>
                </Modal.Body>
            </Modal>

            <WebCamModal
                show={webCamModalShow}
                setImage={setImage}
                image={image}
                onHide={() => setWebCamModalShow(false)}
                updatePhoto={updatePhoto}
            />
        </>
    );
}

function WebCamModal({ show, setImage, image, onHide, updatePhoto }) {
    return (

        <Modal
            show={show}
            size="lg"
            centered
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title >
                    Take a Photo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column'>
                <WebcamCapture setImage={setImage} image={image} />
                <Button className='mt-2' variant='success' disabled={image == ''} onClick={() => { onHide(); updatePhoto(); }}>Submit</Button>
            </Modal.Body>
        </Modal>
    );
}

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
};

export const WebcamCapture = ({ image, setImage }) => {
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        });
    return (
        <div className="d-flex justify-content-center flex-column align-items-center">
            <div>

                {image == '' ? <Webcam
                    audio={false}
                    height={500}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={500}
                    videoConstraints={videoConstraints}
                /> : <img src={image} alt='' />}
            </div>
            <div>
                {image != '' ?
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                    >
                        Retake Image</Button> :
                    <Button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                    >Capture</Button>
                }
            </div>
        </div>
    );
};
const Profile = () => {
    const [data, setData] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [image, setImage] = useState();
    const getData = () => {
        axios.get('https://618ace5834b4f400177c48c0.mockapi.io/users')
            .then((response) => {
                setData(response.data[0]);
            }).catch((e) => {
                console.log(e);
            })
    }
    const updatePhoto = () => {
        axios.put('https://618ace5834b4f400177c48c0.mockapi.io/users/1', {
            avatar: image
        });
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <Container
                className='bg-light'>
                <Image roundedCircle src={image ? image : data.avatar} onClick={() => { setModalShow(true) }} />
                <Form className='w-100'>
                    <Form.Group className="mb-3 d-flex justify-content-between w-100" >
                        <div className='w-50'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" className='w-50' defaultValue={data.name} />
                        </div>
                        <div className='w-50'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" className='w-50 me-0' defaultValue={data.lastName} />
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
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                image={image}
                setImage={setImage}
                updatePhoto={updatePhoto}
            />
        </>
    )
}

export default Profile
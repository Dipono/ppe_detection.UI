import '../styles/Home.css';
import Header from "../components/Header";
import Popup from '../components/Popup';
import image1 from '../assets/download (1).jpg';
import image2 from '../assets/download.jpg';
import image3 from '../assets/images.jpg';
import image4 from '../assets/images (1).jpg';
import image5 from '../assets/images (2).jpg';
import image6 from '../assets/images (3).jpg';
import image7 from '../assets/images (4).jpg';
import gloves from '../assets/download (2).jpg';
import musk from '../assets/download (3).jpg';
import glass from '../assets/eye-protection-safety-glasses-ppe-260nw-1593994171.webp';
import vest from '../assets/vest.jpg';
import halmet from '../assets/halmet.jpg';


import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import soundAlert from '../assets/alarm/ireland-eas-alarm-264351.mp3';
import { storage, db, analytics } from '../config/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

function Home() {
    const audioPlayer = useRef(null);
    const images = [
        image1, image2, image3, image4, image5, image6, image7
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    let [PreviewImage, setPreviewImage] = useState('');
    const CollectionRef = collection(db, 'ppe_detection');

    const PPE_Cases = [{ id: 'mask', value: 'Face Mask' }, { id: 'glove', value: 'Gloves' }, { id: 'vest', value: 'Jacket' }, { id: 'halmet', value: 'Protective Helmet' }, /*{ id: 'eye_glass', value: 'Eye Glass' }*/]
    let [Detect_Results, setDetect_Results] = useState({
        halmet: false,
        eye_glass: false,
        vest: false,
        mask: false,
        glove: false,
        date: '',
        image: ''
    })
    const [AlertDetected, setAlertDetected] = useState(false)
    const [AllCases, setAllCases] = useState([]);
    const [CurrentCases, setCurrentCases] = useState([]);
    const [TotalMask, setTotalMask] = useState(0);
    const [TotalVest, setTotalVest] = useState(0);
    const [TotalGloves, setTotalGloves] = useState(0);
    const [TotalHelmet, setTotalHelmet] = useState(0);
    const [TotalGlass, setTotalGlass] = useState(0);


    useEffect(() => {
        const getAllResults = async () => {
            const data = await getDocs(CollectionRef);
            var today = new Date();
            var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            var results = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(value => { return value.date.includes(date) });

            var vest = 0;
            var mask = 0;
            var eye_glass = 0;
            var glove = 0;
            var halmet = 0;
            for (var k = 0; k < results.length; k++) {
                if (results[k].vest === false) { vest++ }
                if (results[k].eye_glass === false) { eye_glass++ }
                if (results[k].glove === false) { glove++ }
                if (results[k].mask === false) { mask++ }
                if (results[k].halmet === false) { halmet++ }
            }
            setTotalGlass(eye_glass);
            setTotalMask(mask);
            setTotalVest(vest);
            setTotalGloves(glove);
            setTotalHelmet(halmet);
            setCurrentCases(results.filter(value => { return value.date.includes(date) }))
            console.log('vest', vest);
            console.log('eye_glass', eye_glass);
            console.log('halmet', halmet);
            console.log('glove', glove);
            console.log('mask', mask);
            // setAllCases(results.filter(value =>{return value.date.includes(date) }))
        }

        getAllResults();
    })

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + images.length) % images.length
        );
    };

    const handleFiles = (e) => {
        const file = e.target.files[0];
        var fileType = file.name.substr(file.name.lastIndexOf("."));
        // if (fileType.toLowerCase() !== '.png' && fileType.toLowerCase() !== '.jpeg' && fileType.toLowerCase() !== '.jpg' && fileType.toLowerCase() !== 'jfif' && fileType.toLowerCase() !== 'webp') return alert('jpg, jpeg or png files only');

        var formData = new FormData();
        formData.append("file", file)
        setDetect_Results({ date: '', eye_glass: false, glove: false, halmet: false, image: '', mask: false, vest: false })
        setAlertDetected(false)
        axios.post('http://127.0.0.1:5000/predict', formData).then(respond => {
            setPreviewImage(URL.createObjectURL(file))
            console.log(respond.data.predicted_class_names);

            // loop through detected items
            // if item it has been found make it true
            for (var k = 0; k < respond.data.predicted_class_names.length; k++) {
                if (respond.data.predicted_class_names[k] === 'Protective Helmet') { Detect_Results.halmet = true }
                if (respond.data.predicted_class_names[k] === 'Dust Mask') { Detect_Results.mask = true }
                if (respond.data.predicted_class_names[k] === 'Jacket') { Detect_Results.vest = true }
                if (respond.data.predicted_class_names[k] === 'Eye Wear') { Detect_Results.eye_glass = true }
                if (respond.data.predicted_class_names[k] === 'Glove') { Detect_Results.glove = true }
            }

            // if item found then we were able to detect
            if (respond.data.predicted_class_names.length > 0) {
                // Play audio since it has been found
                audioPlayer.current.play();
                //set the alert to be true so that the red border can be displlay
                setAlertDetected(true)

                //get the current date 
                Detect_Results.date = new Date().toLocaleString()

                // store image in the storage 
                const storageRef = ref(storage, `/assets/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on("state_changed", (snapshot) => {
                },
                    (err) => console.log(err),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then(url => {
                                // we downloaded the image url so that it can be save to database
                                Detect_Results.image = url

                                //store infomation into database
                                addDoc(CollectionRef, Detect_Results).then(response => {
                                    console.log(response);

                                }, err => {
                                    console.log(err);
                                })
                            })
                    }
                );

            }
            else {
                // if item no detected stop or do not play the audio
                audioPlayer.current.pause();
                audioPlayer.current.currentTime = 0
            }
        }, err => {
            console.log(err);
        })
    }

    function stop() {
        // stop  play the audio
        audioPlayer.current.pause();
        audioPlayer.current.currentTime = 0
    }

    return (<div>
        <Header />
        <audio ref={audioPlayer} src={soundAlert} loop />
        <input type='file' hidden id='file_image' onChange={handleFiles} />
        <label for="file_image" id="button_upload" >Upload Image</label>
        <div className="content">
            <div id="footage">
                {PreviewImage !== '' ?
                    <>{AlertDetected ?
                        <div id='alert'>
                            <img src={PreviewImage} alt='preview image' style={{ width: '100%', height: '75vh', border: 'bold red 2px' }} />
                        </div>
                        : <img src={PreviewImage} alt='preview image' style={{ width: '100%', height: '75vh', border: 'bold red 2px' }} />}

                    </>


                    :
                    <label style={{ width: '100%', height: '75vh', backgroundColor: 'grey' }}></label>
                }
            </div>
            <div id="cases">
                <h3>Today’s Cases</h3>
                <div className='allcases'>
                    {/* loop here */}
                    {PPE_Cases.map((ppe, xid) => (
                        <div key={xid} className='case'>
                            <h4>{ppe.value}</h4>
                            {ppe.id === 'vest' && <>
                                <p>{TotalVest}</p>
                                <img src={vest} alt='missing item' height='50px' width='50px' style={{ marginTop: '5px' }} />
                            </>}
                            {ppe.id === 'glove' && <>
                                <p>{TotalGloves}</p> <img src={gloves} alt='missing item' height='50px' width='50px' style={{ marginTop: '5px' }} /> </>}
                            {ppe.id === 'mask' && <>
                                <p>{TotalMask}</p><img src={musk} alt='missing item' height='50px' width='50px' style={{ marginTop: '5px' }} /> </>}
                            {ppe.id === 'halmet' && <>
                                <p>{TotalHelmet}</p><img src={halmet} alt='missing item' height='50px' width='50px' style={{ marginTop: '5px' }} /> </>}
                            {/* {ppe.id === 'eye_glass' && <>
                                <p>{TotalGlass}</p><img src={glass} alt='missing item' height='50px' width='50px' style={{ marginTop: '5px' }} /> </>} */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        {AlertDetected && <button style={{ width: '100%', backgroundColor: 'rgba(119, 173, 255, 1)', height: '30px' }} onClick={stop}>Stop</button>}

    </div>)
}
export default Home;
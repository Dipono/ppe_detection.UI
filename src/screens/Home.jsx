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

import { useState } from 'react';
import axios from 'axios';

function Home() {

    const images = [
        image1, image2, image3, image4, image5, image6, image7
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [ViewPopup, setViewPopup] = useState(false);
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + images.length) % images.length
        );
    };

    const handleFiles = (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        var fileType = file.name.substr(file.name.lastIndexOf("."));
        if (fileType.toLowerCase() !== '.png' && fileType.toLowerCase() !== '.jpeg' && fileType.toLowerCase() !== '.jpg' && fileType.toLowerCase() !== 'jfif' && fileType.toLowerCase() !== 'webp') return alert('jpg, jpeg or png files only');

        var formData = new FormData();
        formData.append("file", file)

        axios.post('http://127.0.0.1:5000/predict', formData).then(respond=>{
            console.log(respond.data.predicted_class_names);
        }, err=>{
            console.log(err);
        })
    }

    let caseTable = <div>
        <table>
            <thead>
                <th>No</th>
                <th>Item Name</th>
                <th>Time</th>
                <th>Item Image</th>
                <th>Actual Image Taken</th>
            </thead>
            <tr>
                <td>1</td>
                <td>Eye glass</td>
                <td>10:45</td>
                <td><img src={glass} alt='Item Image' height='100px' width='100px' /></td>
                <td><img src={image1} alt='captured Image' height='100px' width='100px' /></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Face musk</td>
                <td>10:45</td>
                <td><img src={musk} alt='Item Image' height='100px' width='100px' /></td>
                <td><img src={image1} alt='captured Image' height='100px' width='100px' /></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Gloves</td>
                <td>10:45</td>
                <td><img src={gloves} alt='Item Image' height='100px' width='100px' /></td>
                <td><img src={image1} alt='captured Image' height='100px' width='100px' /></td>
            </tr>
        </table>
    </div>
    return (<div>
        <Header />
        <input type='file' onChange={ handleFiles} />
        <div className="content">
            <div id="footage">
                <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} style={{ width: '100%', height: '75vh' }} />
                <div>
                    <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
                    <button onClick={handleNext} disabled={currentIndex === images.length - 1}>Next</button>
                </div>
            </div>
            <div id="cases">
                <h3>Today’s Cases</h3>
                <div className='allcases'>
                    {/* loop hear */}
                    <div className='case'>
                        <h4>Gloves</h4>
                        <img src={gloves} alt='missing item' height='50px' width='50px' style={{ marginTop: '5px' }} />
                    </div>
                    <div className='case'>
                        <h4>Face Musk</h4>
                        <img src={musk} alt='missing item' height='50px' width='50px' style={{ marginTop: '5px' }} />
                    </div>
                    <div className='case'>
                        <h4>Eye Glass</h4>
                        <img src={glass} alt='missing item' height='50px' width='50px' style={{ marginTop: '5px' }} />
                    </div>

                </div>

                <button className='view-btn' onClick={() => setViewPopup(true)}>View record</button>
                <Popup trigger={ViewPopup} setTrigger={setViewPopup}>
                    {caseTable}
                </Popup>
            </div>
        </div>
    </div>)
}
export default Home;
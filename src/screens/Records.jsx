import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

import image1 from '../assets/download (1).jpg';
import image2 from '../assets/download.jpg';
import image3 from '../assets/images.jpg';
import image4 from '../assets/images (1).jpg';
import image5 from '../assets/images (2).jpg';
import image6 from '../assets/images (3).jpg';
import image7 from '../assets/images (4).jpg';
import image8 from '../assets/images (7).jpg';
import image9 from '../assets/images (5).jpg';



function Records() {
    const navigate = useNavigate();
    return (<div>
        <Header />
        <div>
            <div id="record-header">
                <button className="back-btn" onClick={()=>navigate('/')}>Back</button>
                <div>
                    <input type="date" style={{marginRight:'15px'}} />
                    <select className="select-dropdown" style={{margin:'0 15px'}}>
                        <option disabled selected value="">Select PPE</option>
                        <option value="Face must" >Face must</option>
                        <option value="Halmet hat">Halmet hat</option>
                        <option value="Eye glass">Eye glass</option>
                        <option value="Vest">Vest</option>
                    </select>
                    <button className="search">Seach</button>
                </div>
            </div>
            <table>
                <thead>
                    <th>No</th>
                    <th>Face Musk</th>
                    <th>Glass</th>
                    <th>Vest</th>
                    <th>Hard hat</th>
                    <th>Glove</th>
                    <th>Date and Time</th>
                    <th>Actual Image Taken</th>
                </thead>
                <tr>
                    <td>1</td>
                    <td>Yes</td>
                    <td>No</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>No</td>
                    <td>12/06/2024 10:45</td>
                    <td><img src={image1} alt='captured Image'height='100px' width='100px' /> <label style={{color:'blue', textAlign:'left'}}>View</label></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>No</td>
                    <td>No</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>13/06/2024 12:05</td>
                    <td><img src={image8} alt='captured Image'height='100px' width='100px' /> <label style={{color:'blue', textAlign:'left'}}>View</label></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>No</td>
                    <td>No</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>No</td>
                    <td>13/07/2024 09:15</td>
                    <td><img src={image9} alt='captured Image'height='100px' width='100px' /> <label style={{color:'blue', textAlign:'left'}}>View</label></td>
                </tr>
            </table>
            
        </div>
    </div>)
}

export default Records;
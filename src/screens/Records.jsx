import { useNavigate } from "react-router-dom";
import Header from "../components/Header";


import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";

function Records() {
    const navigate = useNavigate();

    const [AllCases, setAllCases] = useState([]);
    const [Cases, setCases] = useState([]);
    const CollectionRef = collection(db, 'ppe_detection');
    useEffect(() => {
        const getAllResults = async () => {
            const data = await getDocs(CollectionRef);
            var results = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            var today = new Date();
            var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

            console.log(results.filter(value =>{return value.date.includes('6:21:14 PM') }));


            setCases(results.sort((a, b) => b.date.localeCompare(a.date)))
            setAllCases(results.sort((a, b) => b.date.localeCompare(a.date)))
        }

        getAllResults();
    }, [])

    function filter(event){
        var setdate = new Date(event);
        var getAll= Cases;
        var date = (setdate.getMonth() + 1) + '/' + setdate.getDate() + '/' + setdate.getFullYear();
        console.log(date);
        
        setAllCases(getAll.filter(value =>{return value.date.includes(date) }))
    }
    return (<div>
        <Header />
        <div>
            <div id="record-header">
                <button className="back-btn" onClick={() => navigate('/')}>Back</button>
                <div>
                    <input type="date" style={{ marginRight: '15px' }} onChange={(event)=>filter(event.target.value)} />
                    {/* <button className="search" onClick={filter}>Seach</button> */}
                </div>
            </div>
            <table>
                <thead>
                    <th>No</th>
                    <th>Face Musk</th>
                    {/* <th>Glass</th> */}
                    <th>Vest</th>
                    <th>Hard hat</th>
                    <th>Glove</th>
                    <th>Date and Time</th>
                    <th>Actual Image Taken</th>
                </thead>
                {AllCases.map((cases, xid)=>(
                <tr key={xid}>
                    <td>{xid+1}</td>
                    <td>{cases.mask ? <>Yes</>:<>No</>}</td>
                    {/* <td>{cases.eye_glass ? <>Yes</>:<>No</>}</td> */}
                    <td>{cases.vest ? <>Yes</>:<>No</>}</td>
                    <td>{cases.halmet ? <>Yes</>:<>No</>}</td>
                    <td>{cases.glove ? <>Yes</>:<>No</>}</td>
                    <td>{cases.date}</td>
                    <td><img src={cases.image} alt='captured Image' height='100px' width='100px' /> <a href={cases.image} target="_blank"><label style={{ color: 'blue', textAlign: 'left' }}>View</label></a></td>
                </tr> 
                ))}
            </table>

        </div>
    </div>)
}

export default Records;
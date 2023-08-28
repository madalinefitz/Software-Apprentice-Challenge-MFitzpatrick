import {useState, useEffect} from 'react'
import Card from "./Card.js"

export default function Main(){
    const [facebookAds, setFacebookAds] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/fakeDataSet')
            .then(r => {
                if(r.ok) {
                    r.json().then(data=>{
                        setFacebookAds(data)
                    })
                } else {
                    console.log(r.status)
                }
            })
    },[])

    return (
        <div>
            <h1>Main</h1>
            <Card/>
        </div>
    )
}
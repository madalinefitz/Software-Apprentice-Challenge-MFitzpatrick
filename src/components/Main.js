import {useState, useEffect} from 'react'
import Card from "./Card.js"

export default function Main(){
    const [allAds, setAllAds] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/fakeDataSet')
            .then(r => {
                if(r.ok) {
                    r.json().then(data=>{
                        setAllAds([...data.facebook_ads, ...data.twitter_ads, ...data.snapchat_ads, ...data.google_analytics])
                    })
                } else {
                    console.log(r.status)
                }
            })
    },[])

    const cardComponents = allAds.map((ad)=>{
        return(
            <Card key={ad.id} {...ad}/>
        )
    })
    

    return (
        <div>
            <h1>Main</h1>
            {cardComponents}
        </div>
    )
}
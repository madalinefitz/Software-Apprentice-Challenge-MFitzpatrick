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
        const campaign = ad.campaign_name ?? ad.campaign ?? ad.utm_campaign
        const adset = ad.media_buy_name ?? ad.ad_group ?? ad.ad_squad_name ?? ad.utm_medium 
        const creative = ad.ad_name ?? ad.image_name ?? ad.creative_name ?? ad.utm_content
        const spend = ad.spend ?? ad.cost
        const clicks = ad.clicks ?? ad.post_clicks

        return(
            <Card campaign={campaign} adset={adset} creative={creative} spend={spend} clicks={clicks} impressions={ad.impressions}/>
        )
    })
    

    return (
        <div>
            <h1>Main</h1>
            {cardComponents}
        </div>
    )
}
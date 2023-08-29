import {useState, useEffect} from 'react'
import Card from "./Card.js"

export default function Main(){
    const [allAds, setAllAds] = useState([])
    const [searchedCampaign, setSearchedCampaign] = useState('')
    const [sortBy, setSortBy] = useState('')

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

    //search by campaign name
    const handleSearch = e => setSearchedCampaign(e.target.value)
    const searchByCampaign = allAds.filter(ad => {
        const campaign = ad.campaign_name ?? ad.campaign ?? ad.utm_campaign

        return(campaign.toLowerCase().includes(searchedCampaign.toLowerCase()))
    })

    console.log(searchByCampaign)
    
    //sort cards by Spend
    const handleSort = e => setSortBy(e.target.value)
    const sortedBySpend = searchByCampaign.sort((adA, adB) => {
        const spendA = adA.spend ?? adA.cost
        const spendB = adB.spend ?? adB.cost
        
        if (sortBy === 'asc'){
            return spendA - spendB
        } else if (sortBy === 'desc'){
            return spendB - spendA
        } else {
            return searchByCampaign
        }
    })

    //pass props to Card component
    const cardComponents = sortedBySpend.map((ad)=>{
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
            <h1 class="text-5xl text-center pt-16">Ad Cards</h1>
            <div class="pt-2 flex justify-end mx-auto text-gray-600 pr-16 p-5">
                <input onChange={handleSearch} class="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none" type="search" placeholder="Search Campaign"/>
            </div>
            <select onChange={handleSort} value={sortBy}>
                <option value='none'></option>
                <option value='asc'>ascending</option>
                <option value='desc'>descending</option>
            </select>
            <div class="grid grid-flow-row-dense grid-cols-3 justify-items-center">
                {cardComponents}
            </div>
        </div>
    )
}
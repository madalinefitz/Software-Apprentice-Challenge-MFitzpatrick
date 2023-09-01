import {useState, useEffect} from 'react'
import Card from "./Card.js"

export default function Main(){
    const [allAds, setAllAds] = useState([])
    const [googleAnalytics, setGoogleAnalytics] = useState([])
    const [searchedCampaign, setSearchedCampaign] = useState('')
    const [sortBy, setSortBy] = useState('')

    useEffect(()=>{
        fetch('http://localhost:3000/fakeDataSet')
            .then(r => {
                if(r.ok) {
                    r.json().then(data=>{
                        setAllAds([...data.facebook_ads, ...data.twitter_ads, ...data.snapchat_ads])
                        setGoogleAnalytics([...data.google_analytics])
                    })
                } else {
                    console.log(r.status)
                }
            })
    },[])

    //search cards by Campaign
    const handleSearch = e => setSearchedCampaign(e.target.value)
    const searchByCampaign = allAds.filter(ad => {
        const campaign = ad.campaign_name ?? ad.campaign ?? ad.utm_campaign

        return(campaign.toLowerCase().includes(searchedCampaign.toLowerCase()))
    })

    
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
    const cardComponents = sortedBySpend.map(ad => {
        const campaign = ad.campaign_name ?? ad.campaign
        const adset = ad.media_buy_name ?? ad.ad_group ?? ad.ad_squad_name 
        const creative = ad.ad_name ?? ad.image_name ?? ad.creative_name 
        const spend = ad.spend ?? ad.cost
        const clicks = ad.clicks ?? ad.post_clicks

        //allocate analytic results to each ad if available
        let results = 0
        googleAnalytics.forEach(analytic => {
            if (campaign === analytic.utm_campaign && adset === analytic.utm_medium && creative === analytic.utm_content) {
                results = results + analytic.results
            }
        })

        return(
            <Card campaign={campaign} adset={adset} creative={creative} spend={spend} clicks={clicks} impressions={ad.impressions} results={results}/>
        )
    })
    

    return (
        <div class="p-10">
            <div class="relative inline-block text-left absolute pl-10">
                <div class="text-md">Sort By Spend:</div>
                <select class="mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2" onChange={handleSort} value={sortBy}>
                    <option class="text-gray-700 block px-4 py-2 text-sm" value='none'></option>
                    <option class="text-gray-700 block px-4 py-2 text-sm" value='asc'>ascending</option>
                    <option class="text-gray-700 block px-4 py-2 text-sm" value='desc'>descending</option>
                </select>
            </div>
            <div class="flex justify-center">
                <img src="https://blueprint.tech/wp-content/uploads/2023/02/Blueprint-Advertising-Machine-Logo.png" alt="blueprint logo"/>
            </div>
            <h1 class="text-4xl text-center pt-5">Ad Cards</h1>
            <div class="pt-2 flex justify-end mx-auto text-gray pr-16 p-5">
                <input onChange={handleSearch} class="bg-white shadow-lg ring-1 ring-black ring-opacity-5 h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none" type="search" placeholder="Search Campaign"/>
            </div>
            <div class="flex flex-row flex-wrap justify-center">
                {cardComponents}
            </div>
        </div>
    )
}
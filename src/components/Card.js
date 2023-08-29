
export default function Card({campaign, adset, creative, spend, clicks, impressions}) {
    return(
        <div>
            <h1>Campaign: {campaign}</h1>
            <p>Adset: {adset}</p>
            <p>Creative: {creative}</p>
            <p>Spend: {spend}</p>
            <p>Impressions: {impressions}</p>
            <p>Clicks: {clicks}</p>
            <p>Results:</p>
        </div>
    )
}
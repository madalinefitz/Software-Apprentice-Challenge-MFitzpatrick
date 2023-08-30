
export default function Card({campaign, adset, creative, spend, clicks, impressions, results}) {
    
    return(
            <div class="max-w-md p-5 shadow-lg ring-1 ring-black ring-opacity-5 m-5">
                <div class="flex lg:basis-1/3 bg-white p-6 flex flex-col justify-between">
                    <div class="mb-8">
                        <div class="text-gray font-bold text-xl mb-2">Campaign: {campaign}</div>
                        <p class="text-gray">Adset: {adset}</p>
                        <p class="text-gray">Creative: {creative}</p>
                    </div>
                    <div class="flex items-center">
                        <div class="text-sm">
                            <p class="text-gray leading-none">Spend: {spend}</p>
                            <p class="text-gray">Impressions: {impressions}</p>
                            <p class="text-gray">Clicks: {clicks}</p>
                            <p class="text-gray">Results: {results}</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}
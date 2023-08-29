
export default function Card({campaign, adset, creative, spend, clicks, impressions}) {
    return(
        <div>
            <div class="max-w-sm w-full lg:max-w-full lg:flex p-5 grow-0 shadow-lg ring-1 ring-black ring-opacity-5 m-5">
                <div class="bg-white p-6 flex flex-col justify-between leading-normal">
                    <div class="mb-8">
                        <div class="text-gray-900 font-bold text-xl mb-2">Campaign: {campaign}</div>
                        <p class="text-gray-700 text-base">Adset: {adset}</p>
                        <p class="text-gray-700 text-base">Creative: {creative}</p>
                    </div>
                    <div class="flex items-center">
                        <div class="text-sm">
                            <p class="text-gray-900 leading-none">Spend: {spend}</p>
                            <p class="text-gray-600">Impressions: {impressions}</p>
                            <p class="text-gray-600">Clicks: {clicks}</p>
                            <p class="text-gray-600">Results:</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
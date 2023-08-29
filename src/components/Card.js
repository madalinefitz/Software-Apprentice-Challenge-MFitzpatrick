
export default function Card({campaign, adset, creative, spend, clicks, impressions}) {
    return(
        <div>
            <div class="max-w-sm w-full lg:max-w-full lg:flex p-5 grow-0">
                <div class="box-border h-62 w-62 border-4 border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-6 flex flex-col justify-between leading-normal">
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
import CmdK from "@/components/CmdK";
import getBrowser from "@/lib/get-browser";

export default function SearchMonstersButton(
    {
        onClick = () => null,
        text = 'Search monsters'
    }){
    return (
        <button
            id="search-monsters-button"
            className="flex items-baseline gap-2"
            aria-label="Get Hit Dice by monster name"
            onClick={onClick}
        >
            <span>{ text }</span>

            { getBrowser().getPlatform().type === 'desktop' && <CmdK/> }
        </button>
    )
}
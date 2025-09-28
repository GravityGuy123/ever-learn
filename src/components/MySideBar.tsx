import Account from "./Account";
import Friends from "./Friends";
import Pages from "./Pages";
import LogoContent from "./LogoContent";


export default function MySideBar() {

    return(
        <div className="sidebar-section">
            <LogoContent />
            <Pages />
            <Friends />
            <Account />
        </div>
    )
}
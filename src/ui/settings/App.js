import React, {Component} from "react";
import SideBar from "./components/SideBar";
import Welcome from "./components/Welcome";
import Settings from "./components/Settings";
import Expressions from "./components/Expressions";
import About from "./components/About";

class App extends Component {
		state = {
			activeTab: "tabWelcome",
			tabId: 0,
			settingsURL: ""
		}

		async componentDidMount() {
			const tab = await browser.tabs.getCurrent();
			const tabURL = new URL(tab.url);
			this.setState({
				activeTab: tabURL.hash !== "" || undefined ? tabURL.hash.substring(1) : "tabWelcome",
				tabId: tab.id,
				settingsURL: tab.url
			});
		}

		switchTabs(newActiveTab) {
			this.setState({
				activeTab: newActiveTab
			});
			let newUrl = new URL(this.state.settingsURL);
			newUrl.hash = newActiveTab;
			browser.tabs.update(this.state.tabId, {
				url: newUrl.href
			});
		}

		render() {
			const {
				activeTab
			} = this.state;
			return (
				<div id="layout">
					<SideBar switchTabs={(tab) => this.switchTabs(tab)} activeTab={activeTab}/>
					<div className="container">
						{
							activeTab === "tabWelcome" ? <Welcome /> : ""
						}
						{
							activeTab === "tabSettings" ? <Settings /> : ""
						}
						{
							activeTab === "tabExpressionList" ? <Expressions /> : ""
						}
						{
							activeTab === "tabAbout" ? <About /> : ""
						}
					</div>
				</div>
			);
		}
}

export default App;

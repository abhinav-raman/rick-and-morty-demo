import classes from "./App.module.css";
import Header from "./components/Header/Header";
import Profiles from "./components/Profiles/Profiles";

function App() {

	return (
		<div className={classes["App"]}>
      <Header />
      {/* Profiles is the parent component that manages the state of profiles list */}
			<Profiles />
		</div>
	);
}

export default App;

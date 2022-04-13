import classes from "./App.module.css";
import Header from "./components/Header/Header";
import Profiles from "./components/Profiles/Profiles";

function App() {

  // Using CSS modules for simplicity and application size, an alternate would be Tailwind CSS for CSS styling,
  // In my opinion, a component library (e.g. Chakra UI) would be overkill for this application

  // Pagination is handled via previous and next page click handlers in the profiles component.
  
	return (
		<div className={classes["App"]}>
      <Header />
      {/* Profiles is the parent component that manages the state of profiles list */}
			<Profiles />
		</div>
	);
}

export default App;

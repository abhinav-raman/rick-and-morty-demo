import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import classes from "./Profile.module.css";

const Profile = ({ character }) => {

  // maintaining location and episode data with state, as these will be fetched asynchronously and should cause
  // component rerender

	const [locationData, setLocationData] = useState(null);
	const [episodeData, setEpisodeData] = useState([]);

  // fethcing individual character's location data
	const getLocationData = useCallback(async () => {
		if (!character.location.url) return;

    let result;
			try {
				result = await axios.get(`${character.location.url}`);
				setLocationData(result.data);
			} catch {
				throw new Error("Something went wrong.");
			}

	}, [character]);

  // fetching episode list data in which the individual character is featured
	const getEpisodeData = useCallback(async () => {
		const tempEpisodeList = [];

		for (const episodeUrl of character.episode) {
			let episodeList;
			try {
				episodeList = await axios.get(`${episodeUrl}`);
        tempEpisodeList.push(episodeList.data);
			} catch {
				throw new Error("Something went wrong.");
			}
		}

		setEpisodeData(tempEpisodeList);
	}, [character]);

  // fetching location and episode on first component render
	useEffect(() => {
		getLocationData();
		getEpisodeData();
	}, [getLocationData, getEpisodeData]);

	return (
		<div key={character.name} className={classes["profile-container"]}>
			<div className={classes["profile-container__details"]}>
        {/* Profile photo */}
				<img
					src={character.image}
					alt="profile"
					className={classes["profile-picture"]}
				/>
        {/* Character related data */}
				<div className={classes["profile-details"]}>
					<p>
						<span className={classes["details-title"]}>Name</span>:{" "}
						{character.name}
					</p>
					<p>
						<span className={classes["details-title"]}>Gender</span>:{" "}
						{character.gender}
					</p>
					<p>
						<span className={classes["details-title"]}>Species</span>:{" "}
						{character.species}
					</p>
					<p>
						<span className={classes["details-title"]}>Status</span>{" "}
						{character.status}
					</p>
					<p>
						<span className={classes["details-title"]}>Origin</span>{" "}
						{character.origin.name}
					</p>
					<p>
						<span className={classes["details-title"]}>Current Location</span>{" "}
						{character.location.name}
					</p>
          {/* Location related Data */}
					<ul>
						<li>
							<span className={classes["details-title"]}>Location type</span>:{" "}
							{locationData?.type}
						</li>
						<li>
							<span className={classes["details-title"]}>Dimension</span>:{" "}
							{locationData?.dimension}
						</li>
						<li>
							<span className={classes["details-title"]}>No. of Residents</span>
							: {locationData?.residents.length}
						</li>
					</ul>
				</div>
			</div>
      {/* Rendering episode list */}
			{episodeData.length > 0 && (
				<p>
					<span className={classes["details-title"]}>Episodes Featured In</span>
					: {episodeData.map((ep) => `${ep.name}, `)}
				</p>
			)}
		</div>
	);
};

export default Profile;

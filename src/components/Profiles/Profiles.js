// could have used fetch() too, but axios manages better response and error handling
import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";

// importing BASE_URL, it contains the base url for the api.
import { BASE_URL } from "../../contants/baseUrl";
import Profile from "../Profile/Profile";

import classes from "./Profiles.module.css";

const Profiles = () => {
	// maintaining a default character fetch url on first render
	const defaultGetCharacterUrl = `${BASE_URL}/character`;

	// Creating states for data which is responsible for component rerendering
	const [characterData, setCharacterData] = useState([]);
	const [prevPageUrl, setPrevPageUrl] = useState("");
	const [nextPageUrl, setNextPageUrl] = useState("");

	// function to retrieve all characters data list
	const getCharacterData = async (url = defaultGetCharacterUrl) => {
		let result;

		// encapsulating code snippet where error are possible
		try {
			result = await axios.get(url);

			// updating the list, previous page link and next page link
			setCharacterData(result.data.results);
			setPrevPageUrl(result.data.info.prev);
			setNextPageUrl(result.data.info.next);
		} catch {
			// throwing error if something goes wrong
			throw new Error("Something went wrong.");
		}
	};

	useEffect(() => {
		// calling on first page render to fetch character list with default url
		getCharacterData();
	}, []);

	const handlePrevPagePagination = async () => {
		// on first page, previous url will be null so returning.
		if (!prevPageUrl) return;

		// calling with previous page url
		getCharacterData(prevPageUrl);
	};

	const handleNextPagePagination = async () => {
		// on last page, next url will be null so returning.
		if (!nextPageUrl) return;

		// calling with next page url
		getCharacterData(nextPageUrl);
	};

	// mantaining separate code snippet for pagination link
	// could have separate component too, but in this case we won't be reusing this
	const pageNavigationLinks = (
		<div className={classes["profiles-pagination-links"]}>
			{/* Previous page link */}
			<p
				className={
					prevPageUrl ? classes["pagination-links"] : classes["disabled"]
				}
				onClick={handlePrevPagePagination}
			>
				Prev
			</p>

			{/* Showing current page number */}
			<h3 className={classes["page-number-indicator-text"]}>
				Page No.
				{characterData.length &&
					parseInt((characterData[0].id / 21).toPrecision(1)) + 1}
			</h3>

			{/* Next page link */}
			<p
				className={
					nextPageUrl ? classes["pagination-links"] : classes["disabled"]
				}
				onClick={handleNextPagePagination}
			>
				Next
			</p>
		</div>
	);

	// maintaining profile list
	const profilesList = (
		<div className={classes["profile-list"]}>
			{characterData.map((character) => (
				<Profile key={character.id} character={character} />
			))}
		</div>
	);

	return (
		// encapsulating in <Fragment>
		<div className={classes["profiles-container"]}>
			{pageNavigationLinks}
      {/* contionally rendering only when characterData has data */}
			{characterData.length > 0 && profilesList}
		</div>
	);
};

export default Profiles;

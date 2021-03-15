import {useState, useEffect} from 'react';

export default function useJsonFetch(url) {

	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [hasError, setError] = useState(null);

	useEffect(
		() => {
			const fetchData = async () => {
				setLoading(true);
				try {
					const response = await fetch(url);
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					const data = await response.json();
					setData(data);
					setError(null);
				} 
				catch (e) {
					setError(e);
					console.dir(e.message);
				} 
				finally {
					setLoading(false);
				}
			};
			fetchData();
		},
		[url]
	);

	return {data, isLoading, hasError};
}
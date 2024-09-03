import { useState, useEffect } from 'react';
import axios from 'axios';

const DaysList = () => {
	const [weatherData, setWeatherData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [city, setCity] = useState('Norilsk');
	const [inputCity, setInputCity] = useState('');

	const fetchWeatherData = async (city) => {
		const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&cnt=40&appid=d63eec59fee5638be466ab6c9d6ed35b`;
		try {
			const response = await axios.get(weatherURL);
			setWeatherData(response.data);
			setCity(response.data.city.name);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchWeatherData(city);
	}, [city]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputCity) {
			setCity(inputCity);
			setInputCity('');
		}
	};

	const fetchTodayWeather = async () => {
		const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=d63eec59fee5638be466ab6c9d6ed35b`;
		try {
			const response = await axios.get(weatherURL);
			setWeatherData({ list: [response.data] }); // Обновляем состояние с данными на сегодня
		} catch (err) {
			setError(err);
		}
	};

	if (loading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка: {error.message}</div>;

	return (
		<div>
			<h1>Прогноз погоды в городе {city}</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={inputCity}
					onChange={(e) => setInputCity(e.target.value)}
					placeholder="Введите город"
				/>
				<button type="submit">Получить погоду</button>
			</form>
			<button onClick={fetchTodayWeather}>Получить погоду на сегодня</button>
			<ul>
				{weatherData.list.map((item) => (
					<li key={item.dt}>
						{new Date(item.dt * 1000).toLocaleString()}: {item.main.temp}°C, {item.weather[0].description}
					</li>
				))}
			</ul>
		</div>
	);
};

export default DaysList;

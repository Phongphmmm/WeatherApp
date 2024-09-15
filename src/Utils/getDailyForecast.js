import dayjs from "dayjs";

export const getDailyForecast = (hourlyData) => {
  const dailyForecast = {};

  hourlyData.forEach((item) => {
    const date = dayjs(item.dt * 1000).format("ddd");

    if (!dailyForecast[date] && time === "12:00") {
      dailyForecast[date] = item;
    } else if (!dailyForecast[date]) {
      dailyForecast[date] = item;
    }
  });

  return Object.values(dailyForecast);
};

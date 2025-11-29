export function kelvinToFahrenheit(weatherInKelvin: number) {
  const weatherInCelsius = weatherInKelvin - 273.15;
  return Math.round(weatherInCelsius * 1.8 + 32);
}

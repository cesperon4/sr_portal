export function kelvinToFahrenheit(weatherInKelvin: string) {
  const weatherInCelsius = parseFloat(weatherInKelvin) - 273.15;
  return Math.round(weatherInCelsius * 1.8 + 32);
}

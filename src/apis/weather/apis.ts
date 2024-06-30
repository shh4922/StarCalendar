
// const fetchWeather = async () => {
//     if (selectedCoordinates === null) {
//         return
//     }
//     const key = "JJ%2Bsl1EygohFMM2KSQUyc1kov236OSDWQEmCDwSsw3lHk4bFqxxvYE5jRSvSi5FbNxTsGkz77cyYY7i7rNANlg%3D%3D"
//     const pageNo = 1
//     const numOfRows = 1000
//     const dataType = "JSON"
//     const baseDate = 20240629
//     const baseTime = "0500"
//     const nx = selectedCoordinates.x
//     const ny = selectedCoordinates.y
//     const BaseURL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${key}&pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=${dataType}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`
//     const result = await axios.get<WeatherResponse>(BaseURL)
//     console.log(filterWeather(result.data))
//     return result
// }
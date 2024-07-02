import "./index.scss"
import WeatherBar from '../../Components/WeatherBar/WeatherBar'
import Calendar from "../../Components/Calendar/Calendar"
import Air from "../../Components/Air/Air";



function Index() {

    return (
        <article className="home">
            <WeatherBar />
            <section className="homeLight">
                <Calendar />
                <Air/>
            </section>
            
        </article>
    );
}
export default Index
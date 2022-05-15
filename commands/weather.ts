import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageEmbed} from "discord.js";
import fetch from 'node-fetch';
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("weather")
        .setDescription("한국 날씨만 검색 가능합니다.")
        .addSubcommand(subcommand =>
            subcommand
                .setName("forecast")
                .setDescription("한국 날씨만 검색 가능합니다.")
                .addStringOption(option =>
                    option
                        .setName("location")
                        .setDescription("한국 지역만 검색 가능합니다. (도 시 구 동 면 읍 등등)")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("now")
                .setDescription("한국 날씨만 검색 가능합니다.")
                .addStringOption(option =>
                    option
                        .setName("location")
                        .setDescription("한국 지역만 검색 가능합니다. (도 시 구 동 면 읍 등등)")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("air_pollution")
                .setDescription("한국 지역만 검색 가능합니다.")
                .addStringOption(option =>
                    option
                        .setName("location")
                        .setDescription("한국 지역만 검색 가능합니다. (도 시 구 동 면 읍 등등)")
                        .setRequired(true)
                )
        )
    ,
    run: async ({_client, interaction}) => {

        const location = interaction.options.getString(`location`);

        const geo = await get_city_geo_info(location);
        if (geo === undefined || geo === null) return interaction.editReply(
            `도시를 찾지 못했습니다!\n` +
            `검색어: ${location}\n` +
            `한 단어씩 검색해 보십시오.`
        )

        const local_loc_name = geo["local_names"]["ko"];
        const lat = geo["lat"];
        const lon = geo["lon"];

        const weather_info = await get_weather_info(lat, lon);

        let embed = new MessageEmbed();

        if (interaction.options.getSubcommand() === 'forecast') {

            let message = "";

            weather_info["hourly"].forEach((item, _index, _array_itself) => {
                //console.log(`forEach ${index}th item: ${JSON.stringify(item)}`)
                const temp = item['temp'];
                const time = get_readable_time(item['dt']);
                const desc = item['weather'][0]['description'];
                const pop = item['pop']; // Chance of rain.
                const rain_volume = (item['rain'] !== undefined) ? (item['rain']['1h'] * 100) : 0;

                message += `**${time}**//` +
                    `날씨: ${desc}//` +
                    `온도: ${temp}C//` +
                    `강수확률: ${pop * 100}%//` +
                    `강우량: ${rain_volume}mm\n\n`

                //console.log(`${index}th message: ${message}`)
            })

            embed
                .setTitle("제로투 봇 기상정보")
                .setDescription(
                    `**${local_loc_name}의 기상예보는 다음과 같습니다.**\n` +
                    `48시간 동안의 기상예측을 나타냅니다.\n\n` +
                    `${message}` +
                    `메세지 ${message.length}글자`
                )

        } else if (interaction.options.getSubcommand() === 'now') {

            const current = weather_info["current"];
            //console.log(`current: ${JSON.stringify(current)}`)

            const time = get_readable_time(current["dt"])
            const sun_rise_time = get_readable_time(current["sunrise"]);
            const sun_set_time = get_readable_time(current["sunset"]);
            const temp = current["temp"];
            const feels_like = current["feels_like"];
            const humidity = current["humidity"];
            const uvi = current["uvi"];
            const clouds = current["clouds"];
            const wind_speed = current["wind_speed"];
            const wind_deg = current["wind_deg"]
            const weather_desc = current["weather"][0]["description"];

            embed
                .setTitle("제로투 봇 기상정보")
                .setDescription(
                    `**${local_loc_name}의 현재 날씨정보는 다음과 같습니다.**\n` +
                    `${time} 기준\n` +
                    `날씨: **${weather_desc}**\n` +
                    `기온: \`${temp}C\`\n` +
                    `체감온도: \`${feels_like}C\`\n` +
                    `구름: \`${clouds}%\`\n` +
                    `풍속: \`${wind_speed}m/s\`\n` +
                    `풍향: \`${wind_deg}*\`\n` +
                    `습도: \`${humidity}%\`\n` +
                    `UV지수: \`${uvi}\`\n` +
                    `일출: \`${sun_rise_time}\`\n` +
                    `일몰: \`${sun_set_time}\`\n`
                )

        } else if (interaction.options.getSubcommand() === 'air_pollution') {

            const air_pollution = await get_air_pollution(lat, lon);
            // console.log(`air_pollution: ${JSON.stringify(air_pollution)}`)

            const dt = get_readable_time(air_pollution['list'][0]['dt']);
            const aqi = air_pollution['list'][0]['main']['aqi'];
            const co = air_pollution['list'][0]['components']['co'];
            const no = air_pollution['list'][0]['components']['no'];
            const no2 = air_pollution['list'][0]['components']['no2'];
            const no2_s = get_air_pollution_standards(Pollutant.NO2, no2).toString();
            const o3 = air_pollution['list'][0]['components']['o3'];
            const o3_s = get_air_pollution_standards(Pollutant.O3, o3).toString();
            const so2 = air_pollution['list'][0]['components']['so2'];
            const pm2_5 = air_pollution['list'][0]['components']['pm2_5'];
            const pm2_5_s = get_air_pollution_standards(Pollutant.PM2_5, pm2_5).toString();
            const pm10 = air_pollution['list'][0]['components']['pm10'];
            const pm10_s = get_air_pollution_standards(Pollutant.PM10, pm10).toString();
            const nh3 = air_pollution['list'][0]['components']['nh3'];

            embed
                .setTitle("제로투 봇 기상정보")
                .setDescription(
                    `**${local_loc_name}의 현재 날씨정보는 다음과 같습니다.**\n` +
                    `${dt} 기준\n` +
                    `대기환경지수(AQI): ${aqi}μg/m3\n` +
                    `일산화 탄소(CO): ${co}μg/m3\n` +
                    `일산화 질소(NO): ${no}μg/m3\n` +
                    `이산화 질소(NO2): ${no2}μg/m3 \`${no2_s}\`\n` +
                    `오존(O3): ${o3}μg/m3 \`${o3_s}\`\n` +
                    `이산화 황(SO2): ${so2}μg/m3\n` +
                    `PM2.5: ${pm2_5}μg/m3 \`${pm2_5_s}\`\n` +
                    `PM10: ${pm10}μg/m3 \`${pm10_s}\`\n` +
                    `암모니아(NH3): ${nh3}μg/m3`
                )
        }

        await interaction.editReply({embeds: [embed], ephemeral: true})
    }
}

const app_id = process.env.OPEN_WEATHER_MAP_APP_ID;

async function get_city_geo_info(city_name: string): Promise<JSON> {
    const base_url = `http://api.openweathermap.org/geo/1.0/direct?`;

    const res = await fetch(base_url +
        `q=${city_name},,KR` +
        `&appid=${app_id}` +
        `&limit=1`
    );

    const json = await res.json();

    //console.log(`get_city_geo_info json info: ${JSON.stringify(json)}`)

    return json[0];
}

async function get_weather_info(lat: string, lon: string): Promise<JSON> {
    const base_url = `https://api.openweathermap.org/data/2.5/onecall?`;

    const url = base_url +
        `lat=${lat}` +
        `&lon=${lon}` +
        `&appid=${app_id}` +
        `&exclude=minutely,daily,alerts` +
        `&units=metric` +
        `&lang=kr`;

    //console.log(`url: ${url}`)

    const res = await fetch(url);
    const json = await res.json();
    //console.log(`get_weather_info json: ${JSON.stringify(json)}`)

    return json;
}

async function get_air_pollution(lat: string, lon: string): Promise<JSON> {

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${app_id}`;

    const res = await fetch(url);
    const json = await res.json();
    //console.log(`get_air_pollution json: ${JSON.stringify(json)}`);

    return json;
}

function get_readable_time(dt: number): string {
    const date = new Date((dt + 32400) * 1000).toString() // 32400 is timezone offset for Asia/Seoul.
    //console.log(`date: ${date}`)
    return date.split(' ')[2] + '일 ' + String(date).split(' ')[4];
}

enum Pollutant {
    NO2,
    PM10,
    O3,
    PM2_5
}

enum Standards {
    좋음 = "좋음",
    양호 = "양호",
    그저그럼 = "그저그럼",
    나쁨 = "나쁨",
    매우나쁨 = "매우나쁨"
}

function get_air_pollution_standards(pollutant: Pollutant, quality: number): Standards {

    switch (pollutant) {
        case Pollutant.NO2:
            if (quality <= 50) return Standards.좋음;
            else if (quality <= 100) return Standards.양호;
            else if (quality <= 200) return Standards.그저그럼;
            else if (quality <= 400) return Standards.나쁨;
            else if (quality > 400) return Standards.매우나쁨;
            break;

        case Pollutant.PM10:
            if (quality <= 25) return Standards.좋음;
            else if (quality <= 50) return Standards.양호;
            else if (quality <= 90) return Standards.그저그럼;
            else if (quality <= 180) return Standards.나쁨;
            else if (quality > 180) return Standards.매우나쁨;
            break;

        case Pollutant.O3:
            if (quality <= 60) return Standards.좋음;
            else if (quality <= 120) return Standards.양호;
            else if (quality <= 180) return Standards.그저그럼;
            else if (quality <= 240) return Standards.나쁨;
            else if (quality > 240) return Standards.매우나쁨;
            break;

        case Pollutant.PM2_5:
            if (quality <= 15) return Standards.좋음;
            else if (quality <= 30) return Standards.양호;
            else if (quality <= 55) return Standards.그저그럼;
            else if (quality <= 110) return Standards.나쁨;
            else if (quality > 110) return Standards.매우나쁨;
            break;
    }
}
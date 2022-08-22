const apiEx = require("../openWeatherApi");

module.exports = {
    async useAPI(req, res) {
        try {
            let { uf } = req.params;
            let { cidade } = req.params;

            const data = await apiEx.get(
                `data/2.5/weather?q=${cidade},BR-${uf},BRA&lang=pt_br&appid=cbc395ceaf59a3657e18b30e6fd5e984&units=metric`
            );
            return res.status(200).json({
                cidade: data.data.name,
                clima: data.data.weather[0].description,
                temperatura: data.data.main.temp + "º",
            });
        } catch (error) {
            return res.status(400).json({ message: "Error" });
        }
    },
};

import { ChartDetailsResponseVo } from "./chart-details-response-vo";
import { IndChartValue } from "./ind-chart-value";
import { NiBniIndxDetailsRespVo } from "./ni-bni-indx-details-resp-vo";
import { StockDetailsRespVo } from "./stock-details-resp-vo";
import { StockFormulatedDetailsVo } from "./stock-formulated-details-vo";

export class DisplayingStockDetails {


    stockDetailsResponseVo : StockDetailsRespVo;

    niBniIndxDetailsResponseVo : NiBniIndxDetailsRespVo[];

    chartDetailsResponseVo : ChartDetailsResponseVo[];

    stockFormulatedDetailsVo : StockFormulatedDetailsVo;

    stockId : string;
}

import axios from 'axios';

const baseURL =
  'https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?resultType=json';

const serviceKey =
  process.env.REACT_APP_API_KEY;

const calcDate = () => {
  const today = new Date();
  const twoWeeksAgo = new Date(today.setDate(today.getDate() - 14))
    .toLocaleDateString()
    .split(/[ .]/g)
    .filter((f) => f.length !== 0);

  return twoWeeksAgo
    .map((parm) => (parm.length > 1 ? parm : 0 + parm))
    .join('');
};

export const getStockData = async (stockName: string) => {
  const data = await axios.get(
    `${baseURL}&likeItmsNm=${stockName}&serviceKey=${serviceKey}&beginBasDt=${calcDate()}`,
  );

  return data.data.response.body.items.item;
};

export const stockCodeSearch = async (code: string) => {
  const data = await axios.get(
    `${baseURL}&likeSrtnCd=${code}&serviceKey=${serviceKey}&beginBasDt=${calcDate()}`,
  );

  return data.data.response.body.items.item;
};

export const getStockTrdVol = async () => {
  const data = await axios.get(
    `${baseURL}&serviceKey=${serviceKey}&beginBasDt=${calcDate()}&beginTrqu=6000000&numOfRows=300`,
  );

  return data.data.response.body.items.item;
};

import {
  faHeart,
  faMagnifyingGlass,
  faMagnifyingGlassChart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueries } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getStockData } from '../api';
import Box from '../components/box/Box';
import List from '../components/box/List';

const myData = [
  {
    name: 'a',
    stock: [
      {
        stockName: '삼성전자',
        count: 50,
        price: '90000',
      },
      {
        stockName: 'lg생활건강',
        count: 50,
        price: '760000',
      },
    ],
  },
  {
    name: 'b',
    stock: [
      {
        stockName: '아시아나항공',
        count: 20,
        price: '13000',
      },
      {
        stockName: '대한항공',
        count: 30,
        price: '28000',
      },
    ],
  },
];

function MainPage() {
  const myStockNames: string[] = [];
  const myStockTotalPrice: number[] = [];

  myData.map((portfolio) =>
    portfolio.stock.map(
      (stock) => (
        myStockNames.push(stock.stockName),
        myStockTotalPrice.push(Number(stock.price) * stock.count)
      ),
    ),
  );

  const totalPrice = myStockTotalPrice.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0,
  );

  const query = myStockNames.map((stock) => {
    return { queryKey: ['stock', stock], queryFn: () => getStockData(stock) };
  });

  const results = useQueries({
    queries: [...query],
  });

  console.log(results);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-[10px]">
        <Link to="/portfolio">
          <Box classname="w-[100%] h-[300px] rounded-xl p-[30px]">
            <div>
              <p className="text-lg">총 보유 자산</p>
              <p className="text-xxl font-bold">
                {totalPrice.toLocaleString()}원
              </p>
            </div>
            <div className="mt-[20px] flex justify-between">
              <p className="text-md">수익률</p>
              <p className="font-bold text-lg">99%</p>
            </div>
            <div className="mt-[10px] flex justify-between">
              <p className="text-md">평가 손익</p>
              <p className="font-bold text-lg">99999원</p>
            </div>
          </Box>
        </Link>
        <div className="grid grid-cols-2 gap-[10px]">
          <Box classname="w-[100%] h-[180px] rounded-xl col-span-2 p-[20px] text-center text-md">
            포트폴리오 바로가기
          </Box>
          <Link to="/favorites">
            <Box classname="w-[100%] h-[110px] rounded-xl text-md flex justify-center items-center">
              <div>
                <FontAwesomeIcon
                  className="mr-3 text-red-500"
                  icon={faHeart}
                  size="lg"
                />
                관심종목
              </div>
            </Box>
          </Link>
          <Link to="/search">
            <Box classname="w-[100%] h-[110px] rounded-xl text-md flex justify-center items-center">
              <div>
                <FontAwesomeIcon
                  className="mr-3"
                  icon={faMagnifyingGlass}
                  size="lg"
                />
                종목 검색
              </div>
            </Box>
          </Link>
        </div>
      </div>
      <div className="my-[40px]">
        <p className="p-[5px] text-center">거래량 TOP 10</p>
        <div className="mt-[15px]">
          <List data={['코드', '주식명', '종가', '등락률']} />
          <List data={['1', '2', '3', '4']} />
          <List data={[5, 6, 7, 8]} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;

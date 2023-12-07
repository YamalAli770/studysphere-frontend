const { ShoppingBasket, User, Bug } = require("lucide-react");
import { FaMoneyBillWaveAlt } from 'react-icons/fa';

export const cardData = [
    {
        title: 'Total Sales',
        icon: <FaMoneyBillWaveAlt />,
        amount: '$120,784.02',
        dayAmount: '+$1,453.89',
        percentage: '12.3%',
        increase: true,
    },
    {
        title: 'Total Orders',
        icon: <ShoppingBasket />,
        amount: '28,834',
        dayAmount: '+2,676',
        percentage: '20.1%',
        increase: true,
    },
    {
        title: 'Visitor',
        icon: <User />,
        amount: '18,896',
        dayAmount: '-876',
        percentage: '5.6%',
        increase: false,
    },
    {
        title: 'Disputes Opened',
        icon: <Bug />,
        amount: '2,876',
        dayAmount: '+34',
        percentage: '13%',
        increase: true,
    },
];
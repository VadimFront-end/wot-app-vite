import React, { useEffect } from 'react';
import { useRoutes, useLocation, useNavigate, Link } from 'react-router-dom';

import { SearchOutlined, TableOutlined, AreaChartOutlined, DiffTwoTone } from '@ant-design/icons';
import { Layout, Menu, Result, Tooltip } from 'antd/es';

import PlayersComparison from './features/PlayerInfo/components/PlayersComparison/PlayersComparison';
import PlayerInfo from './features/PlayerInfo/PlayerInfo';
import TanksInfo from './features/TanksInfo/TabksInfo';
import TanksCard from './features/TankCard/TankCard';
import PlayerCard from './features/PlayerInfo/components/PlayerCard/PlayerCard';
import AchievementsInfo from './features/AchievementsInfo/AchievementsInfo';
import { useAppSelector } from './app/hooks';
import logo from './imgs/main.png';

import './App.less';

const { Content, Sider, Header } = Layout;

const emptyResult = <Result status="404" title="404" subTitle="Страница не найдена" />;

const routes = [
    {
        path: '/players',
        element: <PlayerInfo />,
    },
    {
        path: '/players/statistic/:id',
        element: <PlayerCard />,
    },
    {
        path: '/players/comparison',
        element: <PlayersComparison />,
    },
    {
        path: '/tanks',
        element: <TanksInfo />,
    },
    {
        path: '/tanks/:id',
        element: <TanksCard />,
    },
    {
        path: '/achievements',
        element: <AchievementsInfo />,
    },
    {
        path: '*',
        element: emptyResult,
    },
];

const App: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const nickname = useAppSelector(state => state.playerInfo.nickname);
    const tankName = useAppSelector(store => store.playerInfo.selectedTankName);

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/players');
        }
    }, []);

    const menuItems = [
        { label: `Статистика игрока ${nickname}`, key: '/players/statistic/', hidden: true },
        { label: 'Сравнение игроков', key: '/players/comparison', hidden: true },
        { label: 'Поиск игрока', key: '/players', icon: <SearchOutlined /> },
        { label: `Описание танка ${tankName}`, key: '/tanks/', hidden: true },
        { label: 'Техника', key: '/tanks', icon: <TableOutlined /> },
        { label: 'Достижения', key: '/achievements', icon: <AreaChartOutlined /> },
    ];

    const selectedKeys = [ location.pathname.indexOf('/', 1) === -1 ? location.pathname : location.pathname.substring(0, location.pathname.indexOf('/', 1)) ];

    return (
        <Layout className="main-layout" hasSider>
            <Sider collapsible collapsedWidth={64}>
                <Link to="/players">
                    <Tooltip title="На главную" placement="right">
                        <div style={{ background: '#f0f2f5' }}>
                            <img src={logo} alt="Лого" width={64} height={64} style={{ margin: 'auto', display: 'block' }} />
                        </div>
                    </Tooltip>
                </Link>
                <Menu selectedKeys={selectedKeys} onClick={({ key }) => navigate(key)} theme="dark" items={menuItems} />
            </Sider>
            <Layout>
                <Header>
                    <h1>{menuItems.find(item => location.pathname?.includes(item.key))?.label}</h1>
                    <Tooltip title="Перейти к сравнению" placement="left" defaultOpen>
                        <DiffTwoTone onClick={() => navigate('/players/comparison')} />
                    </Tooltip>
                </Header>
                <Content>{useRoutes(routes)}</Content>
            </Layout>
        </Layout>
    );
};

export default App;